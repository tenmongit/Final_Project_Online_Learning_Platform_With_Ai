from flask import Blueprint, jsonify

courses_bp = Blueprint('courses', __name__)

@courses_bp.route('/courses', methods=['GET'])
def get_courses():
    """Placeholder for future courses endpoint"""
    return jsonify({"message": "Courses API coming soon"})
