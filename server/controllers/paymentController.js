import axios from "axios";
import crypto from "crypto";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { Transaction } from "../models/Transaction.js";
import { sendWelcomeEmail } from "../services/emailService.js";

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function paystackHeaders() {
  return {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

/**
 * Single place that turns a Paystack transaction into "paid".
 * Used by BOTH the redirect verify and the webhook (idempotent).
 */
async function applyPaystackResult(reference, ps) {
  const student = await Student.findByReference(reference);
  if (!student) {
    console.error("Payment for unknown reference:", reference);
    return { ok: false, reason: "unknown_reference" };
  }

  if (ps.status !== "success") {
    if (ps.status === "failed" && student.payment_status !== "paid") {
      await Student.updateStatusByReference(reference, "failed");
    }
    return { ok: false, reason: ps.status || "not_successful", student };
  }

  // Ensure amount and currency match what we expect
  const course = await Course.findById(student.course_id);
  if (!course || Number(ps.amount) < Number(course.price_kobo) || ps.currency !== "NGN") {
    console.error("Amount/currency mismatch", {
      reference,
      paid: ps.amount,
      expected: course?.price_kobo,
      currency: ps.currency,
    });
    return { ok: false, reason: "amount_mismatch", student };
  }

  const wasAlreadyPaid = student.payment_status === "paid";

  if (!wasAlreadyPaid) {
    await Student.updateStatusByReference(reference, "paid");
  }

  try {
    await Transaction.create({
      student_id: student.id,
      reference,
      amount_kobo: ps.amount,
      status: "success",
      raw_response: ps,
    });
  } catch (err) {
    if (err.code !== "ER_DUP_ENTRY") throw err;
  }

  // Send the confirmation & Slack invite email once when transitioning to paid
  if (!wasAlreadyPaid) {
    const studentEmail = (student.email || ps?.customer?.email || "").trim();
    const studentName = student.full_name || ps?.customer?.first_name || "Builder";
    const courseName = course?.name || "Builder Bootcamp Track";

    sendWelcomeEmail({
      to: studentEmail,
      name: studentName,
      track: courseName,
      order: student.id,
      tier: "Cohort 1.0",
      amount: Number(ps.amount) / 100, // convert kobo to Naira
      reference,
    }).catch((err) => {
      console.error("Welcome email delivery failed:", err.message);
    });
  }

  return { ok: true, student: await Student.findByReference(reference) };
}

export async function initializePayment(req, res) {
  let reference;
  try {
    const full_name = String(req.body.full_name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim();
    const school = String(req.body.school || "").trim();
    const course_id = Number(req.body.course_id);

    if (!full_name || !email || !Number.isInteger(course_id)) {
      return res.status(400).json({ error: "full_name, email and course_id are required" });
    }
    if (
      !EMAIL_RE.test(email) ||
      email.length > 150 ||
      full_name.length > 150 ||
      phone.length > 30 ||
      school.length > 150
    ) {
      return res.status(400).json({ error: "Please check your details and try again" });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    reference = `bb_${crypto.randomBytes(8).toString("hex")}`;

    // Ensure Student.create receives the payload cleanly
    const student = await Student.create({
      full_name,
      email,
      phone,
      school,
      course_id,
      reference,
    });

    const paystackRes = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: course.price_kobo,
        currency: "NGN",
        reference,
        callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
        metadata: { student_id: student.id, course_id },
      },
      { headers: paystackHeaders(), timeout: 15000 }
    );

    res.json({ ...paystackRes.data.data, student_id: student.id });
  } catch (err) {
    console.error("initializePayment error:", err.response?.data || err.message);
    if (reference) {
      await Student.updateStatusByReference(reference, "failed").catch(() => {});
    }
    res.status(500).json({ error: "Failed to initialize payment" });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { reference } = req.params;

    const paystackRes = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: paystackHeaders(), timeout: 15000 }
    );

    const result = await applyPaystackResult(reference, paystackRes.data.data);

    if (result.ok) {
      return res.json({ success: true, student: result.student });
    }
    res.json({ success: false, status: result.reason });
  } catch (err) {
    console.error("verifyPayment error:", err.response?.data || err.message);
    if (err.response?.status === 400 || err.response?.status === 404) {
      return res.status(404).json({ success: false, error: "Transaction not found" });
    }
    res.status(500).json({ error: "Failed to verify payment" });
  }
}

export async function handleWebhook(req, res) {
  try {
    const event = req.body;

    if (event.event === "charge.success" && event.data?.reference) {
      await applyPaystackResult(event.data.reference, event.data);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("handleWebhook error:", err.message);
    res.sendStatus(500);
  }
}

export const getAllTransactions = async (req, res) => {
  try {
    const rows = await Transaction.findAll();
    res.json(rows.map(({ raw_response, ...t }) => t));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};