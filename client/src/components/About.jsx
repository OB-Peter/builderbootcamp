import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon } from "./Icons";

export default function About() {
  const steps = [
    { label: "LEARN", text: "Digest clear, focused software fundamentals" },
    { label: "PRACTICE", text: "Complete guided coding labs & debugging tasks" },
    { label: "BUILD", text: "Architect full-stack projects from scratch" },
    { label: "GROW", text: "Deploy live apps and build an impressive portfolio" },
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-eyebrow">
              <span className="eyebrow-line" />
              <span>ABOUT BUILDERBOOTCAMP</span>
            </div>

            <h2 className="section-title">
              Stop Just Watching. <br />
              <span className="text-brand-orange">Start Building.</span>
            </h2>

            <div className="about-prose">
              <p>
                Most beginners and university students get trapped in "tutorial
                hell"—watching hours of video tutorials without ever feeling
                confident enough to build something from a blank editor.
                BuilderBootcamp was built to solve this exact problem.
              </p>
              <p>
                We focus 100% on hands-on practical software engineering. From your
                very first week, you are writing code, configuring tools like Git and
                VS Code, connecting frontend interfaces to databases, and deploying
                working applications to the cloud.
              </p>
            </div>

            <div className="progression-flow">
              <p className="progression-title">The Builder Progression:</p>
              <div className="progression-track">
                {steps.map((st, i) => (
                  <div key={i} className="progression-step">
                    <div className="progression-node">
                      <span className="node-number">{i + 1}</span>
                    </div>
                    <div className="progression-details">
                      <strong className="progression-label">{st.label}</strong>
                      <span className="progression-desc">{st.text}</span>
                    </div>
                    {i < steps.length - 1 && <div className="progression-connector" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="about-action">
              <Link to="/register" className="btn btn-primary">
                <span>Join BuilderBootcamp</span>
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </div>

          <div className="about-visual">
            <div className="comparison-card card-passive">
              <div className="card-badge badge-warning">The Tutorial Trap</div>
              <h4 className="card-title">Passive Watching</h4>
              <ul className="comparison-list">
                <li>Copying code without understanding why it works</li>
                <li>Instant panic when encountering an error message</li>
                <li>No portfolio or deployable work to demonstrate</li>
                <li>Feeling unprepared for internships or tech roles</li>
              </ul>
            </div>

            <div className="comparison-card card-builder">
              <div className="card-badge badge-accent">The Builder Method</div>
              <h4 className="card-title">Active Engineering</h4>
              <ul className="comparison-list">
                <li>
                  <span className="list-icon"><CheckIcon size={14} /></span>
                  Write structured code from scratch
                </li>
                <li>
                  <span className="list-icon"><CheckIcon size={14} /></span>
                  Master debugging and problem solving
                </li>
                <li>
                  <span className="list-icon"><CheckIcon size={14} /></span>
                  Deploy 3+ production projects with live URLs
                </li>
                <li>
                  <span className="list-icon"><CheckIcon size={14} /></span>
                  Real tools: Git, GitHub, MySQL, Express & React
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
