# W2W Eco-Assistant Chatbot - Complete Code Reference

This document contains all the final code blocks for the W2W Eco-Assistant chatbot feature.

---

## 1️⃣ FRONTEND: HTML Widget

**File: `chatbot-widget.html`**  
**Action: Copy this block before the closing `</body>` tag in your HTML pages**

```html
<!-- W2W Chatbot Container -->
<div id="w2w-chatbot-container">
    <!-- Floating Chat Button -->
    <button id="w2w-chat-button" aria-label="Open W2W Eco-Assistant Chat">
        🌱
    </button>
    
    <!-- Chat Window (Hidden by default) -->
    <div id="w2w-chat-window">
        <!-- Chat Header -->
        <div id="w2w-chat-header">
            <h3>🌱 W2W Eco-Assistant</h3>
            <button id="w2w-close-chat" aria-label="Close Chat">×</button>
        </div>
        
        <!-- Chat Messages Area -->
        <div id="w2w-chat-messages">
            <!-- Messages will be dynamically added here -->
        </div>
        
        <!-- Chat Input Area -->
        <div id="w2w-chat-input-container">
            <textarea 
                id="w2w-user-input" 
                placeholder="Ask about our eco-products..."
                rows="1"
                maxlength="500"
            ></textarea>
            <button id="w2w-send-button" aria-label="Send Message">
                ➤
            </button>
        </div>
    </div>
</div>

<!-- Chatbot JavaScript -->
<script src="w2w-chatbot.js"></script>
```

---

## 2️⃣ FRONTEND: CSS Styles

**File: `style.css`**  
**Action: Append to the end of your existing style.css file**

```css
/* ============================================
   W2W ECO-ASSISTANT CHATBOT STYLES
   ============================================ */

/* Chatbot Container - Fixed positioning */
#w2w-chatbot-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  font-family: 'Inter', Arial, sans-serif;
}

/* Chat Button - Floating action button */
#w2w-chat-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 6px 24px rgba(46, 125, 50, 0.4);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

#w2w-chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px rgba(46, 125, 50, 0.6);
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 6px 24px rgba(46, 125, 50, 0.4);
  }
  50% {
    box-shadow: 0 8px 32px rgba(46, 125, 50, 0.6);
  }
}

/* Chat Window - Main container */
#w2w-chat-window {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 400px;
  height: 600px;
  max-height: 85vh;
  background: white;
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  display: none;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
}

/* Chat Header */
#w2w-chat-header {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
}

#w2w-chat-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

#w2w-close-chat {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

#w2w-close-chat:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Chat Messages Container */
#w2w-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Custom Scrollbar */
#w2w-chat-messages::-webkit-scrollbar {
  width: 6px;
}

#w2w-chat-messages::-webkit-scrollbar-track {
  background: #e0e0e0;
}

#w2w-chat-messages::-webkit-scrollbar-thumb {
  background: #2e7d32;
  border-radius: 3px;
}

/* Message Styles */
.w2w-message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.w2w-message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.w2w-bot-message .w2w-message-avatar {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
}

.w2w-user-message .w2w-message-avatar {
  background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
}

.w2w-message-content {
  flex: 1;
  padding: 12px 16px;
  border-radius: 16px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.w2w-bot-message .w2w-message-content {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
}

.w2w-user-message {
  flex-direction: row-reverse;
}

.w2w-user-message .w2w-message-content {
  background: #2e7d32;
  color: white;
}

/* Typing Indicator */
.w2w-typing-indicator .w2w-typing-dots {
  display: flex;
  gap: 6px;
  padding: 8px 0;
}

.w2w-typing-indicator .w2w-typing-dots span {
  width: 8px;
  height: 8px;
  background: #2e7d32;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.w2w-typing-indicator .w2w-typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.w2w-typing-indicator .w2w-typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-8px);
  }
}

/* Chat Input Container */
#w2w-chat-input-container {
  padding: 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  align-items: center;
}

#w2w-user-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  font-size: 0.95rem;
  font-family: 'Inter', Arial, sans-serif;
  outline: none;
  transition: border-color 0.2s;
  resize: none;
  max-height: 100px;
}

#w2w-user-input:focus {
  border-color: #2e7d32;
}

#w2w-send-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #2e7d32;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

#w2w-send-button:hover:not(:disabled) {
  background: #1b5e20;
  transform: scale(1.05);
}

#w2w-send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  #w2w-chatbot-container {
    bottom: 16px;
    right: 16px;
  }
  
  #w2w-chat-window {
    width: calc(100vw - 32px);
    height: calc(100vh - 32px);
    bottom: 16px;
    right: 16px;
    max-height: none;
  }
  
  #w2w-chat-button {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
}

/* Message Content Formatting */
.w2w-message-content ul {
  margin: 8px 0;
  padding-left: 20px;
}

.w2w-message-content li {
  margin: 4px 0;
}

.w2w-message-content strong {
  font-weight: 600;
  color: #1b5e20;
}

.w2w-user-message .w2w-message-content strong {
  color: #e8f5e9;
}

.w2w-message-content p {
  margin: 8px 0;
}

.w2w-message-content p:first-child {
  margin-top: 0;
}

.w2w-message-content p:last-child {
  margin-bottom: 0;
}
```

---

## 3️⃣ FRONTEND: JavaScript Logic

**File: `w2w-chatbot.js`**  
**Action: Create this file in your project root**

```javascript
// W2W Eco-Assistant Chatbot - Complete JavaScript Logic
(function() {
    'use strict';
    
    // Configuration
    const API_URL = 'http://127.0.0.1:5000/chat';
    const TYPING_DELAY = 800;
    
    // DOM Elements
    let chatButton, chatWindow, closeButton, messagesContainer, userInput, sendButton;
    
    // Initialize chatbot when DOM is ready
    function initChatbot() {
        // Get DOM elements
        chatButton = document.getElementById('w2w-chat-button');
        chatWindow = document.getElementById('w2w-chat-window');
        closeButton = document.getElementById('w2w-close-chat');
        messagesContainer = document.getElementById('w2w-chat-messages');
        userInput = document.getElementById('w2w-user-input');
        sendButton = document.getElementById('w2w-send-button');
        
        // Verify all elements exist
        if (!chatButton || !chatWindow || !closeButton || !messagesContainer || !userInput || !sendButton) {
            console.error('W2W Chatbot: Required elements not found');
            return;
        }
        
        // Attach event listeners
        chatButton.addEventListener('click', openChat);
        closeButton.addEventListener('click', closeChat);
        sendButton.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        console.log('W2W Chatbot initialized successfully');
    }
    
    // Open chat window and show welcome message
    function openChat() {
        chatWindow.style.display = 'flex';
        chatButton.style.display = 'none';
        
        // Show welcome message if chat is empty
        if (messagesContainer.children.length === 0) {
            showWelcomeMessage();
        }
        
        // Focus on input
        userInput.focus();
    }
    
    // Close chat window
    function closeChat() {
        chatWindow.style.display = 'none';
        chatButton.style.display = 'flex';
    }
    
    // Show welcome message with product options
    function showWelcomeMessage() {
        const welcomeHTML = `
            <div class="w2w-message w2w-bot-message">
                <div class="w2w-message-avatar">🌱</div>
                <div class="w2w-message-content">
                    <p><strong>Welcome to W2W Eco-Assistant! 🌍</strong></p>
                    <p>I'm here to help you learn about our sustainable products made from waste materials.</p>
                    <p><strong>Our Products:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li><strong>🌺 Eco-Friendly Perfumes</strong> - Made from flower waste</li>
                        <li><strong>🥥 Coconut Husk Plates</strong> - Biodegradable tableware</li>
                        <li><strong>🧱 Industrial Briquettes</strong> - From steel plant waste</li>
                    </ul>
                    <p>Feel free to ask me anything about these products, their benefits, pricing, or sustainability impact!</p>
                </div>
            </div>
        `;
        messagesContainer.innerHTML = welcomeHTML;
        scrollToBottom();
    }
    
    // Send user message
    async function sendMessage() {
        const message = userInput.value.trim();
        
        if (!message) {
            return;
        }
        
        // Display user message
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Disable input while processing
        setInputState(false);
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Send to backend API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Display bot response
            if (data.response) {
                addMessage(data.response, 'bot');
            } else {
                throw new Error('No response from API');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            removeTypingIndicator();
            addMessage(
                '⚠️ Sorry, I\'m having trouble connecting right now. Please make sure the Flask server is running on http://127.0.0.1:5000',
                'bot'
            );
        } finally {
            // Re-enable input
            setInputState(true);
            userInput.focus();
        }
    }
    
    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `w2w-message w2w-${type}-message`;
        
        if (type === 'bot') {
            messageDiv.innerHTML = `
                <div class="w2w-message-avatar">🌱</div>
                <div class="w2w-message-content">${formatMessage(text)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w2w-message-content">${formatMessage(text)}</div>
                <div class="w2w-message-avatar">👤</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Format message text (preserve line breaks, etc.)
    function formatMessage(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'w2w-message w2w-bot-message w2w-typing-indicator';
        typingDiv.id = 'w2w-typing';
        typingDiv.innerHTML = `
            <div class="w2w-message-avatar">🌱</div>
            <div class="w2w-message-content">
                <div class="w2w-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('w2w-typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Enable/disable input controls
    function setInputState(enabled) {
        userInput.disabled = !enabled;
        sendButton.disabled = !enabled;
        sendButton.style.opacity = enabled ? '1' : '0.5';
    }
    
    // Scroll to bottom of messages
    function scrollToBottom() {
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
```

---

## 4️⃣ BACKEND: Python Flask Server

**File: `w2w_api/app.py`**  
**Action: Create this file in a new folder called `w2w_api`**

```python
"""
W2W Eco-Assistant Chatbot Backend
Flask server with Gemini API integration
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Hardcoded API Key for local testing
GEMINI_API_KEY = "AIzaSyDXEDLSXFkFk_cBgCBMr0WtX2lsNIS7_RI"

# Configure Gemini client
genai.configure(api_key=GEMINI_API_KEY)

# System prompt defining W2W assistant behavior
W2W_SYSTEM_PROMPT = """You are the W2W Eco-Assistant, a friendly and knowledgeable chatbot for Waste2Worth (W2W), 
a sustainable e-commerce platform. Your role is to help customers learn about our eco-friendly products made from waste materials.

**Our Three Main Product Lines:**

1. **Eco-Friendly Perfumes (Flower Waste Conversion)**
   - Made from temple flower waste and natural ingredients
   - Available fragrances: Vrindavan Prem, Lavender Dreams, Rose Garden, Jasmine Nights, Sandalwood Essence
   - Prices: ₹299 for 50ml, ₹499 for 100ml
   - Benefits: Chemical-free, long-lasting, supports temple waste recycling
   - Environmental impact: Diverts 10kg+ of flower waste per batch from landfills

2. **Coconut Husk Plates (Agricultural Waste Conversion)**
   - Made from 100% coconut husk fibers
   - Available sizes: Small (6"), Medium (8"), Large (10"), Extra Large (12")
   - Prices: ₹15-35 per plate depending on size
   - Benefits: Biodegradable, compostable, sturdy, microwave-safe
   - Perfect for: Parties, events, restaurants, eco-conscious dining
   - Environmental impact: Reduces plastic use, utilizes agricultural waste

3. **Industrial Briquettes (Steel Plant Waste Conversion)**
   - Made from sinter fines and LD sludge from steel manufacturing
   - Price: ₹1,350 per kg
   - Benefits: High energy density, reduces industrial waste, cost-effective fuel alternative
   - Use cases: Industrial heating, metal processing, eco-friendly fuel
   - Environmental impact: Recycles 1000+ tons of steel waste annually

**Your Guidelines:**
- Be warm, professional, and enthusiastic about sustainability
- Provide accurate product information
- Explain environmental benefits clearly
- Suggest products based on customer needs
- Keep responses concise but informative (2-4 paragraphs)
- Use emojis sparingly for a friendly touch
- If asked about products not in our catalog, politely redirect to our three main lines
- Encourage purchases by highlighting unique value propositions

**Response Style:**
- Start with a friendly acknowledgment
- Provide specific details when asked
- End with a helpful suggestion or question to continue the conversation
- Use bullet points for clarity when listing features
"""

# Initialize Gemini model
try:
    model = genai.GenerativeModel(
        model_name='gemini-1.5-flash',
        system_instruction=W2W_SYSTEM_PROMPT
    )
    print("✅ Gemini model initialized successfully")
except Exception as e:
    print(f"❌ Error initializing Gemini model: {e}")
    model = None

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat requests from the frontend
    Expects JSON: {"message": "user message"}
    Returns JSON: {"response": "bot response"}
    """
    try:
        # Get user message from request
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'No message provided'
            }), 400
        
        user_message = data['message'].strip()
        
        if not user_message:
            return jsonify({
                'error': 'Empty message'
            }), 400
        
        # Check if model is initialized
        if not model:
            return jsonify({
                'error': 'AI model not initialized'
            }), 500
        
        # Generate response using Gemini
        response = model.generate_content(user_message)
        
        # Extract text from response
        bot_response = response.text
        
        return jsonify({
            'response': bot_response,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"❌ Error in /chat endpoint: {e}")
        return jsonify({
            'error': 'Failed to generate response',
            'details': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'gemini-1.5-flash' if model else 'not initialized'
    })

@app.route('/', methods=['GET'])
def home():
    """Root endpoint"""
    return jsonify({
        'message': 'W2W Eco-Assistant API',
        'version': '1.0',
        'endpoints': {
            '/chat': 'POST - Send chat messages',
            '/health': 'GET - Health check'
        }
    })

if __name__ == '__main__':
    print("=" * 60)
    print("🌱 W2W Eco-Assistant Backend Server")
    print("=" * 60)
    print(f"📡 Server starting on http://127.0.0.1:5000")
    print(f"🤖 Model: gemini-1.5-flash")
    print(f"🔑 API Key: {'Configured' if GEMINI_API_KEY else 'Missing'}")
    print("=" * 60)
    
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
```

---

## 5️⃣ BACKEND: Requirements File

**File: `w2w_api/requirements.txt`**  
**Action: Create this file in the `w2w_api` folder**

```
Flask==3.0.0
flask-cors==4.0.0
google-generativeai==0.3.2
```

---

## 🚀 Quick Start Commands

### Start Backend Server (PowerShell):
```powershell
cd w2w_api
pip install -r requirements.txt
python app.py
```

### Test in Browser:
1. Open `homepage.html`
2. Click the green 🌱 button
3. Ask: "Tell me about your perfumes"

---

## ✅ Verification Checklist

- [ ] All files created successfully
- [ ] CSS appended to style.css
- [ ] HTML widget added to pages
- [ ] Flask server starts without errors
- [ ] Chatbot button visible on webpage
- [ ] Can send and receive messages
- [ ] Welcome message displays correctly

---

**🎉 Your W2W Eco-Assistant chatbot is complete and ready to use!**

For detailed setup instructions, see `CHATBOT_SETUP_INSTRUCTIONS.md`  
For quick start guide, see `QUICK_START.md`
