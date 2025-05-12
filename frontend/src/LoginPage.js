import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [signUpError, setSignUpError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example credentials
    const demoEmail = "demo@email.com";
    const demoPassword = "password123";
    if (!email || !password) {
      setError("Please enter both email and password.");
    } else if (email === demoEmail && password === demoPassword) {
      setError("");
      if (onLogin) onLogin();
    } else {
      setError("Invalid email or password. Try demo@email.com / password123");
    }
  };
  
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate password reset email
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotSuccess(false);
      setForgotEmail("");
    }, 3000);
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signUpData;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setSignUpError("All fields are required.");
      return;
    }
    
    if (password !== confirmPassword) {
      setSignUpError("Passwords do not match.");
      return;
    }
    
    // Simulate successful signup
    setSignUpError("");
    setEmail(email);
    setPassword(password);
    setShowSignUp(false);
    setSignUpData({ name: "", email: "", password: "", confirmPassword: "" });
  };
  
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
      <div className="bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl p-10 max-w-md w-full flex flex-col items-center animate-fade-in">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6 tracking-tight drop-shadow-lg">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-8 text-center">Login to your account to access the AI Learning Platform</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 01-8 0 4 4 0 018 0z" /></svg>
              </span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" /></svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="pl-10 pr-12 py-3 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-500 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.4-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center -mt-4">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-between w-full mt-6 text-sm text-gray-500 dark:text-gray-400">
          <button 
            className="hover:underline focus:outline-none" 
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </button>
          <button 
            className="hover:underline focus:outline-none"
            onClick={() => setShowSignUp(true)}
          >
            Sign up
          </button>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#232836] rounded-lg shadow-lg p-8 max-w-md w-full relative border border-gray-700/30">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white" 
              onClick={() => {
                setShowForgotPassword(false);
                setForgotSuccess(false);
                setForgotEmail("");
              }}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Reset Password</h2>
            
            {forgotSuccess ? (
              <div className="text-green-400 mb-4">
                Password reset link has been sent to your email address.
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="forgot-email">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#1a1f2e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#232836] rounded-lg shadow-lg p-8 max-w-md w-full relative border border-gray-700/30">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white" 
              onClick={() => {
                setShowSignUp(false);
                setSignUpError("");
                setSignUpData({ name: "", email: "", password: "", confirmPassword: "" });
              }}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
            
            {signUpError && <div className="text-red-400 mb-4">{signUpError}</div>}
            
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#1a1f2e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="signup-email">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#1a1f2e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter your email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#1a1f2e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Create a password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-300" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-[#1a1f2e] text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Confirm your password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
      
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
