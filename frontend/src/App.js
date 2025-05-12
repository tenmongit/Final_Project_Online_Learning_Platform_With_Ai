import React, { useState } from "react";
import CoursePage from "./CoursePage";
import UserProfile from "./UserProfile";
import CourseCatalogue from "./CourseCatalogue";
import LoginPage from "./LoginPage";


function App() {
  const [page, setPage] = useState("profile");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <LoginPage onLogin={() => setIsAuthenticated(true)} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1f2e]">
      {/* Top Navbar */}
      <header className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg sticky top-0 z-20 border-b border-gray-800">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          <button 
            onClick={() => { setPage("profile"); setSelectedCourse(null); }}
            className="text-xl font-extrabold tracking-wide text-white drop-shadow-lg hover:scale-105 transition-transform focus:outline-none"
          >
            Tigers Education
          </button>
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "profile" ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/80"}`}
              onClick={() => { setPage("profile"); setSelectedCourse(null); }}
            >
              Profile
            </button>
            <button
              className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "catalogue" ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/80"}`}
              onClick={() => { setPage("catalogue"); setSelectedCourse(null); }}
            >
              Courses
            </button>
            {selectedCourse === "ai" && (
              <button
                className={`px-3 py-1 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 shadow-sm ${page === "course" ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/80"}`}
                onClick={() => setPage("course")}
              >
                Introduction to AI
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full bg-[#1a1f2e]">
        <div className="container mx-auto px-4 py-6 w-full max-w-4xl">
          {/* We don't need the container since each component has its own container */}
          {page === "profile" && <UserProfile onSignOut={() => setIsAuthenticated(false)} />}
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
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 border-t border-gray-800 py-3 text-center text-white text-sm mt-8 shadow-inner">
        &copy; {new Date().getFullYear()} LearnAI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
