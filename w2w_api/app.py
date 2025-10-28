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

# Select the best model with higher free tier limits
# Priority: Flash models have better rate limits than Pro models
selected_model = 'models/gemini-2.5-flash'  # Fast and high quota
print(f"✅ Selected model: {selected_model}")

# System prompt defining W2W assistant behavior
W2W_SYSTEM_PROMPT = """You are the W2W Eco-Assistant, a friendly and knowledgeable chatbot for Waste2Worth (W2W), 
a sustainable e-commerce platform. Your role is to help customers learn about our eco-friendly products made from waste materials.

**Our Three Main Product Lines:**

1. **Eco-Friendly Herbal Perfumes (Flower Waste Conversion)**
   - Made from temple flower waste collected from religious sites
   - Flowers used: Marigold, Rose, Jasmine, Lavender, Lotus, Hibiscus, Tulsi (Holy Basil), Champa, and Sandalwood flowers
   - Available fragrances: 
     * Vrindavan Prem - Blend of temple roses and marigolds
     * Lavender Dreams - Pure lavender with hints of champa
     * Rose Garden - Traditional rose with jasmine notes
     * Jasmine Nights - Night-blooming jasmine essence
     * Sandalwood Essence - Sandalwood flowers with tulsi
   - Prices: ₹299 for 50ml, ₹499 for 100ml
   - Benefits: 100% natural, chemical-free, alcohol-free, long-lasting, supports temple waste recycling
   - Environmental impact: Diverts 10kg+ of flower waste per batch from landfills
   - Production: Hand-crafted using traditional steam distillation methods

2. **Cocopeat Products & Coconut Husk Plates (Agricultural Waste Conversion)**
   - **Coco-Peat**: Premium growing medium made from coconut husk fibers
     * Price: ₹50 per kg
     * Uses: Gardening, hydroponics, seed starting
     * Benefits: Better water retention, improves soil structure, 100% organic
   - **Coconut Husk Plates**: Eco-friendly disposable tableware
     * Made from 100% compressed coconut husk fibers
     * Available sizes: Small (6"), Medium (8"), Large (10"), Extra Large (12")
     * Prices: ₹15-35 per plate depending on size
     * Benefits: Biodegradable (decomposes in 60 days), compostable, sturdy, microwave-safe, leak-proof
     * Perfect for: Parties, weddings, events, restaurants, eco-conscious dining, outdoor gatherings
   - Environmental impact: Reduces plastic use, utilizes agricultural waste, zero chemicals

3. **Industrial Briquettes (Steel Plant Waste Conversion)**
   - Made from sinter fines and LD sludge from steel manufacturing
   - Also accepts: Metal scrap, steel waste, industrial dust
   - Price: ₹1,350 per kg
   - Benefits: High energy density, reduces industrial waste, cost-effective fuel alternative
   - Use cases: Industrial heating, metal processing, eco-friendly fuel, blast furnaces
   - Environmental impact: Recycles 1000+ tons of steel waste annually
   - What you can do with steel scrap: We convert it into high-quality briquettes for fuel

**Logistics & Sales Information:**

- **Delivery Time**: 
  * Standard delivery: 5-7 business days
  * Express delivery: 2-3 business days (available in select cities)
  * Metro cities: Faster delivery (3-5 days standard)
  
- **Order Tracking**: 
  * Track orders through "Track Order" page on website
  * SMS/Email updates at every stage
  * Real-time tracking with courier partner details
  * Order ID provided immediately after purchase
  
- **Payment Options**:
  * UPI (Google Pay, PhonePe, Paytm)
  * Credit/Debit Cards (Visa, Mastercard, RuPay)
  * Net Banking (all major banks)
  * Cash on Delivery (COD) - available for orders under ₹5,000
  * Digital Wallets
  
- **Partnership Opportunities**:
  * Bulk supply partnerships for restaurants, event planners, hotels
  * Waste collection partnerships (we collect your flower/agricultural waste)
  * Retail partnerships for local stores
  * Contact: Email our partnership team or use the "Join Community" page
  * Benefits: Discounts on bulk orders, revenue sharing models available
  
- **Return Policy**:
  * 7-day return policy for unopened/unused products
  * Full refund or exchange available
  * Defective/damaged items: Free replacement within 48 hours
  * Process: Contact support, return approval within 24 hours
  * Refund: Processed within 5-7 business days after return verification

**Your Guidelines:**
- Be warm, professional, and enthusiastic about sustainability
- Provide accurate product information with specific details
- When asked about perfumes, mention the specific flowers used
- Explain environmental benefits clearly
- Answer logistics questions (delivery, tracking, payment, returns) confidently
- Suggest products based on customer needs
- Keep responses concise but informative (2-4 paragraphs)
- Use emojis sparingly for a friendly touch
- If asked about products not in our catalog, politely redirect to our three main lines
- Encourage purchases by highlighting unique value propositions
- For partnership inquiries, be encouraging and provide clear next steps

**Response Style:**
- Start with a friendly acknowledgment
- Provide specific details when asked
- Use bullet points for clarity when listing features
- End with a helpful suggestion or question to continue the conversation
- Be sales-oriented but not pushy
"""

# Initialize Gemini model
try:
    model = genai.GenerativeModel(selected_model)
    print(f"✅ Gemini model initialized successfully!")
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
        
        # Create full prompt with system instruction
        full_prompt = f"""{W2W_SYSTEM_PROMPT}

User Question: {user_message}

Please provide a helpful response:"""
        
        print(f"📩 Received message: {user_message}")
        
        # Generate response using Gemini
        response = model.generate_content(full_prompt)
        
        print(f"✅ Generated response successfully")
        
        # Extract text from response
        bot_response = response.text
        
        print(f"📤 Sending response: {bot_response[:100]}...")
        
        return jsonify({
            'response': bot_response,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"❌ Error in /chat endpoint: {e}")
        print(f"❌ Error type: {type(e).__name__}")
        print(f"❌ Error details: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': 'Failed to generate response',
            'details': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'gemini-pro' if model else 'not initialized'
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
    print(f"🤖 Model: {selected_model}")
    print(f"🔑 API Key: {'Configured' if GEMINI_API_KEY else 'Missing'}")
    print("=" * 60)
    
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
