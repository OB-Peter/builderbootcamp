import { useState, useEffect } from "react";
import { DEFAULT_COURSES } from "../data/coursesData";
import { fetchCourses } from "../api/paystack";
import CourseCard from "./CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;
    fetchCourses()
      .then((serverCourses) => {
        if (!isMounted || !Array.isArray(serverCourses) || serverCourses.length === 0) return;

        const merged = DEFAULT_COURSES.map((localCourse) => {
          const matched = serverCourses.find(
            (sc) =>
              sc.id === localCourse.id ||
              sc.name?.toLowerCase().includes(localCourse.name.toLowerCase().split(" ")[0])
          );
          if (matched) {
            return {
              ...localCourse,
              id: matched.id,
              name: matched.name || localCourse.name,
              price_kobo: matched.price_kobo || localCourse.price_kobo,
              priceFormatted: `₦${(matched.price_kobo / 100).toLocaleString()}`,
              description: matched.description || localCourse.description,
            };
          }
          return localCourse;
        });

        serverCourses.forEach((sc) => {
          if (!merged.some((m) => m.id === sc.id)) {
            merged.push({
              id: sc.id,
              name: sc.name,
              category: "Specialized",
              shortDescription: sc.description || "Practical engineering track with real projects.",
              level: "Beginner",
              duration: "8 Weeks",
              price_kobo: sc.price_kobo,
              priceFormatted: `₦${(sc.price_kobo / 100).toLocaleString()}`,
              icon: "code",
              highlights: ["Live cohort mentorship", "Portfolio project", "Code reviews"],
            });
          }
        });

        setCourses(merged);
      })
      .catch((err) => {
        console.log("Using default course catalogue:", err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["All", "Full Stack", "Backend", "DevOps", "Frontend"];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <section className="courses-section" id="courses">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>WHAT YOU CAN LEARN</span>
            <span className="eyebrow-line" />
          </div>

          <h2 className="section-title">
            Skills That Turn Ideas <br />
            <span className="text-brand-orange">Into Working Software.</span>
          </h2>

          <p className="section-subtitle">
            Curated, practical tracks designed to take you from your first line of code
            to shipping production applications. No theoretical filler—just real software skills.
          </p>

          <div className="course-filter-bar" role="tablist" aria-label="Course categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-pill ${activeCategory === cat ? "filter-pill-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id || course.name} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
