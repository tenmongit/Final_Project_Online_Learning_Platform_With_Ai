print('DEBUG: Starting app.py')
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import json
import os
from flask_sqlalchemy import SQLAlchemy
from backend.models import db, User, QuizResult
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db.init_app(app)

print('DEBUG: End of app.py (minimal test)')

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing username, email, or password"}), 400
    username = data["username"].strip()
    email = data["email"].strip()
    password = data["password"]

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    password_hash = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()
    logger.info(f"New user registered: {username} ({email})")
    return jsonify({"message": "User registered successfully!"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not ("username" in data or "email" in data) or "password" not in data:
        return jsonify({"error": "Missing username/email or password"}), 400
    identifier = data.get("username") or data.get("email")
    password = data["password"]
    user = User.query.filter((User.username == identifier) | (User.email == identifier)).first()
    if user and check_password_hash(user.password_hash, password):
        logger.info(f"User logged in: {user.username} ({user.email})")
        return jsonify({"message": "Login successful!", "username": user.username, "email": user.email}), 200
    else:
        logger.warning(f"Failed login attempt for: {identifier}")
        return jsonify({"error": "Invalid username/email or password"}), 401

@app.route("/api/explain", methods=["POST"])
def explain():
    data = request.get_json()
    if not data or "text" not in data:
        logger.warning("Explain endpoint: Missing 'text' in request body")
        return jsonify({"error": "Missing 'text' in request body"}), 400
    highlighted_text = data["text"]
    level = data.get("level", "student")  # Optional: allow future extensibility
    logger.info(f"Explain endpoint called with text: {highlighted_text} | level: {level}")
    prompt = (
        f"Explain the following concept in simple terms for a {level}. "
        f"Break down jargon, use analogies or real-world examples, and make it clear and concise.\n\n"
        f"Concept: {highlighted_text}\n\n"
        f"Explanation:"
    )
    try:
        from backend.services.ai_model import explain as ai_explain
        explanation = ai_explain(prompt)
    except Exception as e:
        logger.error(f"AI explanation error: {e}")
        explanation = f"[AI error: {e}]"
    return jsonify({"explanation": explanation})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        logger.warning("Chat endpoint: Missing 'message' in request body")
        return jsonify({"error": "Missing 'message' in request body"}), 400
    message = data["message"]
    logger.info(f"Chat endpoint called with message: {message}")
    try:
        from backend.services.ai_service import generate_ai_response
        reply = generate_ai_response(message)
        logger.info(f"AI reply: {reply}")
    except Exception as e:
        logger.error(f"AI chat error: {e}")
        reply = f"[AI error: {e}]"
    if not reply:
        reply = "[No response from AI]"
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
    with app.app_context():
        db.create_all()
    logger.info("Starting Flask application...")
    print("\nRegistered endpoints:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint} (methods: {','.join(rule.methods)})")
    app.run(debug=True)
