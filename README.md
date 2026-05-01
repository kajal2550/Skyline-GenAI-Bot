# 🌌 Skyline AI - Premium Machine Learning Chatbot

**🚀 Live Demo:** [https://skyline-genai-bot.onrender.com](https://skyline-genai-bot.onrender.com)

Skyline AI is a high-end, visually stunning AI chatbot system built using **Python**, **Scikit-learn**, and **Google Gemini AI**. It features a modern "Sky-Blue" glassmorphism UI with real-time voice-to-text, file analysis, and intelligent fallback capabilities.

---

## ✨ Key Features

- 💎 **Premium UI:** Glassmorphism design with a cinematic animated background and floating orbs.
- 🧠 **Dual-Brain Logic:** 
  - **Local Brain:** Intent recognition using Scikit-learn (Naive Bayes) for fast, rule-based responses.
  - **Cloud Brain:** Integrated **Google Gemini AI** for answering any complex query as a fallback.
- 🎤 **Voice Interaction:** Real-time voice-to-text integration using the Web Speech API.
- 📂 **File Analysis:** Built-in UI for file uploads and processing.
- 🌓 **Dynamic Theme:** Responsive layout with dark/light mode compatibility.
- 📱 **Fully Functional Modals:** Interactive Search History and Settings menus.

---

## 🛠️ Tech Stack

- **Backend:** Flask (Python)
- **Machine Learning:** Scikit-learn (TF-IDF, Multinomial Naive Bayes)
- **AI Core:** Google Gemini AI (Generative AI SDK)
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Styling:** Glassmorphism, CSS Animations, FontAwesome

---

## 📂 Project Structure

```text
Chatbot/
├── app.py                # Main Flask Server
├── chatbot_ml.py         # ML Logic & Gemini Integration
├── data.json             # Intent training data
├── requirements.txt      # Project dependencies
├── static/
│   ├── style.css         # Premium Sky-Blue Styling
│   ├── script.js         # Frontend Logic & Animations
│   └── bg.png            # Premium AI Background Image
└── templates/
    └── index.html        # Main Chat Interface
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.8+
- Google Gemini API Key (Get it at [aistudio.google.com](https://aistudio.google.com/))

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd Chatbot

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration
Open `chatbot_ml.py` and paste your Gemini API key:
```python
GEMINI_API_KEY = "YOUR_API_KEY_HERE"
```

### 4. Run the App
```bash
python app.py
```
Visit `http://127.0.0.1:5000` in your browser.

---

## 📜 Academic Purpose
This project was developed to demonstrate the integration of **Natural Language Processing (NLP)** with modern web technologies. It showcases how intent classification models can be combined with Large Language Models (LLMs) to create a robust and fail-safe user assistant.

---

## 👨‍💻 Author
**[Your Name]**  
*AI & Web Development Enthusiast*

---
*Powered by Skyline AI Engine* 🏜️
