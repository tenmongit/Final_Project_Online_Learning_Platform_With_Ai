from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from services import ai_model

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
    response = ai_model.explain(highlighted_text)
    return jsonify({"response": response})

@app.route("/api/progress", methods=["GET"])
def progress():
    logger.info("Progress endpoint called")
    return jsonify({"completedLessons": 3, "totalLessons": 10})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "message" not in data:
        logger.warning("Chat endpoint: Missing 'message' in request body")
        return jsonify({"error": "Missing 'message' in request body"}), 400
    message = data["message"]
    logger.info("Chat endpoint called")
    response = ai_model.chat(message)
    return jsonify({"response": response})

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
    app.run(port=5000)
