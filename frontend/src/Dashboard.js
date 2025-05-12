import React, { useEffect, useState } from "react";
import { getProgress } from "./api";

export default function Dashboard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProgress()
      .then(setProgress)
      .catch(() => setError("Failed to fetch progress."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e] py-10">
      <div className="bg-[#232836]/90 shadow-2xl rounded-2xl p-10 max-w-xl w-full flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mb-8 text-center">Your learning progress at a glance</p>
        <div className="w-full">
          {loading && <div className="text-center text-indigo-300">Loading progress...</div>}
          {error && <div className="text-red-400 text-center">{error}</div>}
          {progress && (
            <div className="bg-[#2a2f3d] rounded-xl p-6 shadow-md border border-gray-700/30">
              <div className="text-lg font-semibold text-white mb-4">Course Progress</div>
              <div className="relative w-full h-8 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-700"
                  style={{ width: `${progress.percent}%` }}
                ></div>
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">{progress.percent}%</span>
              </div>
              <div className="mt-4 text-gray-300 font-semibold text-center">{progress.percent}% complete</div>
            </div>
          )}
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
    </div>
  );
}
