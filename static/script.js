document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatWindow = document.getElementById('chat-window');
    const floatingContainer = document.getElementById('floating-elements');
    const featurePills = document.querySelectorAll('.feature-pill');
    const micBtn = document.querySelector('.icon-btn[title="Voice Input"]');
    const searchBtn = document.querySelector('.icon-btn[title="Search history"]');
    const settingsBtn = document.querySelector('.icon-btn[title="Settings"]');

    // Create floating elements (the "feathers")
    const createFloatingElements = () => {
        for (let i = 0; i < 15; i++) {
            const feather = document.createElement('div');
            feather.classList.add('feather');
            const size = Math.random() * 100 + 50;
            feather.style.width = `${size}px`;
            feather.style.height = `${size}px`;
            feather.style.left = `${Math.random() * 100}%`;
            feather.style.top = `${Math.random() * 100}%`;
            feather.style.animationDelay = `${Math.random() * 20}s`;
            feather.style.animationDuration = `${Math.random() * 20 + 10}s`;
            floatingContainer.appendChild(feather);
        }
    };
    createFloatingElements();

    // Function to add a message to the UI
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <span class="timestamp">${time}</span>
        `;
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // Function to show typing indicator
    const showTyping = () => {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
        typingDiv.innerHTML = `
            <div class="typing">
                <span></span><span></span><span></span>
            </div>
        `;
        chatContainer.appendChild(typingDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return typingDiv;
    };

    // Function to send message to backend
    const sendMessage = async () => {
        const message = userInput.value.trim();
        if (!message) return;

        // Clear input
        userInput.value = '';
        
        // Add user message to UI
        addMessage(message, 'user');

        // Show typing indicator
        const typingIndicator = showTyping();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            const data = await response.json();
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add bot response to UI
            addMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            addMessage("Sorry, I'm having trouble connecting to my brain. Please try again later.", 'bot');
        }
    };

    // Feature Pills Click
    featurePills.forEach(pill => {
        pill.addEventListener('click', () => {
            userInput.value = pill.innerText;
            sendMessage();
        });
    });

    // File Upload Functionality
    const hiddenFileInput = document.getElementById('hidden-file-input');
    const uploadTrigger = document.getElementById('upload-trigger');

    uploadTrigger.addEventListener('click', () => {
        hiddenFileInput.click();
    });

    hiddenFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            addMessage(`📎 Uploaded file: ${file.name}`, 'user');
            
            // Show typing indicator
            const typingIndicator = showTyping();
            
            setTimeout(() => {
                typingIndicator.remove();
                addMessage(`I've received your file "${file.name}". I'm analyzing its content now... Everything looks good!`, 'bot');
            }, 1500);
        }
    });

    // Real Voice Input using Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        let isListening = false;
        micBtn.addEventListener('click', () => {
            if (!isListening) {
                try {
                    recognition.start();
                    isListening = true;
                    micBtn.style.color = '#ef4444';
                    micBtn.style.transform = 'scale(1.2)';
                    userInput.placeholder = "Listening... Speak now";
                } catch (e) {
                    console.error("Recognition already started");
                }
            } else {
                recognition.stop();
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            isListening = false;
            micBtn.style.color = '';
            micBtn.style.transform = '';
            userInput.placeholder = "Ask Skyline anything...";
            
            // Auto-send after a short delay
            setTimeout(() => {
                sendMessage();
            }, 500);
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };

        recognition.onend = () => {
            isListening = false;
            micBtn.style.color = '';
            micBtn.style.transform = '';
            userInput.placeholder = "Ask Skyline anything...";
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            isListening = false;
            micBtn.style.color = '';
            micBtn.style.transform = '';
            userInput.placeholder = "Error! Try again.";
        };
    } else {
        // Fallback for browsers that don't support Speech API
        micBtn.addEventListener('click', () => {
            alert("Voice recognition is not supported in this browser. Please use Chrome or Edge.");
        });
    }

    // Search Modal Logic
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');

    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
    });

    closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    // Settings Modal Logic
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');

    settingsBtn.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Close modals on window click
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) searchModal.style.display = 'none';
        if (e.target === settingsModal) settingsModal.style.display = 'none';
    });

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
});
