import { OUTCOME_PROJECTS } from "../data/coursesData";
import { CheckIcon } from "./Icons";

export default function Outcomes() {
  const outcomeBenefits = [
    "Deep software development & systems knowledge",
    "Practical, hands-on production experience",
    "Deployable portfolio projects on your GitHub",
    "Confident debugging & algorithmic problem solving",
    "Proficiency with modern developer tools (Git, VS Code, DBs)",
    "Strong foundation for internships, freelancing & careers",
  ];

  return (
    <section className="outcomes-section" id="outcomes">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>PROJECT & OUTCOME SHOWCASE</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Don't Just Finish a Course. <br />
            <span className="text-brand-orange">Build Something Real.</span>
          </h2>

          <p className="section-subtitle">
            Theory without execution won't help your career. At BuilderBootcamp, you graduate
            with tangible, working applications pushed to GitHub and deployed live on the web.
          </p>
        </div>

        <div className="projects-grid">
          {OUTCOME_PROJECTS.map((proj, idx) => (
            <div key={idx} className="project-card">
              <div className="project-card-header">
                <span className="project-type-tag">{proj.type}</span>
                <span className="project-metric-pill">{proj.metrics}</span>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-description">{proj.description}</p>

              <div className="project-tags-list">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-card-footer">
                <div className="project-status-indicator">
                  <span className="status-live-dot" />
                  <span>Interactive Project Milestone</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="outcomes-summary-box">
          <div className="outcomes-summary-content">
            <div className="summary-left">
              <span className="summary-eyebrow">WHAT YOU GAIN</span>
              <h3 className="summary-heading">
                Real Engineering Capability, Not Just A Completion Certificate.
              </h3>
              <p className="summary-text">
                Every curriculum module is anchored by measurable outcomes designed to make
                you independent, resourceful, and capable of turning new ideas into production code.
              </p>
            </div>

            <div className="summary-right">
              <ul className="outcomes-checklist">
                {outcomeBenefits.map((benefit, i) => (
                  <li key={i}>
                    <span className="outcome-check-circle">
                      <CheckIcon size={14} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
