import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, CodeIcon, SparklesIcon } from "./Icons";

export default function Hero() {
  const scrollToCourses = (e) => {
    e.preventDefault();
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section" id="top">
      <div className="hero-glow-blob" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="section-container hero-container">
        <div className="hero-left">
          <div className="hero-eyebrow-badge">
            <span className="badge-dot" />
            <span>PRACTICAL SOFTWARE TRAINING</span>
          </div>

          <h1 className="hero-title">
            Learn. <span className="text-brand-orange">Build.</span> Launch.
          </h1>

          <p className="hero-subtitle">
            Move from endless tutorial watching to building real-world software.
            BuilderBootcamp provides hands-on, practical engineering tracks
            tailored for students and beginners ready to create deployable
            applications.
          </p>

          <div className="hero-cta-group">
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>Start Learning</span>
              <ArrowRightIcon size={18} />
            </Link>

            <a
              href="#courses"
              onClick={scrollToCourses}
              className="btn btn-secondary btn-lg"
            >
              <span>Explore Courses</span>
            </a>
          </div>

          <div className="hero-value-checks">
            <div className="value-check-item">
              <span className="check-icon-circle">
                <CheckIcon size={14} />
              </span>
              <span>Hands-on learning</span>
            </div>
            <div className="value-check-item">
              <span className="check-icon-circle">
                <CheckIcon size={14} />
              </span>
              <span>Real projects</span>
            </div>
            <div className="value-check-item">
              <span className="check-icon-circle">
                <CheckIcon size={14} />
              </span>
              <span>Beginner friendly</span>
            </div>
            <div className="value-check-item">
              <span className="check-icon-circle">
                <CheckIcon size={14} />
              </span>
              <span>Student focused</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="code-mockup-wrapper">
            <div className="code-mockup-card">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="mockup-tab">
                  <CodeIcon size={14} />
                  <span>StudentProject.jsx</span>
                </div>
                <div className="mockup-branch">main*</div>
              </div>

              <div className="mockup-code-body">
                <pre>
                  <code>
                    <span className="code-comment">// 1. Build real components</span>{"\n"}
                    <span className="code-keyword">import</span> &#123; useState, useEffect &#125; <span className="code-keyword">from</span> <span className="code-string">"react"</span>;{"\n"}
                    <span className="code-keyword">import</span> &#123; initPayment &#125; <span className="code-keyword">from</span> <span className="code-string">"./paystack"</span>;{"\n\n"}
                    <span className="code-keyword">export default function</span> <span className="code-func">App</span>() &#123;{"\n"}
                    {"  "}<span className="code-keyword">const</span> [student, setStudent] = <span className="code-func">useState</span>(&#123;{"\n"}
                    {"    "}name: <span className="code-string">"Ambitious Student"</span>,{"\n"}
                    {"    "}track: <span className="code-string">"Full-Stack Web Dev"</span>,{"\n"}
                    {"    "}builtProjects: <span className="code-num">4</span>,{"\n"}
                    {"  "}&#125;);{"\n\n"}
                    {"  "}<span className="code-comment">// 2. Deploy to production</span>{"\n"}
                    {"  "}<span className="code-keyword">return</span> &lt;<span className="code-tag">LiveApplication</span> status=<span className="code-string">"deployed"</span> /&gt;;{"\n"}
                    &#125;
                  </code>
                </pre>
              </div>

              <div className="mockup-terminal-footer">
                <span className="terminal-status-dot" />
                <span className="terminal-text">Build succeeded: compiled in 240ms • 0 errors</span>
              </div>
            </div>

            <div className="hero-floating-badge badge-top-right">
              <span className="badge-icon-wrap">
                <SparklesIcon size={18} />
              </span>
              <div>
                <p className="badge-label">Practical Velocity</p>
                <p className="badge-sub">From Zero to First App in 14 Days</p>
              </div>
            </div>

            <div className="hero-floating-badge badge-bottom-left">
              <span className="badge-pulse-indicator" />
              <div>
                <p className="badge-label">100% Project Based</p>
                <p className="badge-sub">React • Node.js • Paystack • Git</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
