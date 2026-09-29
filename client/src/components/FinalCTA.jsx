import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon } from "./Icons";

export default function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="section-container">
        <div className="final-cta-card">
          <div className="cta-pattern" aria-hidden="true" />
          <div className="cta-glow" aria-hidden="true" />

          <div className="final-cta-content">
            <span className="cta-eyebrow">TAKE THE LEAP</span>
            <h2 className="cta-heading">Ready to Start Building?</h2>
            <p className="cta-subheading">
              Learn practical software skills, build real projects, and take the next step
              in your technology journey. Your cohort is waiting.
            </p>

            <div className="cta-button-wrap">
              <Link to="/register" className="btn btn-cta-light">
                <span>Join BuilderBootcamp</span>
                <ArrowRightIcon size={18} />
              </Link>
            </div>

            <div className="cta-features-inline">
              <div className="cta-feature-item">
                <CheckIcon size={14} />
                <span>Beginner Friendly</span>
              </div>
              <div className="cta-feature-item">
                <CheckIcon size={14} />
                <span>Paystack Secure Checkout</span>
              </div>
              <div className="cta-feature-item">
                <CheckIcon size={14} />
                <span>100% Practical Training</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
