import { Link } from "react-router-dom";
import { BrandLogoMark } from "./Icons";

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-dark" id="contact">
      <div className="section-container">
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand" onClick={(e) => scrollTo(e, "top")}>
              <BrandLogoMark size={32} />
              <span className="footer-brand-title">BuilderBootcamp</span>
            </Link>
            <p className="footer-desc">
              Practical software engineering tutorials and intensive training designed for
              students and ambitious beginners. Learn by building real, deployable projects.
            </p>
            <div className="footer-social-links">
              <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Gmail">
                Gm
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links-list">
              <li><a href="#top" onClick={(e) => scrollTo(e, "top")}>Home</a></li>
              <li><a href="#about" onClick={(e) => scrollTo(e, "about")}>About</a></li>
              <li><a href="#courses" onClick={(e) => scrollTo(e, "courses")}>Courses</a></li>
              <li><a href="#why-us" onClick={(e) => scrollTo(e, "why-us")}>Why Us</a></li>
              <li><a href="#how-it-works" onClick={(e) => scrollTo(e, "how-it-works")}>How It Works</a></li>
              <li><a href="#faq" onClick={(e) => scrollTo(e, "faq")}>FAQ</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Programs</h4>
            <ul className="footer-links-list">
              <li><Link to="/register?course=2">Backend Engineering</Link></li>
              <li><Link to="/register?course=3">Cloud & DevOps</Link></li>
              <li><Link to="/register?course=4">Frontend with Angular</Link></li>

            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Contact & Support</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-label">Email:</span>
                <a href="mailto:builderbootcamp@gmail.com">builderbootcamp@gmail.com</a>
              </li>
              <li>
                <span className="contact-label">Student Hotline:</span>
                <span>+234 (0) 9072101755,  +2348032212417</span>
              </li>
              <li>
                <span className="contact-label">Format:</span>
                <span>100% Online Cohorts</span>
              </li>
              <li>
                <span className="contact-label">Payments:</span>
                <span>Paystack Verified Gateway</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} BuilderBootcamp. All rights reserved. Built for student builders.
          </p>
          <div className="legal-links">
            <span className="legal-link">Privacy Policy</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Terms of Service</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
