import { HOW_IT_WORKS_STEPS } from "../data/coursesData";
import { ArrowRightIcon } from "./Icons";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>HOW IT WORKS</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Your Fast Track From <br />
            <span className="text-brand-orange">Curious to Builder.</span>
          </h2>

          <p className="section-subtitle">
            A frictionless, 4-step onboarding process engineered to get you straight into
            hands-on software development with your cohort.
          </p>
        </div>

        <div className="steps-container">
          <div className="steps-connector-bar" aria-hidden="true" />

          <div className="steps-grid">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-badge-wrapper">
                  <span className="step-number">{step.step}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="how-it-works-cta">
          <Link to="/register" className="btn btn-primary">
            <span>Get Started in 4 Easy Steps</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
