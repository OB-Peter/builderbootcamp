import axios from "axios";
import crypto from "crypto";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { Transaction } from "../models/Transaction.js";

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
 * Used by BOTH the redirect verify and the webhook, so it must be idempotent:
 * the two will often arrive for the same payment.
 *
 * `ps` is the Paystack transaction object (data.data from verify, or event.data from the webhook).
 */
async function applyPaystackResult(reference, ps) {
  const student = await Student.findByReference(reference);
  if (!student) {
    console.error("Payment for unknown reference:", reference);
    return { ok: false, reason: "unknown_reference" };
  }

  if (ps.status !== "success") {
    // Only a definitive failure counts as failed. "abandoned"/"pending" (e.g. a bank
    // transfer still in progress) must stay pending so the webhook can complete it later.
    if (ps.status === "failed" && student.payment_status !== "paid") {
      await Student.updateStatusByReference(reference, "failed");
    }
    return { ok: false, reason: ps.status || "not_successful", student };
  }

  // Never trust "success" alone: the amount and currency must match what we charge.
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

  if (student.payment_status !== "paid") {
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
    // transactions.reference is UNIQUE: a duplicate just means the other path got here first.
    if (err.code !== "ER_DUP_ENTRY") throw err;
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
        amount: course.price_kobo, // always from the database, never from the request
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
      // don't leave an orphan "pending" row when Paystack was never reached
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

    // The signature middleware has already authenticated this request.
    if (event.event === "charge.success" && event.data?.reference) {
      await applyPaystackResult(event.data.reference, event.data);
    }

    // Always acknowledge a valid event so Paystack doesn't keep retrying one we can't use.
    res.sendStatus(200);
  } catch (err) {
    console.error("handleWebhook error:", err.message);
    // 500 only for genuine failures (e.g. database down) so Paystack retries later.
    res.sendStatus(500);
  }
}

export async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    console.error("getAllTransactions error:", err.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
