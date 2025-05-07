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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div>
        {loading && <div>Loading progress...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {progress && (
          <div className="bg-blue-100 rounded p-4">
            <div className="text-lg">
              <strong>Course Progress:</strong>
            </div>
            <div className="mt-2 h-4 bg-blue-200 rounded overflow-hidden">
              <div
                className="bg-blue-600 h-4"
                style={{ width: `${progress.percent}%`, transition: "width 0.5s" }}
              ></div>
            </div>
            <div className="mt-2 text-blue-700 font-semibold">{progress.percent}% complete</div>
          </div>
        )}
      </div>
    </div>
  );
}
