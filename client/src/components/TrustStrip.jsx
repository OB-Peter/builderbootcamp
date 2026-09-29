import { TRUST_INDICATORS } from "../data/coursesData";
import { CheckIcon } from "./Icons";

export default function TrustStrip() {
  return (
    <section className="trust-strip-section" aria-label="Key Advantages">
      <div className="section-container">
        <div className="trust-strip-grid">
          {TRUST_INDICATORS.map((item, idx) => (
            <div key={idx} className="trust-strip-item">
              <div className="trust-icon-box">
                <CheckIcon size={18} />
              </div>
              <div className="trust-text-group">
                <span className="trust-item-title">{item.label}</span>
                <span className="trust-item-sub">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
