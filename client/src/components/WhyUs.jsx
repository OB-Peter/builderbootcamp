import { WHY_CHOOSE_US } from "../data/coursesData";
import {
  CodeIcon,
  BookOpenIcon,
  LaptopIcon,
  UsersIcon,
  TerminalIcon,
  SparklesIcon,
} from "./Icons";

function getFeatureIcon(icon) {
  switch (icon) {
    case "code":
      return <CodeIcon size={24} />;
    case "book":
      return <BookOpenIcon size={24} />;
    case "laptop":
      return <LaptopIcon size={24} />;
    case "users":
      return <UsersIcon size={24} />;
    case "terminal":
      return <TerminalIcon size={24} />;
    case "sparkles":
      return <SparklesIcon size={24} />;
    default:
      return <CodeIcon size={24} />;
  }
}

export default function WhyUs() {
  return (
    <section className="why-us-section" id="why-us">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>WHY BUILDERBOOTCAMP</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Built Around How You <br />
            <span className="text-brand-orange">Actually Learn to Code.</span>
          </h2>

          <p className="section-subtitle">
            Traditional education moves too slow, and generic video playlists leave you stranded.
            Our methodology is engineered to give students practical competence and confidence.
          </p>
        </div>

        <div className="features-grid">
          {WHY_CHOOSE_US.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                {getFeatureIcon(feature.icon)}
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
