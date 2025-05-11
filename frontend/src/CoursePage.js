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
    <div className="my-10 bg-white rounded-xl shadow p-6 max-w-xl mx-auto border border-cyan-100">
      <h2 className="text-lg font-bold mb-4 text-teal-600">Quick Quiz</h2>
      {/* Progress Bar */}
      <div className="w-full h-3 bg-cyan-50 rounded-full mb-6 overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <div className="font-semibold mb-2 text-gray-700">{idx + 1}. {q.q}</div>
          <div className="space-y-2">
            {q.options.map((opt, oidx) => (
              <label key={oidx} className={`block px-4 py-2 rounded cursor-pointer border transition-colors text-sm
                ${userAnswers[idx] === oidx ? "bg-cyan-100 border-cyan-400 text-teal-700" : "bg-white border-gray-200 hover:bg-cyan-50"}
                ${submitted ? (oidx === q.answer ? "border-teal-500" : userAnswers[idx] === oidx ? "border-red-400 text-red-500" : "") : ""}
              `}>
                <input
                  type="radio"
                  className="mr-2 accent-teal-500"
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
            <div className={`mt-1 text-xs font-medium ${userAnswers[idx] === q.answer ? "text-teal-600" : "text-red-500"}`}>
              {userAnswers[idx] === q.answer ? "Correct!" : `Incorrect. Correct: ${q.options[q.answer]}`}
            </div>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          className="mt-2 px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors shadow disabled:bg-gray-300"
          disabled={userAnswers.includes(null)}
          onClick={() => setSubmitted(true)}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-2 text-teal-700 font-semibold">You got {correctCount} out of {questions.length} correct!</div>
      )}
    </div>
  );
}

export default function CoursePage() {
  const [modal, setModal] = useState({ open: false, content: "", loading: false, error: null });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  // Floating explain button for highlighted text
  const [highlight, setHighlight] = useState({ text: '', x: 0, y: 0, show: false });
  const contentRef = useRef(null);

  // Show floating explain button on selection
  const handleSelection = (e) => {
    const selection = window.getSelection();
    const text = selection.toString();
    if (text.length > 0 && contentRef.current && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      // Only show if selection is inside course content
      const contentRect = contentRef.current.getBoundingClientRect();
      if (
        rect.bottom > contentRect.top &&
        rect.top < contentRect.bottom &&
        rect.right > contentRect.left &&
        rect.left < contentRect.right
      ) {
        setHighlight({
          text,
          x: rect.right + window.scrollX,
          y: rect.bottom + window.scrollY,
          show: true
        });
        return;
      }
    }
    setHighlight({ text: '', x: 0, y: 0, show: false });
  };

  // Hide floating button on click outside or selection change
  useEffect(() => {
    const handleClick = (e) => {
      setHighlight(h => ({ ...h, show: false }));
    };
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || !selection.toString()) {
        setHighlight(h => ({ ...h, show: false }));
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  // Small modal for floating explain
  const [smallModal, setSmallModal] = useState({ open: false, content: '', loading: false, error: null, x: 0, y: 0 });

  // Explain highlighted text (floating button)
  const handleExplainHighlight = async () => {
    if (!highlight.text) return;
    setSmallModal({ open: true, content: '', loading: true, error: null, x: highlight.x, y: highlight.y });
    try {
      const res = await fetch("http://localhost:5000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: highlight.text })
      });
      const data = await res.json();
      setSmallModal({ open: true, content: data.explanation || "[No reply]", loading: false, error: null, x: highlight.x, y: highlight.y });
    } catch (e) {
      setSmallModal({ open: true, content: '', loading: false, error: 'Failed to fetch explanation.', x: highlight.x, y: highlight.y });
    }
    setHighlight({ text: '', x: 0, y: 0, show: false });
  };

  // Hide small modal on click outside
  useEffect(() => {
    if (!smallModal.open) return;
    const handleClick = (e) => {
      setSmallModal(m => ({ ...m, open: false }));
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [smallModal.open]);

  // Big explain button at the bottom (unchanged)
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
    <div className="relative flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-white py-8 overflow-hidden">
      {/* Decorative SVG lagoon background figures */}
      <svg className="absolute left-[-120px] top-[-80px] w-[300px] h-[300px] opacity-40 blur-2xl z-0" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" fill="#14b8a6" />
        <circle cx="110" cy="110" r="60" fill="#06b6d4" opacity="0.3" />
      </svg>
      <svg className="absolute right-[-100px] bottom-[-80px] w-[260px] h-[260px] opacity-30 blur-2xl z-0" viewBox="0 0 260 260" fill="none">
        <ellipse cx="130" cy="130" rx="120" ry="90" fill="#22d3ee" />
        <ellipse cx="180" cy="100" rx="40" ry="20" fill="#2dd4bf" opacity="0.4" />
      </svg>
      <svg className="absolute left-[30%] top-[80%] w-[120px] h-[120px] opacity-20 blur-2xl z-0" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="60" fill="#67e8f9" />
      </svg>
      {/* Course Content Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-teal-700 text-center drop-shadow">Course: Introduction to AI</h1>
        <div
          className="space-y-8 bg-gray-50 rounded-lg p-4 md:p-8 shadow"
          ref={contentRef}
          onMouseUp={handleSelection}
        >
        <section>
          <h2 className="font-semibold text-lg mb-2 text-teal-500">What is AI?</h2>
          <p className="mb-2">
            Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn. AI is used in a wide range of applications, from search engines to self-driving cars.
          </p>
          <p>
            Modern AI includes machine learning, deep learning, and natural language processing, all of which help computers perform tasks that typically require human intelligence.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-teal-500">History of AI</h2>
          <p>
            The concept of artificial intelligence dates back to ancient myths of intelligent automatons. The formal field began in the 1950s with pioneers like Alan Turing and John McCarthy. Over the decades, AI has experienced cycles of optimism, funding, and setbacks ("AI winters"), but recent advances in computing power and data have led to rapid progress.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-teal-500">Real-world Applications</h2>
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
          <h2 className="font-semibold text-lg mb-2 text-teal-500">Conclusion</h2>
          <p>
            AI is transforming industries and our daily lives. As technology evolves, understanding AI will be increasingly important for everyone.
          </p>
        </section>
      </div>
      <button
        className="mt-6 px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors shadow"
        onClick={handleExplain}
      >
        Explain Selected Text
      </button>

      {/* Floating Explain Button for Highlighted Text */}
      {highlight.show && typeof window !== 'undefined' && ReactDOM.createPortal(
        <button
          style={{ position: 'absolute', left: highlight.x + 8, top: highlight.y + 8, zIndex: 9999 }}
          className="bg-teal-600 text-white px-3 py-1 rounded shadow hover:bg-teal-700 transition-colors text-xs"
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
          className="bg-white rounded-lg shadow-lg p-4 border border-teal-200"
          onMouseDown={e => e.stopPropagation()}
        >
          <button className="absolute top-2 right-3 text-teal-400 hover:text-teal-600 text-xl font-bold" onClick={() => setSmallModal(m => ({ ...m, open: false }))}>&times;</button>
          {smallModal.loading && <div>Loading...</div>}
          {smallModal.error && <div className="text-red-500">{smallModal.error}</div>}
          {!smallModal.loading && !smallModal.error && <div>{smallModal.content}</div>}
        </div>,
        document.body
      )}

      {/* Modal for AI Explanation */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-4 text-teal-400 hover:text-teal-600" onClick={() => setModal({ ...modal, open: false })}>&times;</button>
            {modal.loading && <div>Loading...</div>}
            {modal.error && <div className="text-teal-400">{modal.error}</div>}
            {!modal.loading && !modal.error && <div>{modal.content}</div>}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <QuizSection />

      {/* Lagoon Floating Chatbot Icon & Window */}
      <LagoonChatbotIcon onClick={() => setShowChatbot(true)} />
      {showChatbot && ReactDOM.createPortal(
        <div
          className="fixed bottom-24 right-10 z-50 w-96 max-w-[98vw] bg-white rounded-2xl shadow-2xl border-2 border-cyan-100 lagoon-fade"
          style={{ boxShadow: '0 8px 40px 0 rgba(20,184,166,0.16)' }}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-t-2xl">
            <span className="font-semibold text-white text-lg">Lagoon AI Chatbot</span>
            <button onClick={() => setShowChatbot(false)} className="text-white text-2xl hover:text-cyan-100 font-bold">&times;</button>
          </div>
          <div className="p-4 h-72 overflow-y-auto flex flex-col gap-2 bg-white rounded-b-2xl">
            {chatMessages.length === 0 && <div className="text-teal-400">No messages yet.</div>}
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
                <span className={"inline-block px-3 py-1 rounded-full bg-cyan-50 text-teal-700 text-sm shadow-sm " + (msg.sender === "user" ? "bg-cyan-100" : "bg-cyan-50") }>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form className="flex gap-2 px-4 pb-4" onSubmit={handleChatSubmit}>
            <input
              className="flex-1 border border-cyan-100 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200"
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              autoFocus
            />
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>,
        document.body
      )}

    </div>
  </div>
  );
}
