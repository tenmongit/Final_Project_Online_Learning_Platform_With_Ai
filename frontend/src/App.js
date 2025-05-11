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
      <header className="w-full bg-white shadow-sm sticky top-0 z-20">
        <nav className="container mx-auto flex items-center justify-between py-3 px-4">
          <span className="text-xl font-bold text-blue-700">LearnAI Platform</span>
          <div className="flex gap-4">
            <button
              className={`px-3 py-1 rounded font-medium transition-colors ${page === "profile" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
              onClick={() => { setPage("profile"); setSelectedCourse(null); }}
            >
              Profile
            </button>
            <button
              className={`px-3 py-1 rounded font-medium transition-colors ${page === "catalogue" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
              onClick={() => { setPage("catalogue"); setSelectedCourse(null); }}
            >
              Courses
            </button>
            {selectedCourse === "ai" && (
              <button
                className={`px-3 py-1 rounded font-medium transition-colors ${page === "course" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
                onClick={() => setPage("course")}
              >
                Introduction to AI
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[300px]">
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
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-3 text-center text-gray-400 text-sm mt-8">
        &copy; {new Date().getFullYear()} LearnAI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
