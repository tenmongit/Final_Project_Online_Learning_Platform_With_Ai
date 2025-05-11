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
      <h1 className="font-bold text-2xl mb-6">Course Catalogue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course.id}
            className={`rounded-xl shadow p-5 bg-white flex flex-col justify-between border transition hover:shadow-lg ${course.working ? 'border-blue-400 cursor-pointer' : 'border-gray-200 opacity-60 cursor-not-allowed'}`}
            onClick={() => course.working && onSelectCourse(course.id)}
            title={course.working ? "Open course" : "This is a placeholder"}
          >
            <div>
              <div className="font-semibold text-lg text-blue-900 mb-2">{course.title}</div>
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
                  className="w-full mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition-colors"
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
  );
}
