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
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
        <img
          src={user.avatar}
          alt="avatar"
          style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid #e5eaf1" }}
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>{user.name}</div>
          <div style={{ color: "#4a6bff" }}>{user.email}</div>
        </div>
      </div>
      <div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>Course Progress</h2>
        {loading && <div>Loading progress...</div>}
        {error && <div style={{ color: "#e53e3e" }}>{error}</div>}
        {progress && (
          <div style={{ background: "#eaf0ff", borderRadius: 8, padding: "1rem" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Progress:</div>
            <div style={{ background: "#d6e4ff", borderRadius: 4, height: 16, overflow: "hidden", marginBottom: 8 }}>
              <div
                style={{
                  width: `${progress.percent}%`,
                  background: "#4a6bff",
                  height: "100%",
                  transition: "width 0.5s"
                }}
              ></div>
            </div>
            <div style={{ color: "#1d3d91", fontWeight: 600 }}>{progress.percent}% complete</div>
          </div>
        )}
      </div>
    </div>
  );
}
