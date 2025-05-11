import React, { useState } from "react";
import CoursePage from "./CoursePage";
import UserProfile from "./UserProfile";
import CourseCatalogue from "./CourseCatalogue";


function App() {
  const [page, setPage] = useState("profile");
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 shadow-lg sticky top-0 z-20 border-b border-cyan-200">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          <span className="text-xl font-extrabold tracking-wide text-white drop-shadow-lg">LearnAI Platform</span>
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "profile" ? "bg-white/20 text-white" : "hover:bg-white/10 text-cyan-50"}`}
              onClick={() => { setPage("profile"); setSelectedCourse(null); }}
            >
              Profile
            </button>
            <button
              className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "catalogue" ? "bg-white/20 text-white" : "hover:bg-white/10 text-cyan-50"}`}
              onClick={() => { setPage("catalogue"); setSelectedCourse(null); }}
            >
              Courses
            </button>
            {selectedCourse === "ai" && (
              <button
                className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "course" ? "bg-white/20 text-white" : "hover:bg-white/10 text-cyan-50"}`}
                onClick={() => setPage("course")}
              >
                Introduction to AI
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-6 w-full max-w-4xl">
          <div className="bg-white rounded-t-3xl rounded-b-xl shadow-2xl p-6 min-h-[300px] shadow-cyan-200/50 shadow-lg relative overflow-hidden">
            {/* Subtle lagoon gradient fade at top */}
            <div className="absolute left-0 top-0 w-full h-16 rounded-t-3xl bg-gradient-to-b from-cyan-100/70 via-white/0 to-white/0 pointer-events-none z-0" />
            {page === "profile" && <UserProfile />}
            {page === "catalogue" && (
              <CourseCatalogue
                onSelectCourse={courseId => {
                  if (courseId === "ai") {
                    setSelectedCourse("ai");
                    setPage("course");
                  }
                }}
              />
            )}
            {page === "course" && selectedCourse === "ai" && <CoursePage />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-400 border-t border-cyan-200 py-3 text-center text-cyan-50 text-sm mt-8 shadow-inner">
        &copy; {new Date().getFullYear()} LearnAI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
