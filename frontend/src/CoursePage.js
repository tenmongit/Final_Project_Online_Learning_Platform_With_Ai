import React, { useState } from "react";
import { getExplanation } from "./api";

export default function CoursePage() {
  const [modal, setModal] = useState({ open: false, content: "", loading: false, error: null });

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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course: Introduction to AI</h1>
      <div className="space-y-4">
        <section>
          <h2 className="font-semibold">Lesson 1: What is AI?</h2>
          <p>
            Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn.
            AI is used in a wide range of applications, from search engines to self-driving cars.
          </p>
          <p>
            Modern AI includes machine learning, deep learning, and natural language processing, all of which help computers perform tasks that typically require human intelligence.
          </p>
        </section>
        <section>
          <h2 className="font-semibold">Lesson 2: Machine Learning Basics</h2>
          <p>
            Machine learning is a subset of AI that enables systems to learn from data and improve over time without being explicitly programmed.
            It is the technology behind many recent advancements in AI.
          </p>
        </section>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleExplain}
      >
        Explain Selected Text
      </button>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-4 text-gray-400 hover:text-gray-600" onClick={() => setModal({ ...modal, open: false })}>✕</button>
            {modal.loading && <div>Loading...</div>}
            {modal.error && <div className="text-red-500">{modal.error}</div>}
            {!modal.loading && !modal.error && <div>{modal.content}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
