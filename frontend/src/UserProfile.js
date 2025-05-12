import React, { useEffect, useState } from "react";
import { getProgress } from "./api";

export default function UserProfile({ onSignOut }) {
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
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e] py-10">
      <div className="bg-[#232836]/90 shadow-2xl rounded-2xl p-10 max-w-md w-full flex flex-col items-center animate-fade-in">
        {/* Sign Out button */}
        <button
          onClick={onSignOut}
          className="absolute top-5 right-5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-pink-500 hover:to-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Sign Out
        </button>
        
        <div className="flex flex-col items-center gap-4 mb-6 mt-6">
          <div className="relative">
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-5xl font-bold">JD</span>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">Learner</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-2xl text-white mb-1">{user.name}</div>
            <div className="text-gray-400 text-sm mb-1">{user.email}</div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 w-full mb-6"></div>
        
        <div className="flex flex-col items-center w-full">
          <h2 className="text-lg font-semibold mb-5 text-white">Course Progress</h2>
          {loading && <div className="text-indigo-300">Loading progress...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {progress && (
            <div className="flex flex-col items-center w-full">
              {/* Progress Ring */}
              <div className="relative mb-4">
                <svg className="w-28 h-28" viewBox="0 0 40 40">
                  <circle
                    cx="20" cy="20" r="18"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="4"
                  />
                  <circle
                    cx="20" cy="20" r="18"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 18}
                    strokeDashoffset={2 * Math.PI * 18 * (1 - (Number(progress.percent) || 0) / 100)}
                    strokeLinecap="round"
                    style={{
                      transition: 'stroke-dashoffset 0.5s',
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%'
                    }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <text
                    x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="1.1rem" fontWeight="bold"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {(Number(progress.percent) || 0)}%
                  </text>
                </svg>
              </div>
              <div className="text-white font-semibold mb-1">{progress.percent}% complete</div>
              <div className="text-gray-400 text-xs">Keep learning to reach 100%!</div>
            </div>
          )}
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
