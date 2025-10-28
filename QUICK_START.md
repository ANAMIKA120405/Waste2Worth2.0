# 🚀 W2W Chatbot - Quick Start Guide

## ✅ What's Been Created

All files have been created and integrated into your project:

### Frontend Files (Already Added)
- ✅ `w2w-chatbot.js` - Complete chatbot JavaScript logic
- ✅ `style.css` - Chatbot styles appended (lines 320+)
- ✅ `chatbot-widget.html` - HTML widget template
- ✅ Widget added to: `homepage.html`, `joincomm.html`, `profile.html`, `cart.html`

### Backend Files (Ready to Run)
- ✅ `w2w_api/app.py` - Flask server with Gemini API
- ✅ `w2w_api/requirements.txt` - Python dependencies

## 🎯 How to Start Using the Chatbot

### Step 1: Start the Backend Server

Open PowerShell and run these commands:

```powershell
# Navigate to the API folder
cd w2w_api

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Start the Flask server
python app.py
```

**Keep this terminal window open!** You should see:
```
🌱 W2W Eco-Assistant Backend Server
📡 Server starting on http://127.0.0.1:5000
```

### Step 2: Open Your Website

1. Open any of these pages in your browser:
   - `homepage.html`
   - `joincomm.html`
   - `profile.html`
   - `cart.html`

2. Look for the green floating button (🌱) in the bottom-right corner

3. Click it to open the chatbot!

### Step 3: Test the Chatbot

Try these questions:
- "Tell me about your eco-friendly perfumes"
- "What sizes do coconut plates come in?"
- "How much do briquettes cost?"
- "What's the environmental impact of your products?"

## 🎨 What You'll See

✨ **Visual Features:**
- Floating green button with pulse animation
- Professional chat window with gradient header
- Welcome message with product information
- Smooth typing indicators
- Beautiful message bubbles
- Fully responsive design

## 📋 Pages with Chatbot

The chatbot widget is now available on:
1. ✅ Homepage (`homepage.html`)
2. ✅ Join Community (`joincomm.html`)
3. ✅ Profile (`profile.html`)
4. ✅ Cart (`cart.html`)

You can easily add it to more pages by copying the widget code from `chatbot-widget.html`.

## 🔧 Troubleshooting

### Problem: Can't see the chatbot button
**Solution:** Clear your browser cache (Ctrl+Shift+Delete) and refresh

### Problem: "Failed to connect" error
**Solution:** Make sure the Flask server is running in PowerShell

### Problem: Python errors when starting server
**Solution:** Run: `pip install --upgrade -r requirements.txt`

## 📊 Features Included

✅ Smart AI responses powered by Gemini 1.5 Flash
✅ Knowledge about all 3 product lines:
   - 🌺 Eco-Friendly Perfumes (5 fragrances)
   - 🥥 Coconut Husk Plates (4 sizes)
   - 🧱 Industrial Briquettes
✅ Professional, friendly conversation style
✅ Environmental impact information
✅ Pricing and product details
✅ Beautiful UI with animations

## 🎓 Next Steps

1. **Customize the colors** - Edit CSS variables in `style.css`
2. **Modify bot behavior** - Edit `W2W_SYSTEM_PROMPT` in `app.py`
3. **Add more pages** - Copy widget from `chatbot-widget.html`
4. **Monitor conversations** - Check Flask terminal for API logs

## 📞 Need Help?

1. Check `CHATBOT_SETUP_INSTRUCTIONS.md` for detailed documentation
2. Verify all files are in the correct locations
3. Check browser console (F12) for JavaScript errors
4. Check Flask terminal for Python errors

---

**🌱 Your W2W Eco-Assistant is ready to help customers!**

*Transform waste into worth, one conversation at a time.*
