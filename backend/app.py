from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.ai import ai_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(ai_bp, url_prefix='/api')

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(debug=True)
