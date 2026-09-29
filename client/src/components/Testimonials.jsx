import { TESTIMONIAL_PLACEHOLDERS } from "../data/coursesData";

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>COMMUNITY FEEDBACK</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Built for Students, <br />
            <span className="text-brand-orange">Validated by Builders.</span>
          </h2>

          <p className="section-subtitle">
            See how practical project training and live mentorship help students
            break through the frustration of theoretical tutorials.
          </p>
          <div className="placeholder-notice-pill">
            <span>ℹ️ Student feedback preview</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIAL_PLACEHOLDERS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="quote-mark">“</div>
              <p className="testimonial-quote">{t.quote}</p>

              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <h4 className="author-name">{t.name}</h4>
                  <p className="author-role">{t.role}</p>
                  <span className="author-track">{t.track}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
