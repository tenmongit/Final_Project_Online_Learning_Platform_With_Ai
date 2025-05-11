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
    avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=4a6bff&color=fff"
  };

  return (
    <div>
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border-2 border-blue-100 shadow-sm"
        />
        <div>
          <div className="font-bold text-lg">{user.name}</div>
          <div className="text-blue-600">{user.email}</div>
        </div>
      </div>
      <div>
        <h2 className="text-base font-semibold mb-2">Course Progress</h2>
        {loading && <div>Loading progress...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {progress && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="font-semibold mb-2">Progress:</div>
            <div className="bg-blue-100 rounded h-4 overflow-hidden mb-2">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
            <div className="text-blue-900 font-semibold">{progress.percent}% complete</div>
          </div>
        )}
      </div>
    </div>
  );
}
