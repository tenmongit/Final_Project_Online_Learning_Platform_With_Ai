import React, { useState } from "react";

export default function LagoonChatbotIcon({ onClick }) {
  return (
    <button
      aria-label="Open Chatbot"
      onClick={onClick}
      className="fixed bottom-7 right-7 z-50 w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform focus:outline-none"
      style={{ boxShadow: '0 4px 24px 0 rgba(99,102,241,0.3)' }}
    >
      {/* New chat icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="white"/>
        <path d="M8 12H16M12 16V8" stroke="#14CCBA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
