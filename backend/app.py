from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import json
import os
from dotenv import load_dotenv
load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route("/api/explain", methods=["POST"])
def explain():
    data = request.get_json()
    if not data or "text" not in data:
        logger.warning("Explain endpoint: Missing 'text' in request body")
        return jsonify({"error": "Missing 'text' in request body"}), 400
    highlighted_text = data["text"]
    logger.info(f"Explain endpoint called with text: {highlighted_text}")
    # Real AI explanation
    from .services.ai_model import explain as ai_explain
    explanation = ai_explain(highlighted_text)
    return jsonify({"explanation": explanation})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        logger.warning("Chat endpoint: Missing 'message' in request body")
        return jsonify({"error": "Missing 'message' in request body"}), 400
    message = data["message"]
    logger.info(f"Chat endpoint called with message: {message}")
    # DeepSeek AI chat reply
    from .services.ai_service import generate_ai_response
    reply = generate_ai_response(message)
    logger.info(f"DeepSeek reply: {reply}")
    # Always return a reply, even if empty or error
    if not reply:
        reply = "[No response from DeepSeek]"
    return jsonify({"reply": reply})

@app.route("/api/quiz/submit", methods=["POST"])
def quiz_submit():
    data = request.get_json()
    if not data or "answers" not in data:
        logger.warning("Quiz submit endpoint: Missing 'answers' in request body")
        return jsonify({"error": "Missing 'answers' in request body"}), 400
    user_answers = data["answers"]
    # Hardcoded correct answers for demonstration
    correct_answers = {
        "q1": "A",
        "q2": "B",
        "q3": "C"
    }
    results = {}
    score = 0
    for q, correct in correct_answers.items():
        user = user_answers.get(q)
        is_correct = user == correct
        results[q] = {
            "your_answer": user,
            "correct_answer": correct,
            "is_correct": is_correct
        }
        if is_correct:
            score += 1
    logger.info(f"Quiz submitted. Score: {score}/{len(correct_answers)}")
    return jsonify({
        "score": score,
        "total": len(correct_answers),
        "results": results
    })

@app.route("/api/course/intro-to-ai", methods=["GET"])
def get_intro_to_ai():
    data_path = os.path.join(os.path.dirname(__file__), "data", "intro_to_ai.json")
    try:
        with open(data_path, "r", encoding="utf-8") as f:
            course_data = json.load(f)
        return jsonify(course_data)
    except Exception as e:
        logger.error(f"Failed to read course content: {e}")
        return jsonify({"error": "Could not load course content."}), 500

@app.errorhandler(404)
def not_found_error(error):
    logger.error(f"404 error: {str(error)}")
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"500 error: {str(error)}")
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    logger.info("Starting Flask application...")
    print("\nRegistered endpoints:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint} (methods: {','.join(rule.methods)})")
    app.run(port=5000)
