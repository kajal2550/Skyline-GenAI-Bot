import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyDI0VwfUQxSUU1G3Pb70YZRgopR-4dt-ok"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-flash-latest')

try:
    response = model.generate_content("Say hello")
    print(f"Success: {response.text}")
except Exception as e:
    print(f"Error: {e}")
