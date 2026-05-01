import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyDI0VwfUQxSUU1G3Pb70YZRgopR-4dt-ok"
genai.configure(api_key=GEMINI_API_KEY)

try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print(f"Error: {e}")
