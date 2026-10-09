import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchCourses, initPayment } from "../api/paystack";
import { DEFAULT_COURSES } from "../data/coursesData";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ShieldCheckIcon } from "../components/Icons";
import "./Register.css";

export default function Register() {
  const location = useLocation();
  const [courses, setCourses] = useState(DEFAULT_COURSES);
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
    let isMounted = true;
    fetchCourses()
      .then((serverCourses) => {
        if (!isMounted || !Array.isArray(serverCourses) || serverCourses.length === 0) return;

        const merged = serverCourses.map((sc) => {
          const match = DEFAULT_COURSES.find(
            (dc) => dc.id === sc.id || dc.name.toLowerCase() === sc.name.toLowerCase()
          );
          return {
            id: sc.id,
            name: sc.name,
            price_kobo: sc.price_kobo,
            priceFormatted: `₦${(Number(sc.price_kobo || 0) / 100).toLocaleString("en-NG")}`,
            description: sc.description || match?.shortDescription || "",
            duration: match?.duration || "8 Weeks",
            level: match?.level || "Beginner",
          };
        });

        DEFAULT_COURSES.forEach((dc) => {
          if (!merged.some((m) => m.id === dc.id)) {
            merged.push(dc);
          }
        });

        setCourses(merged);
      })
      .catch((err) => {
        console.warn("Backend courses unavailable, utilizing default tracks:", err.message);
        setCourses(DEFAULT_COURSES);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseQuery = params.get("course");
    if (courseQuery && courses.length > 0) {
      const found = courses.find(
        (c) =>
          String(c.id) === String(courseQuery) ||
          c.name.toLowerCase().includes(courseQuery.toLowerCase()) ||
          (c.slug && c.slug.toLowerCase() === courseQuery.toLowerCase())
      );
      if (found) {
        setForm((prev) => ({ ...prev, course_id: String(found.id) }));
      }
    } else if (!form.course_id && courses.length > 0) {
      setForm((prev) => ({ ...prev, course_id: String(courses[0].id) }));
    }
  }, [location.search, courses]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const selectedCourse = courses.find(
    (c) => String(c.id) === String(form.course_id)
  ) || courses[0];

  const formattedPrice = selectedCourse?.priceFormatted || "₦15,000";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.course_id) {
      setError("Please fill in your name, email, and select your preferred course track.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        school: form.school.trim(),
        course_id: isNaN(Number(form.course_id)) ? 1 : Number(form.course_id),
      };

      const { authorization_url } = await initPayment(payload);
      if (authorization_url) {
        window.location.href = authorization_url;
      } else {
        throw new Error("Missing authorization URL from checkout service.");
      }
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(
        "Could not connect to payment gateway. Please ensure the backend server is running, or contact support."
      );
      setLoading(false);
    }
  }

  return (
    <div className="register-page register-page-wrapper">
      <div className="section-container register-container">
        <div className="register-nav-back">
          <Link to="/#courses" className="back-link">
            <ArrowLeftIcon size={16} /> Back to Courses
          </Link>
        </div>

        <div className="register-header">
          <span className="badge badge-accent form-card-badge">Enrollment Application</span>
          <h1 className="register-title register-heading">Start Your Journey as a Software Builder</h1>
          <p className="register-subtitle register-lead">
            Secure your place in the upcoming cohort. Master in-demand digital skills through hands-on project creation.
          </p>
        </div>

        <div className="register-grid register-layout-grid">
          {/* Main Form */}
          <div className="register-card register-form-card card">
            <h2 className="register-card-title">Student Information</h2>
            <p className="register-card-desc">
              Enter your contact details accurately. Your cohort access details and receipts will be sent to this email.
            </p>

            {error && (
              <div className="alert-box alert-error" role="alert">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form" noValidate>
              <div className="form-group">
                <label htmlFor="full_name" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={form.full_name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex@university.edu"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
                <span className="form-help">We'll never share your email with third parties.</span>
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g. +234 801 234 5678"
                  value={form.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="school" className="form-label">
                  School / Institution / Workplace (Optional)
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  placeholder="e.g. University of Lagos / Self-taught"
                  value={form.school}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="course_id" className="form-label">
                  Select Course Track <span className="text-danger">*</span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="course_id"
                    name="course_id"
                    required
                    value={form.course_id}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.duration || "8 Weeks"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-submit-payment btn-block btn-lg"
              >
                {loading ? "Redirecting to Paystack..." : "Proceed to Secure Payment"}
                <ArrowRightIcon size={18} />
              </button>

              <div className="register-guarantee form-security-guarantee">
                <ShieldCheckIcon size={18} className="text-orange" />
                <span>Secured by 256-bit encryption via Paystack</span>
              </div>
            </form>
          </div>

          {/* Sidebar / Summary */}
          <div className="register-sidebar">
            <div className="order-summary-card card">
              <h3 className="order-summary-title summary-card-title">Track Summary</h3>

              {selectedCourse && (
                <div className="summary-track-info selected-course-details">
                  <span className="summary-track-pill">{selectedCourse.level || "Track"}</span>
                  <div className="summary-track-name">{selectedCourse.name}</div>
                  <p className="summary-track-desc">
                    {selectedCourse.shortDescription || selectedCourse.description || "Comprehensive hands-on training track."}
                  </p>

                  <div className="summary-meta-grid summary-meta-row">
                    <div className="summary-meta-item">
                      <span className="summary-meta-label meta-label">Duration</span>
                      <span className="summary-meta-val meta-val">{selectedCourse.duration || "8 Weeks"}</span>
                    </div>
                    <div className="summary-meta-item">
                      <span className="summary-meta-label meta-label">Level</span>
                      <span className="summary-meta-val meta-val">{selectedCourse.level || "Beginner"}</span>
                    </div>
                  </div>

                  <hr className="summary-divider" />

                  <div className="summary-pricing-row summary-price-box">
                    <span className="summary-price-label price-label">Cohort Tuition</span>
                    <span className="summary-price-val price-amount">{formattedPrice}</span>
                  </div>
                </div>
              )}

              <ul className="summary-benefits">
                <li>
                  <CheckIcon size={16} className="text-orange" />
                  <span>Access to live instructor cohort sessions</span>
                </li>
                <li>
                  <CheckIcon size={16} className="text-orange" />
                  <span>Direct code reviews on GitHub</span>
                </li>
                <li>
                  <CheckIcon size={16} className="text-orange" />
                  <span>Portfolio-ready capstone project</span>
                </li>
                <li>
                  <CheckIcon size={16} className="text-orange" />
                  <span>Private student Discord community</span>
                </li>
                <li>
                  <CheckIcon size={16} className="text-orange" />
                  <span>Verified Builder Certificate of Completion</span>
                </li>
              </ul>
            </div>

            <div className="need-help-card card">
              <h4>Need help choosing?</h4>
              <p>
                Not sure which track matches your goals? Reach out to an instructor directly.
              </p>
              <Link to="/#courses" className="link-arrow">
                Explore all courses <ArrowRightIcon size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
