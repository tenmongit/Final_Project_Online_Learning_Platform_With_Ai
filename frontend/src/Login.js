import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="username" onChange={handleChange} placeholder="Username" required className="border px-3 py-2 rounded" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required className="border px-3 py-2 rounded" />
        <button type="submit" className="bg-cyan-500 text-white py-2 rounded font-semibold hover:bg-cyan-600">Login</button>
      </form>
    </div>
  );
}

export default Login;
