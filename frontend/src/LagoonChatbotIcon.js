import React, { useState } from "react";

export default function LagoonChatbotIcon({ onClick }) {
  return (
    <button
      aria-label="Open Chatbot"
      onClick={onClick}
      className="fixed bottom-7 right-7 z-50 w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform border-4 border-white focus:outline-none"
      style={{ boxShadow: '0 4px 24px 0 rgba(20,184,166,0.18)' }}
    >
      {/* Lagoon theme: chat bubble with waves */}
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="18" fill="#fff" fillOpacity="0.8" />
        <path d="M11 20c2.5 2 7.5 2 10 0" stroke="#14b8a6" strokeWidth="2.2" strokeLinecap="round" />
        <ellipse cx="14.5" cy="15.5" rx="1.5" ry="2" fill="#14b8a6" />
        <ellipse cx="23.5" cy="15.5" rx="1.5" ry="2" fill="#14b8a6" />
        <path d="M6 33c2.5-2.5 7.5-4.5 13-4.5s10.5 2 13 4.5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </button>
  );
}
