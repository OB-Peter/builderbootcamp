import axios from "axios";
import crypto from "crypto";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { Transaction } from "../models/Transaction.js";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function initializePayment(req, res) {
  try {
    const { full_name, email, phone, school, course_id } = req.body;

    if (!full_name || !email || !course_id) {
      return res.status(400).json({ error: "full_name, email and course_id are required" });
    }

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const reference = `bb_${crypto.randomBytes(8).toString("hex")}`;

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
        reference,
        callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ ...paystackRes.data.data, student_id: student.id });
  } catch (err) {
    console.error("initializePayment error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initialize payment" });
  }
}

export async function verifyPayment(req, res) {
  try {
    const { reference } = req.params;

    const paystackRes = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = paystackRes.data.data;

    if (data.status === "success") {
      const student = await Student.findByReference(reference);
      await Student.updateStatusByReference(reference, "paid");
      await Transaction.create({
        student_id: student?.id,
        reference,
        amount_kobo: data.amount,
        status: "success",
        raw_response: data,
      });

      return res.json({
        success: true,
        student: await Student.findByReference(reference),
      });
    }

    await Student.updateStatusByReference(reference, "failed");
    res.json({ success: false });
  } catch (err) {
    console.error("verifyPayment error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to verify payment" });
  }
}

export async function handleWebhook(req, res) {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const { reference, amount, status } = event.data;
      const student = await Student.findByReference(reference);

      await Student.updateStatusByReference(reference, "paid");
      await Transaction.create({
        student_id: student?.id,
        reference,
        amount_kobo: amount,
        status,
        raw_response: event.data,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("handleWebhook error:", err.message);
    res.sendStatus(500);
  }
}
