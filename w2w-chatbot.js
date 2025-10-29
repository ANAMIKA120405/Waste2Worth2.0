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
                    <p><strong>Welcome to Waste2Worth! �</strong></p>
                    <p>I'm your Eco-Assistant. We turn waste into value for a greener planet.</p>
                    <p><strong>Here are some questions I can answer right now:</strong></p>
                    <ol style="margin: 10px 0; padding-left: 20px; line-height: 1.8;">
                        <li><strong>What are the Cocopeat Products?</strong></li>
                        <li><strong>What can I do with steel scrap?</strong></li>
                        <li><strong>Tell me about the Herbal Perfumes.</strong></li>
                        <li><strong>How fast is the delivery?</strong></li>
                        <li><strong>How can I track my order?</strong></li>
                        <li><strong>What are your payment options?</strong></li>
                        <li><strong>How can I partner with you?</strong></li>
                        <li><strong>What is your return policy?</strong></li>
                    </ol>
                    <p>Feel free to ask me anything!</p>
                </div>
            </div>
        `;
        // FIXED: Only show welcome once, don't replace existing messages
        if (messagesContainer.children.length === 0) {
            messagesContainer.innerHTML = welcomeHTML;
        }
        scrollToBottom();
    }
    
    // Local fallback responder (used when backend is unreachable)
    function localResponder(prompt) {
        return (
            "Thanks for your question!\n\n" +
            "I don't have access to the AI backend right now, but here's a helpful summary: " +
            `(You asked: ${prompt.slice(0,80)}...)\n\n` +
            "Products we offer: Vrindavan Prem (perfume), Coco-Peat, Coconut husk plates, and Bricket. " +
            "You can ask about product details, delivery, payment options, or partnerships."
        );
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
            console.warn('Error sending message to API, falling back to local responder:', error);
            removeTypingIndicator();
            // Use local fallback responder to provide a helpful answer instead of an error
            const fallback = localResponder(message);
            addMessage(fallback, 'bot');
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
