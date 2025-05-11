import React, { useState } from "react";
import { getExplanation } from "./api";

export default function CoursePage() {
  const [modal, setModal] = useState({ open: false, content: "", loading: false, error: null });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // AI explanation on text selection
  const handleExplain = async () => {
    const selection = window.getSelection().toString();
    if (!selection) {
      setModal({ open: true, content: "", loading: false, error: "Please select some text." });
      return;
    }
    setModal({ open: true, content: "", loading: true, error: null });
    try {
      const res = await getExplanation(selection);
      setModal({ open: true, content: res.response, loading: false, error: null });
    } catch (e) {
      setModal({ open: true, content: "", loading: false, error: "Failed to fetch explanation." });
    }
  };

  // Chatbox placeholder submit
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: "user", text: chatInput }]);
    setChatInput("");
    // Placeholder: In real app, send to /api/chat
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">Course: Introduction to AI</h1>
      <div
        className="space-y-8 bg-gray-50 rounded-lg p-4 md:p-8 shadow"
        onMouseUp={handleExplain}
      >
        <section>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">What is AI?</h2>
          <p className="mb-2">
            Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn. AI is used in a wide range of applications, from search engines to self-driving cars.
          </p>
          <p>
            Modern AI includes machine learning, deep learning, and natural language processing, all of which help computers perform tasks that typically require human intelligence.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">History of AI</h2>
          <p>
            The concept of artificial intelligence dates back to ancient myths of intelligent automatons. The formal field began in the 1950s with pioneers like Alan Turing and John McCarthy. Over the decades, AI has experienced cycles of optimism, funding, and setbacks ("AI winters"), but recent advances in computing power and data have led to rapid progress.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">Real-world Applications</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Virtual assistants (e.g., Siri, Alexa)</li>
            <li>Recommendation systems (e.g., Netflix, Amazon)</li>
            <li>Autonomous vehicles</li>
            <li>Medical diagnosis</li>
            <li>Fraud detection</li>
            <li>Language translation</li>
          </ul>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">Conclusion</h2>
          <p>
            AI is transforming industries and our daily lives. As technology evolves, understanding AI will be increasingly important for everyone.
          </p>
        </section>
      </div>
      <button
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow"
        onClick={handleExplain}
      >
        Explain Selected Text
      </button>

      {/* Modal for AI Explanation */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-4 text-gray-400 hover:text-gray-600" onClick={() => setModal({ ...modal, open: false })}>7</button>
            {modal.loading && <div>Loading...</div>}
            {modal.error && <div className="text-red-500">{modal.error}</div>}
            {!modal.loading && !modal.error && <div>{modal.content}</div>}
          </div>
        </div>
      )}

      {/* Chatbot Placeholder */}
      <div className="mt-10">
        <h3 className="font-semibold text-blue-700 mb-2">AI Chatbot (coming soon)</h3>
        <div className="bg-white rounded shadow p-4">
          <div className="h-32 overflow-y-auto mb-2 flex flex-col gap-2">
            {chatMessages.length === 0 && <div className="text-gray-400">No messages yet.</div>}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-800 text-sm">
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form className="flex gap-2" onSubmit={handleChatSubmit}>
            <input
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              disabled
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              type="submit"
              disabled
            >
              Send
            </button>
          </form>
          <div className="text-xs text-gray-400 mt-1">(Chatbot integration coming soon)</div>
        </div>
      </div>
    </div>
  );
}
