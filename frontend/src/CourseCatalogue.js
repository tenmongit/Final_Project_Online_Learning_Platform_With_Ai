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
    <div className="relative flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-teal-500 to-white py-8 overflow-hidden">
      {/* Decorative SVG lagoon background figures */}
      <svg className="absolute left-[-120px] top-[-80px] w-[300px] h-[300px] opacity-40 blur-2xl z-0" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" fill="#14b8a6" />
        <circle cx="110" cy="110" r="60" fill="#06b6d4" opacity="0.3" />
      </svg>
      <svg className="absolute right-[-100px] bottom-[-80px] w-[260px] h-[260px] opacity-30 blur-2xl z-0" viewBox="0 0 260 260" fill="none">
        <ellipse cx="130" cy="130" rx="120" ry="90" fill="#22d3ee" />
        <ellipse cx="180" cy="100" rx="40" ry="20" fill="#2dd4bf" opacity="0.4" />
      </svg>
      <svg className="absolute left-[30%] top-[80%] w-[120px] h-[120px] opacity-20 blur-2xl z-0" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="60" fill="#67e8f9" />
      </svg>
      {/* Courses Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <h1 className="font-extrabold text-3xl text-teal-700 mb-8 text-center drop-shadow">Course Catalogue</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className={`rounded-xl shadow p-6 bg-white flex flex-col justify-between border transition hover:shadow-lg ${course.working ? 'border-teal-400 cursor-pointer' : 'border-gray-200 opacity-60 cursor-not-allowed'}`}
              onClick={() => course.working && onSelectCourse(course.id)}
              title={course.working ? "Open course" : "This is a placeholder"}
            >
              <div>
                <div className="font-bold text-lg text-teal-700 mb-2 flex items-center gap-2">
                  {course.title}
                  {course.working && <span className="ml-2 bg-cyan-100 text-teal-600 text-xs px-2 py-0.5 rounded-full">Available</span>}
                  {!course.working && <span className="ml-2 bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">Soon</span>}
                </div>
                <div className="text-gray-600 text-sm mb-4">{course.description}</div>
              </div>
              {course.working ? (
                <a
                  href={course.id === 'ai' ? '/course-page' : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => { e.stopPropagation(); }}
                  className="block"
                >
                  <button
                    className="w-full mt-2 py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700 font-semibold transition-colors shadow"
                    onClick={e => { e.preventDefault(); onSelectCourse(course.id); }}
                  >
                    View Course
                  </button>
                </a>
              ) : (
                <button
                  className="w-full mt-2 py-2 px-4 bg-gray-200 text-gray-400 rounded font-semibold cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
