import json
import random
import numpy as np
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

# ---------------------------------------------------------
# GEMINI API KEY - Paste your key here!
# Get it for free at: https://aistudio.google.com/
GEMINI_API_KEY = "AIzaSyDI0VwfUQxSUU1G3Pb70YZRgopR-4dt-ok"
# ---------------------------------------------------------

class ChatbotModel:
    def __init__(self, data_path='data.json'):
        self.data_path = data_path
        self.intents = self._load_data()
        self.model = self._train_model()
        
        # Initialize Gemini
        self.use_gemini = False
        if GEMINI_API_KEY and GEMINI_API_KEY != "PASTE_YOUR_GEMINI_KEY_HERE":
            try:
                genai.configure(api_key=GEMINI_API_KEY)
                self.gemini = genai.GenerativeModel('gemini-flash-latest')
                self.use_gemini = True
                print("Gemini AI integration enabled!")
            except Exception as e:
                print(f"Failed to initialize Gemini: {e}")

    def _load_data(self):
        with open(self.data_path, 'r') as f:
            return json.load(f)['intents']

    def _train_model(self):
        X = []
        y = []
        for intent in self.intents:
            for pattern in intent['patterns']:
                X.append(pattern.lower())
                y.append(intent['tag'])
        
        model = make_pipeline(TfidfVectorizer(), MultinomialNB())
        model.fit(X, y)
        return model

    def get_gemini_response(self, text):
        if not self.use_gemini:
            return "I'm not sure about that, and Gemini AI is not configured. Please add an API key!"
        
        try:
            # Create a prompt that tells Gemini to act as Skyline AI
            prompt = f"You are Skyline AI, a premium and helpful AI assistant. Answer this user query concisely: {text}"
            response = self.gemini.generate_content(prompt)
            return response.text
        except Exception as e:
            error_msg = str(e)
            print(f"Gemini Error: {error_msg}")
            if "429" in error_msg:
                return "Skyline AI is currently processing many requests (Quota Limit). Please wait a moment!"
            return "I'm having trouble connecting to my brain right now. Please try again later!"

    def get_response(self, text):
        # First, try the local Scikit-learn model
        probs = self.model.predict_proba([text.lower()])[0]
        max_prob = np.max(probs)
        tag = self.model.classes_[np.argmax(probs)]
        
        # If local model is confident (> 0.4), use it
        if max_prob > 0.4:
            for intent in self.intents:
                if intent['tag'] == tag:
                    return random.choice(intent['responses'])
        
        # FALLBACK: Use Gemini if local model is unsure
        print(f"Local model unsure (prob: {max_prob:.2f}). Calling Gemini...")
        return self.get_gemini_response(text)

if __name__ == "__main__":
    bot = ChatbotModel()
    print("Bot is ready! Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'quit':
            break
        response = bot.get_response(user_input)
        print(f"Bot: {response}")
