import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { getExplanation } from "./api";
import LagoonChatbotIcon from "./LagoonChatbotIcon";

function QuizSection() {
  // Quiz questions and answers
  const questions = [
    {
      q: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Interface", "Advanced Internet"],
      answer: 0
    },
    {
      q: "Which of these is a typical AI application?",
      options: ["Weather forecasting", "Image recognition", "Text editing"],
      answer: 1
    },
    {
      q: "Which language is popular for AI development?",
      options: ["Python", "HTML", "CSS"],
      answer: 0
    }
  ];
  const [userAnswers, setUserAnswers] = React.useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = React.useState(false);

  const correctCount = userAnswers.filter((a, i) => a === questions[i].answer).length;
  const progress = (userAnswers.filter(a => a !== null).length / questions.length) * 100;

  return (
    <div className="my-10 bg-[#2a2f3d] rounded-xl shadow-lg p-6 max-w-xl mx-auto border border-gray-700/30">
      <h2 className="text-lg font-bold mb-4 text-white">Quick Quiz</h2>
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <div className="font-semibold mb-2 text-white">{idx + 1}. {q.q}</div>
          <div className="space-y-2">
            {q.options.map((opt, oidx) => (
              <label key={oidx} className={`block px-4 py-2 rounded cursor-pointer border transition-colors text-sm
                ${userAnswers[idx] === oidx ? "bg-indigo-900/50 border-indigo-500 text-white" : "bg-[#232836] border-gray-700 hover:bg-indigo-900/30 text-white"}
                ${submitted ? (oidx === q.answer ? "border-green-500" : userAnswers[idx] === oidx ? "border-red-500 text-red-400" : "") : ""}
              `}>
                <input
                  type="radio"
                  className="mr-2 accent-indigo-500"
                  name={`q${idx}`}
                  value={oidx}
                  disabled={submitted}
                  checked={userAnswers[idx] === oidx}
                  onChange={() => {
                    const newAns = [...userAnswers];
                    newAns[idx] = oidx;
                    setUserAnswers(newAns);
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
          {submitted && (
            <div className={`mt-1 text-xs font-medium ${userAnswers[idx] === q.answer ? "text-green-400" : "text-red-400"}`}>
              {userAnswers[idx] === q.answer ? "Correct!" : `Incorrect. Correct: ${q.options[q.answer]}`}
            </div>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          className="mt-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold rounded hover:from-indigo-600 hover:to-pink-600 transition-colors shadow disabled:bg-gray-700 disabled:text-gray-500"
          disabled={userAnswers.includes(null)}
          onClick={() => setSubmitted(true)}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          <div className="text-white font-semibold">You got {correctCount} out of {questions.length} correct!</div>
          <button
            className="px-5 py-2 bg-gradient-to-r from-gray-700 via-indigo-500 to-pink-500 text-indigo-100 font-bold rounded hover:from-gray-800 hover:to-pink-600 transition-colors shadow"
            onClick={() => {
              setUserAnswers(Array(questions.length).fill(null));
              setSubmitted(false);
            }}
          >
            Reset Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default function CoursePage() {
  // Modal state
  const [modal, setModal] = useState({ open: false, content: "", loading: false, error: null });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  // Floating explain button for highlighted text
  const [highlight, setHighlight] = useState({ text: '', x: 0, y: 0, show: false });
  const [smallModal, setSmallModal] = useState({ open: false, content: '', loading: false, error: null, x: 0, y: 0 });
  const contentRef = useRef(null);

  // Show floating explain button on selection
  const handleSelection = (e) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setHighlight({
        text: selection.toString(),
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        show: true
      });
    } else {
      setHighlight(h => ({ ...h, show: false }));
    }
  };

  // Explain highlighted text (floating button)
  const handleExplainHighlight = async () => {
    setSmallModal(m => ({ ...m, open: true, loading: true, error: null, x: highlight.x, y: highlight.y }));
    try {
      const res = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: highlight.text })
      });
      const data = await res.json();
      setSmallModal(m => ({ ...m, loading: false, content: data.explanation || "[No reply]" }));
    } catch (e) {
      setSmallModal(m => ({ ...m, loading: false, error: "Failed to fetch explanation." }));
    }
  };

  // Big explain button at the bottom 
  const handleExplain = async () => {
    const selection = window.getSelection().toString();
    if (!selection) {
      setModal({ open: true, content: '', loading: false, error: 'Please select some text.' });
      return;
    }
    setModal({ open: true, content: '', loading: true, error: null });
    try {
      const res = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selection })
      });
      const data = await res.json();
      setModal({ open: true, content: data.explanation || "[No reply]", loading: false, error: null });
    } catch (e) {
      setModal({ open: true, content: '', loading: false, error: 'Failed to fetch explanation.' });
    }
  };

  // Chatbox placeholder submit
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(msgs => [...msgs, { sender: "user", text: userMsg }]);
    setChatInput("");
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setChatMessages(msgs => [...msgs, { sender: "ai", text: data.reply || "[No reply]" }]);
    } catch (e) {
      setChatMessages(msgs => [...msgs, { sender: "ai", text: "[Error: Could not reach AI]" }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1a1f2e] py-8 overflow-hidden">
      {/* Course Content Card */}
      <div className="w-full max-w-2xl bg-[#232836]/90 rounded-2xl shadow-2xl p-8 relative z-10 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Course: Introduction to AI</h1>
        <div
          className="space-y-8 bg-[#2a2f3d] rounded-lg p-4 md:p-8 shadow-lg border border-gray-700/30"
          ref={contentRef}
          onMouseUp={handleSelection}
        >
          <section>
            <h2 className="font-semibold text-lg mb-2 text-indigo-400">What is AI?</h2>
            <p className="mb-2 text-gray-300">
              Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn. AI is used in a wide range of applications, from search engines to self-driving cars.
            </p>
            <p className="text-gray-300">
              Modern AI includes machine learning, deep learning, and natural language processing, all of which help computers perform tasks that typically require human intelligence.
            </p>
          </section>
          
          <section>
            <h2 className="font-semibold text-lg mb-2 text-indigo-400">History of AI</h2>
            <p className="text-gray-300">
              The concept of artificial intelligence dates back to ancient myths of intelligent automatons. The formal field began in the 1950s with pioneers like Alan Turing and John McCarthy. Over the decades, AI has experienced cycles of optimism, funding, and setbacks ("AI winters"), but recent advances in computing power and data have led to rapid progress.
            </p>
          </section>
          
          <section>
            <h2 className="font-semibold text-lg mb-2 text-indigo-400">Real-world Applications</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-300">
              <li>Virtual assistants (e.g., Siri, Alexa)</li>
              <li>Recommendation systems (e.g., Netflix, Amazon)</li>
              <li>Autonomous vehicles</li>
              <li>Medical diagnosis</li>
              <li>Fraud detection</li>
              <li>Language translation</li>
            </ul>
          </section>
          
          <section>
            <h2 className="font-semibold text-lg mb-2 text-indigo-400">Conclusion</h2>
            <p className="text-gray-300">
              AI is transforming industries and our daily lives. As technology evolves, understanding AI will be increasingly important for everyone.
            </p>
          </section>
        </div>
        
        <button
          className="mt-6 px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg"
          onClick={handleExplain}
        >
          Explain Selected Text
        </button>
      </div>

      {/* Quiz Section */}
      <QuizSection />

      {/* Floating Explain Button for Highlighted Text */}
      {highlight.show && typeof window !== 'undefined' && ReactDOM.createPortal(
        <button
          style={{ position: 'absolute', left: highlight.x + 8, top: highlight.y + 8, zIndex: 9999 }}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-3 py-1 rounded shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-colors text-xs"
          onClick={e => { e.stopPropagation(); handleExplainHighlight(); }}
        >
          Explain
        </button>,
        document.body
      )}

      {/* Small Modal for Floating Explain Button */}
      {smallModal.open && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{ position: 'absolute', left: smallModal.x + 8, top: smallModal.y + 24, zIndex: 10000, minWidth: 260, maxWidth: 350 }}
          className="bg-[#232836] rounded-lg shadow-lg p-4 border border-gray-700/30"
          onMouseDown={e => e.stopPropagation()}
        >
          <button className="absolute top-2 right-3 text-indigo-400 hover:text-pink-400 text-xl font-bold" onClick={() => setSmallModal(m => ({ ...m, open: false }))}>&times;</button>
          {smallModal.loading && <div className="text-gray-300">Loading...</div>}
          {smallModal.error && <div className="text-red-400">{smallModal.error}</div>}
          {!smallModal.loading && !smallModal.error && <div className="text-gray-300">{smallModal.content}</div>}
        </div>,
        document.body
      )}

      {/* Modal for AI Explanation */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#232836] rounded-lg shadow-lg p-6 max-w-md w-full relative border border-gray-700/30">
            <button className="absolute top-2 right-4 text-indigo-400 hover:text-pink-400" onClick={() => setModal({ ...modal, open: false })}>&times;</button>
            {modal.loading && <div className="text-gray-300">Loading...</div>}
            {modal.error && <div className="text-indigo-400">{modal.error}</div>}
            {!modal.loading && !modal.error && <div className="text-gray-300">{modal.content}</div>}
          </div>
        </div>
      )}

      {/* Lagoon Floating Chatbot Icon & Window */}
      <LagoonChatbotIcon onClick={() => setShowChatbot(true)} />
      {showChatbot && ReactDOM.createPortal(
        <div
          className="fixed bottom-24 right-10 z-50 w-96 max-w-[98vw] bg-[#232836] rounded-2xl shadow-2xl border border-gray-700/30 animate-fade-in"
          style={{ boxShadow: '0 8px 40px 0 rgba(99,102,241,0.2)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-t-2xl">
            <span className="font-semibold text-white text-lg">AI Chatbot</span>
            <button onClick={() => setShowChatbot(false)} className="text-white text-2xl hover:text-indigo-200 font-bold">&times;</button>
          </div>
          <div className="p-4 h-72 overflow-y-auto flex flex-col gap-2 bg-[#2a2f3d] rounded-b-2xl">
            {chatMessages.length === 0 && <div className="text-indigo-300">No messages yet.</div>}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <span className={msg.sender === "user" 
                  ? "inline-block px-3 py-1 rounded-full bg-indigo-900/50 text-white text-sm shadow-sm" 
                  : "inline-block px-3 py-1 rounded-full bg-[#232836] text-gray-300 text-sm shadow-sm"}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form className="flex gap-2 px-4 pb-4" onSubmit={handleChatSubmit}>
            <input
              className="flex-1 border border-gray-700 bg-[#232836] text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              autoFocus
            />
            <button
              className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:bg-gray-700 disabled:text-gray-500"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>,
        document.body
      )}
    </div>
  );
}
