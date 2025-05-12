print('DEBUG: Starting app.py')
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
import logging
import json
import os
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
load_dotenv()

# Database helper functions
def get_db_connection():
    conn = sqlite3.connect('app.db')
    conn.row_factory = sqlite3.Row
    return conn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev_secret_key')
CORS(app)

print('DEBUG: End of app.py (minimal test)')

# --- Web (HTML) routes enforcing registration/login flow ---
@app.route("/register", methods=["GET", "POST"])
def register_web():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        if not username or not email or not password:
            return render_template('register.html', error="Все поля обязательны!")
        if User.query.filter_by(username=username).first():
            return render_template('register.html', error="Пользователь с таким именем уже существует!")
        if User.query.filter_by(email=email).first():
            return render_template('register.html', error="Пользователь с таким email уже существует!")
        password_hash = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login_web'))
    return render_template('register.html', error=None)

@app.route("/login", methods=["GET", "POST"])
def login_web():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    if request.method == 'POST':
        identifier = request.form.get('username') or request.form.get('email')
        password = request.form.get('password', '')
        user = User.query.filter((User.username == identifier) | (User.email == identifier)).first()
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['username'] = user.username
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Неверные данные для входа")
    return render_template('login.html', error=None)

@app.route("/dashboard")
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login_web'))
    return render_template('dashboard.html', username=session.get('username'))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('login_web'))

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing username, email, or password"}), 400
    
    username = data["username"].strip()
    email = data["email"].strip()
    password = data["password"]

    # Check if username or email already exists
    conn = get_db_connection()
    user_by_username = conn.execute('SELECT * FROM user WHERE username = ?', (username,)).fetchone()
    user_by_email = conn.execute('SELECT * FROM user WHERE email = ?', (email,)).fetchone()
    
    if user_by_username:
        conn.close()
        return jsonify({"error": "Username already exists"}), 409
    
    if user_by_email:
        conn.close()
        return jsonify({"error": "Email already exists"}), 409

    # Create new user
    password_hash = generate_password_hash(password)
    conn.execute(
        'INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)',
        (username, email, password_hash)
    )
    conn.commit()
    
    # Get the newly created user to return
    user = conn.execute('SELECT * FROM user WHERE email = ?', (email,)).fetchone()
    conn.close()
    
    logger.info(f"New user registered: {username} ({email})")
    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": user['id'],
            "username": user['username'],
            "email": user['email']
        }
    }), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Missing email or password"}), 400
    
    email = data["email"].strip()
    password = data["password"]
    
    # Find user by email
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM user WHERE email = ?', (email,)).fetchone()
    
    if user and check_password_hash(user['password_hash'], password):
        conn.close()
        # Return user data (excluding sensitive information)
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user['id'],
                "username": user['username'],
                "email": user['email']
            }
        }), 200
    else:
        conn.close()
        logger.warning(f"Failed login attempt for: {email}")
        return jsonify({"error": "Invalid email or password"}), 401

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
        from services.ai_model import explain as ai_explain
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
        from services.ai_service import generate_ai_response
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
    # Database is already created by init_db.py
    logger.info("Starting Flask application...")
    print("\nRegistered endpoints:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint} (methods: {','.join(rule.methods)})")
    app.run(debug=True)
