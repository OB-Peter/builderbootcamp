import { useEffect, useState } from "react";
import { verifyPayment } from "../api/paystack";

export default function PaymentSuccess() {
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (!reference) {
      setStatus("failed");
      return;
    }

    verifyPayment(reference)
      .then((data) => {
        if (data.success) {
          setStudent(data.student);
          setStatus("success");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, []);

  if (status === "verifying") return <p>Verifying your payment...</p>;

  if (status === "failed") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Payment not confirmed</h2>
        <p>If you were charged, contact support with your reference number.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Registration confirmed 🎉</h2>
      <p>Welcome, {student.full_name}!</p>
      <p>Reference: {student.reference}</p>
      <p>A confirmation email will be sent to {student.email}.</p>
    </div>
  );
}
