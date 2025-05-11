import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from models import db, User
from app import app

with app.app_context():
    users = User.query.all()
    for user in users:
        print(f"Username: {user.username}, Email: {user.email}, Password Hash: {user.password_hash}")
