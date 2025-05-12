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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1f2e] py-10">
      <div className="bg-[#232836]/90 shadow-2xl rounded-2xl p-10 max-w-4xl w-full animate-fade-in">
        <h1 className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight">Course Catalogue</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className={`rounded-xl shadow-lg p-6 flex flex-col justify-between transition hover:shadow-xl ${course.working ? 'bg-[#2a2f3d] border border-indigo-500/30 cursor-pointer hover:border-indigo-400' : 'bg-[#252a38] border border-gray-700/30 opacity-70 cursor-not-allowed'}`}
              onClick={() => course.working && onSelectCourse(course.id)}
              title={course.working ? "Open course" : "This is a placeholder"}
            >
              <div>
                <div className="font-bold text-lg text-white mb-3 flex items-center flex-wrap gap-2">
                  {course.title}
                  {course.working && <span className="ml-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">Available</span>}
                  {!course.working && <span className="ml-2 bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">Soon</span>}
                </div>
                <div className="text-gray-400 text-sm mb-4">{course.description}</div>
              </div>
              <div className="flex justify-end">
                {course.working ? (
                  <button 
                    className="px-4 py-2 rounded text-sm font-medium bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-colors"
                    onClick={() => onSelectCourse(course.id)}
                  >
                    Start Learning
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded text-sm font-medium bg-gray-700 text-gray-400"
                    disabled
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
