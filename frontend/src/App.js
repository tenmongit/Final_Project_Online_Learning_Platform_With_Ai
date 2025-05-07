import React, { useState } from "react";
import CoursePage from "./CoursePage";
import UserProfile from "./UserProfile";
import CourseCatalogue from "./CourseCatalogue";
import "./App.css";

function App() {
  const [page, setPage] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // For course navigation, optionally store selected course id
  // Only 'ai' is implemented
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="app-root">
      {/* Sticky Header */}
      <header className="app-header">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span className="hamburger" />
        </button>
        <h1 className="header-title">LearnAI Platform</h1>
      </header>

      <div className="app-layout">
        {/* Sidebar (collapsible on mobile) */}
        <nav className={`sidebar${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)}>
          <div className="sidebar-content">
            <button
              className={`sidebar-link${page === "profile" ? " active" : ""}`}
              onClick={e => { e.stopPropagation(); setPage("profile"); setSelectedCourse(null); }}
            >
              User Profile
            </button>
            <button
              className={`sidebar-link${page === "catalogue" ? " active" : ""}`}
              onClick={e => { e.stopPropagation(); setPage("catalogue"); setSelectedCourse(null); }}
            >
              Course Catalogue
            </button>
            {/* Only show Course Page if a course is selected */}
            {selectedCourse === "ai" && (
              <button
                className={`sidebar-link${page === "course" ? " active" : ""}`}
                onClick={e => { e.stopPropagation(); setPage("course"); }}
              >
                Introduction to AI
              </button>
            )}

          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <div className="main-card">
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
      </div>
    </div>
  );
}

export default App;
