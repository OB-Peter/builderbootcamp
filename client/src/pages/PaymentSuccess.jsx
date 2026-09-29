import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verifyPayment } from "../api/paystack";
import { CheckIcon } from "../components/Icons";

export default function PaymentSuccess() {
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [student, setStudent] = useState(null);
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (!reference) {
      setStatus("failed");
      return;
    }

    setRefCode(reference);

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

  if (status === "verifying") {
    return (
      <div className="payment-status-page">
        <div className="container">
          <div className="status-card">
            <div className="status-spinner-wrap">
              <div className="status-spinner" aria-hidden="true" />
            </div>
            <h1 className="status-title">Verifying Payment</h1>
            <p className="status-sub">
              Please wait a moment while we confirm your transaction with Paystack...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="payment-status-page">
        <div className="container">
          <div className="status-card">
            <div className="status-icon-circle failed-icon">✕</div>
            <h1 className="status-title">Payment Not Confirmed</h1>
            <p className="status-sub">
              We couldn't verify this transaction automatically. If your account was charged, please contact support with your reference number.
            </p>
            {refCode && (
              <div className="receipt-box">
                <div className="receipt-row">
                  <span className="receipt-label">Reference</span>
                  <span className="receipt-val font-mono">{refCode}</span>
                </div>
              </div>
            )}
            <div className="status-actions">
              <Link to="/register" className="btn btn-secondary">
                Try Again
              </Link>
              <a href="mailto:support@builderbootcamp.dev" className="btn btn-primary">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-page">
      <div className="container">
        <div className="status-card">
          <div className="status-icon-circle success-icon">
            <CheckIcon size={32} />
          </div>
          <span className="confirmation-badge">Registration Confirmed</span>
          <h1 className="status-title">Welcome to BuilderBootcamp!</h1>
          <p className="status-sub">
            Awesome job, <strong>{student?.full_name || "Builder"}</strong>! Your registration and payment have been confirmed.
          </p>

          <div className="receipt-box">
            <div className="receipt-row">
              <span className="receipt-label">Student</span>
              <span className="receipt-val">{student?.full_name}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Email</span>
              <span className="receipt-val">{student?.email}</span>
            </div>
            {student?.phone && (
              <div className="receipt-row">
                <span className="receipt-label">Phone</span>
                <span className="receipt-val">{student?.phone}</span>
              </div>
            )}
            <div className="receipt-row">
              <span className="receipt-label">Reference</span>
              <span className="receipt-val font-mono">{student?.reference || refCode}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Status</span>
              <span className="receipt-val text-success">Verified</span>
            </div>
          </div>

          <p className="onboarding-notice">
            A confirmation email with onboarding materials and Discord invite has been dispatched to <strong>{student?.email}</strong>.
          </p>

          <div className="status-actions">
            <Link to="/" className="btn btn-primary">
              Return to Homepage
            </Link>
            <a
              href="mailto:support@builderbootcamp.dev"
              className="btn btn-secondary"
            >
              Get Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
