from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from chatbot_ml import ChatbotModel

app = Flask(__name__)
CORS(app)

# Initialize the chatbot model
bot = ChatbotModel()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"response": "Please say something!"}), 400
    
    response = bot.get_response(user_message)
    return jsonify({"response": response})

if __name__ == '__main__':
    import os
    # Get port from environment variable for deployment (Render, Heroku, etc.)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
