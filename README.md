# 🎙️ SpeakHire

**SpeakHire** is an AI-powered mock interview application that simulates real-time job interviews through voice interaction. Built with a React frontend and Flask backend, it leverages speech-to-text and text-to-speech technologies to provide users with a realistic, responsive, and intelligent interview experience.

## ✨ Features

- 🎤 **Voice-Based Interaction**  
  Users speak their answers aloud; responses are captured and transcribed using Web Speech API.

- 🤖 **AI-Driven Questions & Evaluation**  
  Interview questions are generated and evaluated dynamically via backend logic, helping users practice with relevant and insightful prompts.

- 💬 **Real-Time Feedback**  
  Visual and auditory feedback creates an immersive and engaging mock interview environment.

- 🧠 **Modular Components**  
  Clean React architecture using components and pages (`components/`, `pages/`) for easy extensibility.

- 🔗 **Frontend-Backend Integration**  
  A Flask API receives speech inputs, processes questions from a question bank (`Questions.txt`), and handles logic for AI evaluation.

- 🌐 **Modern UI**  
  Built with React and custom CSS for a user-friendly experience.

## 🧩 Tech Stack

- **Frontend:** React, Web Speech API
- **Backend:** Python Flask
- **Other:** Text-to-speech, file-based question storage, basic state management

## 📁 Key Project Structure

Speak-Hire-main/
├── flask-server/
│ ├── server.py # Flask server handling questions and responses
│ ├── Questions.txt # List of mock interview questions
│ └── venv/ # Python virtual environment
│
├── speak-hire/
│ ├── public/ # Static files and HTML shell
│ ├── src/
│ │ ├── components/ # React components (e.g., buttons, mic control)
│ │ ├── pages/ # Page-level views (e.g., InterviewPage)
│ │ └── App.js # App entry and routing
│ ├── package.json # Frontend dependencies
│ └── README.md # Frontend-specific notes
│
└── start.bat # Batch file to initiate the app



## 📌 Use Case

SpeakHire is ideal for students, job seekers, and professionals looking to:
- Practice behavioral or technical interviews
- Improve articulation and clarity in spoken responses
- Gain confidence before real interviews
