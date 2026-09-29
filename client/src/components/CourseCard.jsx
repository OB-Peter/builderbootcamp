import { Link } from "react-router-dom";
import {
  CodeIcon,
  TerminalIcon,
  LayersIcon,
  LaptopIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
} from "./Icons";

function getCourseIcon(iconName) {
  switch (iconName) {
    case "terminal":
      return <TerminalIcon size={22} />;
    case "layers":
      return <LayersIcon size={22} />;
    case "laptop":
      return <LaptopIcon size={22} />;
    case "sparkles":
      return <SparklesIcon size={22} />;
    default:
      return <CodeIcon size={22} />;
  }
}

export default function CourseCard({ course }) {
  const registerUrl = `/register?course=${encodeURIComponent(course.id || course.name)}`;

  return (
    <div className="course-card">
      <div className="course-card-top">
        <div className="course-icon-badge">
          {getCourseIcon(course.icon)}
        </div>
        {course.badge && (
          <span className="course-popular-tag">{course.badge}</span>
        )}
      </div>

      <div className="course-card-header">
        <span className="course-category-label">{course.category || "Development Track"}</span>
        <h3 className="course-title">{course.name}</h3>
        <p className="course-description">{course.shortDescription || course.description}</p>
      </div>

      <div className="course-meta-tags">
        <span className="course-pill pill-level">
          {course.level || "Beginner"}
        </span>
        <span className="course-pill pill-duration">
          {course.duration || "8 Weeks"}
        </span>
      </div>

      {course.highlights && course.highlights.length > 0 && (
        <ul className="course-highlights-list">
          {course.highlights.slice(0, 3).map((item, idx) => (
            <li key={idx}>
              <span className="highlight-icon">
                <CheckIcon size={13} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="course-card-footer">
        <div className="course-pricing">
          <span className="price-sub">Tuition</span>
          <span className="price-value">
            {course.priceFormatted || (course.price_kobo ? `₦${(course.price_kobo / 100).toLocaleString()}` : "₦XX,XXX")}
          </span>
        </div>

        <Link to={registerUrl} className="btn-course-action">
          <span>Enroll Track</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  );
}
