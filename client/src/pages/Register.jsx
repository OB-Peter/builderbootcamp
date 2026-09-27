import { useEffect, useState } from "react";
import { fetchCourses, initPayment } from "../api/paystack";

export default function Register() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    school: "",
    course_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses().then(setCourses).catch(() => setError("Could not load courses"));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.course_id) {
      setError("Please fill in your name, email, and select a course.");
      return;
    }

    setLoading(true);
    try {
      const { authorization_url } = await initPayment(form);
      window.location.href = authorization_url;
    } catch (err) {
      setError("Something went wrong starting your payment. Please try again.");
      setLoading(false);
    }
  }

  const selectedCourse = courses.find((c) => String(c.id) === String(form.course_id));

  return (
    <div className="register-page">
      <div className="register-card">
        <p className="eyebrow">Bootcamp 1.0 — Build with AI</p>
        <h1>Register for Builder Bootcamp</h1>
        <p className="register-sub">
          Fill in your details, pick a track, and you'll be taken straight to secure
          checkout.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="e.g. Oluyemi Boluwatife Peter"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="080..."
            />
          </label>

          <label>
            School / Institution
            <input
              name="school"
              value={form.school}
              onChange={handleChange}
              placeholder="Optional"
            />
          </label>

          <label>
            Track
            <select name="course_id" value={form.course_id} onChange={handleChange} required>
              <option value="">Select a track</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — ₦{(c.price_kobo / 100).toLocaleString()}
                </option>
              ))}
            </select>
          </label>

          {selectedCourse && (
            <div className="price-summary">
              <span>{selectedCourse.name}</span>
              <span className="price-summary-value">
                ₦{(selectedCourse.price_kobo / 100).toLocaleString()}
              </span>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="cta cta--full" disabled={loading}>
            {loading ? "Redirecting to payment..." : "Pay & Register"}
          </button>
        </form>
      </div>
    </div>
  );
}