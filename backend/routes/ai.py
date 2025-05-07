from flask import Blueprint, jsonify, request
from typing import Dict, Any
import sys
import os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'services'))
from ai_service import generate_ai_response

ai_bp = Blueprint('ai', __name__)

def ai_reply(data: Dict[str, Any]) -> Dict[str, str]:
    """
    Process AI request
    Args:
        data: Dictionary containing the user message
    Returns:
        Dictionary with AI response
    """
    message = data.get('message', '')
    response = generate_ai_response(message)
    return {"reply": response}

@ai_bp.route('/ai', methods=['POST'])
def ai_endpoint():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "Missing message parameter"}), 400
            
        response = ai_reply(data)
        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
