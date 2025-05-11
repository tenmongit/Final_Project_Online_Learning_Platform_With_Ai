import React, { useEffect, useState } from "react";
import { getProgress } from "./api";

export default function UserProfile() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProgress()
      .then(setProgress)
      .catch(() => setError("Failed to fetch progress."))
      .finally(() => setLoading(false));
  }, []);

  // Static user info for demonstration
  const user = {
    name: "Jane Doe",
    email: "jane.doe@email.com",
    avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=14b8a6&color=fff"
  };

  return (
    <div className="relative flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-cyan-100 to-white py-8 overflow-hidden">
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
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="relative w-28 h-28">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 border-teal-300 shadow-lg shadow-cyan-200/60"
              />
              {/* Gray face shadow overlay */}
              <svg className="absolute left-0 top-0 w-28 h-28 pointer-events-none" viewBox="0 0 112 112">
                <ellipse cx="56" cy="80" rx="40" ry="18" fill="url(#grayShadow)" opacity="0.28" />
                <defs>
                  <radialGradient id="tealShadow" cx="50%" cy="50%" r="50%" fx="50%" fy="80%">
                    <stop offset="0%" stop-color="#0097a7" stop-opacity="0.7" />
                    <stop offset="100%" stop-color="#cce6f4" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>
              <span className="absolute bottom-2 right-2 bg-teal-500 text-white text-xs px-3 py-1 rounded-full shadow">Learner</span>
            </div>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-2xl text-teal-700 mb-1">{user.name}</div>
            <div className="text-teal-400 text-sm mb-1">{user.email}</div>
          </div>
        </div>
        <div className="border-t border-cyan-100 mb-6"></div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3 text-teal-500">Course Progress</h2>
          {loading && <div>Loading progress...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {progress && (
            <div className="flex flex-col items-center">
              {/* Progress Ring */}
              <div className="relative mb-2">
                <svg className="w-20 h-20" viewBox="0 0 40 40">
  <circle
    cx="20" cy="20" r="18"
    fill="none"
    stroke="#e0e7ff"
    strokeWidth="4"
  />
  <circle
    cx="20" cy="20" r="18"
    fill="none"
    stroke="#14b8a6"
    strokeWidth="4"
    strokeDasharray={2 * Math.PI * 18}
    strokeDashoffset={2 * Math.PI * 18 * (1 - (Number(progress.percent) || 0) / 100)}
    strokeLinecap="round"
    style={{
      transition: 'stroke-dashoffset 0.5s',
      filter: 'drop-shadow(0 0 2px #14b8a6)',
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%'
    }}
  />
  <text
    x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
    className="fill-teal-700 text-xl font-bold" fontSize="1.1rem"
    style={{ pointerEvents: 'none', userSelect: 'none' }}
  >
    {(Number(progress.percent) || 0)}%
  </text>
</svg>
              </div>
              <div className="text-teal-700 font-semibold mb-1">{progress.percent}% complete</div>
              <div className="text-gray-500 text-xs">Keep learning to reach 100%!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
