import os
import sqlite3
import sys
from werkzeug.security import generate_password_hash

try:
    print("Starting database initialization...")
    
    # Set the absolute path to the database file
    db_path = os.path.abspath('app.db')
    print(f"Database path: {db_path}")
    
    # Delete existing database file if it exists
    if os.path.exists(db_path):
        os.remove(db_path)
        print(f"Removed existing database: {db_path}")
    
    # Create a new SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("Creating tables...")
    
    # Create User table
    cursor.execute('''
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
    )
    ''')
    
    # Create QuizResult table
    cursor.execute('''
    CREATE TABLE quiz_result (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        quiz_id TEXT NOT NULL,
        score INTEGER NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        answers TEXT,
        FOREIGN KEY (user_id) REFERENCES user (id)
    )
    ''')
    
    print("Tables created successfully!")
    
    # Create a demo user for testing
    print("Creating demo user...")
    demo_password_hash = generate_password_hash("password123")
    cursor.execute(
        "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)",
        ("demo", "demo@email.com", demo_password_hash)
    )
    
    # Commit changes and close connection
    conn.commit()
    
    # Verify the user was created
    cursor.execute("SELECT * FROM user WHERE email = ?", ("demo@email.com",))
    user = cursor.fetchone()
    if user:
        print(f"Demo user verified in database with ID: {user[0]}")
    else:
        print("WARNING: Demo user not found after creation!")
    
    conn.close()
    
    # Verify the database file exists and has content
    if os.path.exists(db_path) and os.path.getsize(db_path) > 0:
        print(f"Database created successfully at {db_path}")
        print(f"Database file size: {os.path.getsize(db_path)} bytes")
    else:
        print("ERROR: Database file is empty or doesn't exist!")
        sys.exit(1)
    
    print("\nDatabase initialization complete!")
    print("Demo user created: demo@email.com / password123")

except Exception as e:
    print(f"ERROR during database initialization: {e}")
    sys.exit(1)
