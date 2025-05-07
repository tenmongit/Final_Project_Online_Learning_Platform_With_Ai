import React from "react";

const courses = [
  {
    id: "ai",
    title: "Introduction to AI",
    description: "Learn the basics of Artificial Intelligence, including machine learning and neural networks.",
    working: true
  },
  {
    id: "webdev",
    title: "Web Development 101",
    description: "Placeholder: Learn how to build modern web applications.",
    working: false
  },
  {
    id: "python",
    title: "Python for Beginners",
    description: "Placeholder: Start programming with Python.",
    working: false
  },
  {
    id: "datasci",
    title: "Data Science Essentials",
    description: "Placeholder: Dive into data analysis and visualization.",
    working: false
  }
];

export default function CourseCatalogue({ onSelectCourse }) {
  return (
    <div>
      <h1 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "1.5rem" }}>Course Catalogue</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem"
      }}>
        {courses.map(course => (
          <div
            key={course.id}
            className="course-card"
            style={{
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(80,112,255,0.06)",
              padding: "1.2rem 1rem",
              opacity: course.working ? 1 : 0.6,
              cursor: course.working ? "pointer" : "not-allowed",
              border: course.working ? "2px solid #4a6bff" : "2px solid #e5eaf1",
              transition: "box-shadow 0.2s"
            }}
            onClick={() => course.working && onSelectCourse(course.id)}
            title={course.working ? "Open course" : "This is a placeholder"}
          >
            <div style={{ fontWeight: 600, fontSize: "1.1rem", color: "#1d3d91", marginBottom: 8 }}>{course.title}</div>
            <div style={{ color: "#555", fontSize: "0.98rem", marginBottom: 10 }}>{course.description}</div>
            {course.working ? (
              <button
                style={{
                  background: "#4a6bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  padding: "0.5rem 1rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                View Course
              </button>
            ) : (
              <button
                style={{
                  background: "#e5eaf1",
                  color: "#aaa",
                  border: "none",
                  borderRadius: 5,
                  padding: "0.5rem 1rem",
                  fontWeight: 600,
                  cursor: "not-allowed"
                }}
                disabled
              >
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
