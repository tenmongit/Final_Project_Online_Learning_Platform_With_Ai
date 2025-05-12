# AI-Powered Online Learning Platform

![Tigers Education Platform](https://img.shields.io/badge/Tigers_Education-Learning_Platform-orange)

A collaborative online learning platform with integrated AI assistance for personalized education. This project combines modern frontend technologies with a Flask backend and AI integration to create an engaging educational experience.

## ✨ Features

- **User Authentication**: Secure registration and login system
- **Interactive Course Catalog**: Browse available courses
- **AI-Assisted Learning**: Get explanations and assistance from AI
- **Profile Management**: Track your learning progress
- **Quiz System**: Test your knowledge with interactive quizzes

## 🏗️ Project Structure

This project is organized into two main components:

### Backend (Flask)

```
backend/
├── app.py              # Main Flask application
├── init_db.py          # Database initialization script
├── models.py           # Database models
├── routes/             # API route handlers
└── services/           # AI integration services
```

### Frontend (React)

```
frontend/
├── public/            # Static assets
├── src/               # React components and logic
│   ├── App.js         # Main application component
│   ├── LoginPage.js   # Authentication UI
│   ├── UserProfile.js # User profile management
│   ├── CoursePage.js  # Course content display
│   └── ...            # Other components
└── package.json       # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/tenmongit/Final_Project_Online_Learning_Platform_With_Ai.git
cd Final_Project_Online_Learning_Platform_With_Ai
```

2. **Set up the backend**

```bash
# Install Python dependencies
pip install -r requirements.txt

# Initialize the database
cd backend
python init_db.py
```

3. **Set up the frontend**

```bash
cd frontend
npm install
```

4. **Environment Variables**

Create a `.env` file in the backend directory with the following variables:

```
SECRET_KEY=your_secret_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

### Running the Application

1. **Start the backend server**

```bash
cd backend
python app.py
```

2. **Start the frontend development server**

```bash
cd frontend
npm start
```

3. **Access the application**

Open your browser and navigate to `http://localhost:3000`

## 👥 Team Collaboration

This project is a collaborative effort with three main focus areas:

1. **AI Integration** - Integrating AI models for personalized learning assistance
2. **Frontend Development** - Creating an intuitive and responsive user interface
3. **Backend Development** - Building a robust API and database structure

## 🧠 AI Integration

The AI functionality is implemented as a modular component that can be used independently of the main application. It provides:

- **Concept Explanations**: Break down complex topics into simpler terms
- **Interactive Chat**: Ask questions and get AI-powered responses
- **Learning Recommendations**: Personalized content suggestions

## 📝 Database Structure

The application uses SQLite for data storage with the following main tables:

- **Users**: Authentication and profile information
- **Quiz Results**: Track user performance on quizzes

## 🔒 Authentication

The platform implements a secure authentication system with:

- Password hashing using Werkzeug
- Session management
- Registration validation

## 🌐 API Endpoints

- `/api/register` - User registration
- `/api/login` - User authentication
- `/api/explain` - AI explanation service
- `/api/chat` - AI chat functionality
- `/api/quiz/submit` - Submit quiz answers
- `/api/course/intro-to-ai` - Get course content

## 📱 Demo Account

For testing purposes, you can use the following demo account:

- **Email**: demo@email.com
- **Password**: password123

## 🔧 Troubleshooting

If you encounter any issues:

1. Ensure all dependencies are installed
2. Check that the database is properly initialized
3. Verify that the backend server is running
4. Make sure the frontend is connecting to the correct backend URL

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---


