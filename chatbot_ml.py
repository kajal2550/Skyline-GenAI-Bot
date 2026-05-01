import json
import random
import os
import google.generativeai as genai

# ---------------------------------------------------------
# GEMINI API KEY
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyDI0VwfUQxSUU1G3Pb70YZRgopR-4dt-ok")
# ---------------------------------------------------------

class ChatbotModel:
    def __init__(self, data_path='data.json'):
        self.data_path = data_path
        self.intents = self._load_data()
        
        # Initialize Gemini
        self.use_gemini = False
        if GEMINI_API_KEY:
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

    def get_gemini_response(self, text):
        if not self.use_gemini:
            return "I'm not sure about that. Please check back later!"
        
        try:
            prompt = f"You are Skyline AI, a premium and helpful AI assistant. Answer this query concisely: {text}"
            response = self.gemini.generate_content(prompt)
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg:
                return "Skyline AI is currently processing many requests (Quota Limit). Please wait a moment!"
            return "I'm having trouble connecting to my brain right now. Please try again later!"

    def get_response(self, text):
        user_input = text.lower()
        
        # Simple but effective keyword matching for local intents
        for intent in self.intents:
            for pattern in intent['patterns']:
                if pattern.lower() in user_input:
                    return random.choice(intent['responses'])
        
        # Fallback to Gemini if no keyword matches
        print(f"No local match found. Calling Gemini...")
        return self.get_gemini_response(text)
