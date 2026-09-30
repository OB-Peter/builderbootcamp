import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "./Icons";
import logoImg from "../assets/bootcamp-logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (sectionId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? "navbar-scrolled" : ""} ${
        mobileMenuOpen ? "mobile-menu-active" : ""
      }`}
    >
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={(e) => handleNavClick(e, "top")}
          aria-label="BuilderBootcamp Home"
        >
          <img
            src={logoImg}
            alt="BuilderBootcamp Logo"
            width={40}
            height={40}
            className="navbar-logo-mark"
          />
          <span className="navbar-brand-name">BuilderBootcamp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop-links" aria-label="Main Navigation">
          <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="nav-link">
            About
          </a>
          <a href="#courses" onClick={(e) => handleNavClick(e, "courses")} className="nav-link">
            Courses
          </a>
          <a href="#why-us" onClick={(e) => handleNavClick(e, "why-us")} className="nav-link">
            Why Us
          </a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, "how-it-works")} className="nav-link">
            How It Works
          </a>
          <a href="#outcomes" onClick={(e) => handleNavClick(e, "outcomes")} className="nav-link">
            Projects
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className="nav-link">
            FAQ
          </a>
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="navbar-actions">
          <Link to="/register" className="btn btn-primary btn-nav">
            <span>Join Now</span>
            <ArrowRightIcon size={16} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="navbar-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className="navbar-mobile-dropdown"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <nav className="mobile-dropdown-links">
              <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="mobile-dropdown-link">
                <span>About</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#courses" onClick={(e) => handleNavClick(e, "courses")} className="mobile-dropdown-link">
                <span>Courses</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#why-us" onClick={(e) => handleNavClick(e, "why-us")} className="mobile-dropdown-link">
                <span>Why BuilderBootcamp</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#how-it-works" onClick={(e) => handleNavClick(e, "how-it-works")} className="mobile-dropdown-link">
                <span>How It Works</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#outcomes" onClick={(e) => handleNavClick(e, "outcomes")} className="mobile-dropdown-link">
                <span>Student Outcomes</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className="mobile-dropdown-link">
                <span>FAQ</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="mobile-dropdown-link">
                <span>Contact</span>
                <span className="dropdown-link-arrow" aria-hidden="true">→</span>
              </a>
            </nav>

            <div className="mobile-dropdown-footer">
              <Link
                to="/register"
                className="btn btn-primary btn-block btn-mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Join BuilderBootcamp</span>
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
