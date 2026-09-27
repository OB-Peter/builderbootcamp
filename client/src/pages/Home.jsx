import { Link } from "react-router-dom";

const TRACKS = [
  "Frontend Engineering",
  "Backend Engineering",
  "Cloud & DevOps",
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="brand">
            <span className="brand-mark">BB</span>
            <span className="brand-name">Builder Bootcamp</span>
          </div>

          <p className="eyebrow">Bootcamp 1.0 — Build with AI</p>

          <h1>
            3-month practical
            <br />
            software engineering
            <br />
            training
          </h1>

          <ul className="tracks">
            {TRACKS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="meta-row">
            <div className="meta">
              <span className="meta-label">Format</span>
              <span className="meta-value">100% online — live on Google Meet</span>
            </div>
            <div className="meta">
              <span className="meta-label">Start date</span>
              <span className="meta-value">6th October</span>
            </div>
          </div>

          <div className="pricing">
            <div className="price-badge">
              <span className="price-label">Regular price, per stack</span>
              <span className="price-value">₦20,000</span>
            </div>
            <div className="price-badge price-badge--accent">
              <span className="price-label">First 10 students</span>
              <span className="price-value">₦15,000</span>
            </div>
          </div>

          <Link to="/register">
            <button className="cta">Choose your stack</button>
          </Link>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="grid-lines" />
          <div className="glow" />
        </div>
      </section>

      <section className="tagline-band">
        <p>Learn the skills. Build real projects. Deploy your application.</p>
      </section>

      <footer className="footer">
        <p>builderbootcamp@gmail.com</p>
      </footer>
    </div>
  );
}