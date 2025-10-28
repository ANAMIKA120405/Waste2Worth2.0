# W2W Eco-Assistant Chatbot - Setup Instructions

## 📁 Project Structure
```
Waste2Worth2.0/
├── w2w-chatbot.js          # Frontend JavaScript logic
├── chatbot-widget.html     # HTML widget (copy this into your pages)
├── style.css               # CSS styles (chatbot styles already added)
└── w2w_api/                # Backend folder
    ├── app.py              # Flask server with Gemini API
    └── requirements.txt    # Python dependencies
```

## 🚀 Backend Setup (Python/Flask)

### Step 1: Open a New PowerShell Terminal
Navigate to the backend folder:
```powershell
cd w2w_api
```

### Step 2: Create Virtual Environment (Optional but Recommended)
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Step 3: Install Dependencies
```powershell
pip install -r requirements.txt
```

### Step 4: Start the Flask Server
```powershell
python app.py
```

You should see:
```
🌱 W2W Eco-Assistant Backend Server
📡 Server starting on http://127.0.0.1:5000
🤖 Model: gemini-1.5-flash
🔑 API Key: Configured
```

**⚠️ Important: Keep this terminal running while using the chatbot!**

## 🎨 Frontend Setup

### Step 1: Add HTML Widget to Your Pages
1. Open `chatbot-widget.html`
2. Copy the entire content
3. Paste it **before the closing `</body>` tag** in:
   - `homepage.html`
   - `joincomm.html`
   - `cart.html`
   - `profile.html`
   - Any other page where you want the chatbot

### Step 2: Verify Files Are Linked
Make sure these lines exist in your HTML pages:
```html
<link rel="stylesheet" href="style.css">  <!-- Should already exist -->
<script src="w2w-chatbot.js"></script>    <!-- Added with the widget -->
```

### Step 3: Test the Chatbot
1. Open any page with the widget in your browser
2. You should see a green floating button (🌱) in the bottom-right
3. Click it to open the chat window
4. Try asking: "Tell me about your eco-friendly perfumes"

## ✅ Verification Checklist

- [ ] Flask server running on http://127.0.0.1:5000
- [ ] No errors in Flask terminal
- [ ] Chatbot button visible on webpage
- [ ] Clicking button opens chat window
- [ ] Welcome message appears
- [ ] Can send messages and receive responses
- [ ] No errors in browser console (F12)

## 🐛 Troubleshooting

### Problem: "Failed to connect" error in chat
**Solution:** Make sure the Flask server is running in PowerShell

### Problem: Chatbot button not visible
**Solution:** 
1. Check that `chatbot-widget.html` content is pasted in your HTML
2. Clear browser cache (Ctrl+Shift+Delete)
3. Verify CSS styles are loaded

### Problem: "Module not found" error in Flask
**Solution:** 
```powershell
pip install --upgrade -r requirements.txt
```

### Problem: CORS errors in browser console
**Solution:** Already handled by `flask-cors` - verify it's installed

## 🎯 Features Included

✅ **Frontend:**
- Floating chat button with pulse animation
- Professional chat window with gradient header
- Welcome message with product options
- Typing indicator
- Smooth animations and transitions
- Fully responsive design
- Emoji support

✅ **Backend:**
- Flask REST API
- Gemini 1.5 Flash integration
- CORS enabled
- Comprehensive system prompt
- Error handling
- Health check endpoint

✅ **Products Covered:**
- 🌺 Eco-Friendly Perfumes (5 fragrances)
- 🥥 Coconut Husk Plates (4 sizes)
- 🧱 Industrial Briquettes

## 📝 API Key Note

The current API key is hardcoded in `app.py`. For production:
1. Create a `.env` file
2. Add: `GEMINI_API_KEY=your_key_here`
3. Use `python-dotenv` to load it

## 🎨 Customization

### Change Colors
Edit `style.css` and find these variables:
- `#2e7d32` - Primary green
- `#1b5e20` - Dark green
- Modify gradient values for different looks

### Modify System Prompt
Edit `W2W_SYSTEM_PROMPT` in `app.py` to change:
- Product information
- Response style
- Bot personality

### Adjust Chat Window Size
Edit `#w2w-chat-window` in `style.css`:
```css
width: 400px;      /* Change width */
height: 600px;     /* Change height */
```

## 🌟 Next Steps

1. Add the widget to all your pages
2. Test with various questions
3. Monitor Flask terminal for any errors
4. Customize colors/styling to match your brand
5. Consider adding conversation history
6. Implement user authentication for personalized responses

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check Flask terminal for API errors
3. Verify all files are in correct locations
4. Ensure API key is valid

---

**Created for Waste2Worth 2.0** 
*Transforming waste into worth, one conversation at a time* 🌱
