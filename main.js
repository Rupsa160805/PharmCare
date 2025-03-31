// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses in Multiple Languages
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "location": "Please share your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! मैं आपकी क्या मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! अगर आपको और सहायता चाहिए तो बताएं।",
        "thank you": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि मैं आपके नज़दीकी क्लिनिक या अस्पताल ढूँढ सकूँ।",
        "clinic": "मैं आपके स्थान के निकट क्लिनिक की खोज कर रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा में बात करना चाहते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और जांच के लिए निकटतम अस्पतालों की खोज कर रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षणों का उल्लेख करें ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं सका। क्या आप इसे फिर से कह सकते हैं?",
        "take_care": "ख्याल रखें! यदि आपको किसी सहायता की आवश्यकता हो तो मुझे बताएं।",
        "checkup": "बेहतर देखभाल के लिए परामर्श के साथ स्वास्थ्य जांच कराने पर विचार करें।",
        "location_confirm": "ठीक है! मैं आपके स्थान के पास अस्पताल और क्लिनिक ढूँढ रहा हूँ। कृपया प्रतीक्षा करें..."
    },
    "bn": {
        "hello": "হ্যালো! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "হাই! কিভাবে সাহায্য করতে পারি?",
        "thanks": "স্বাগতম! আরও সাহায্যের প্রয়োজন হলে জানাবেন।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোন সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "অনুগ্রহ করে আপনার বর্তমান অবস্থান শেয়ার করুন যাতে আমি কাছাকাছি ক্লিনিক বা হাসপাতাল খুঁজে পেতে পারি।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি... অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সাহায্য করতে পারি। আপনি কোন ভাষায় কথা বলতে চান? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "মেডিকেল পরীক্ষা এবং চেকআপের জন্য নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "অনুগ্রহ করে আপনার রোগ বা উপসর্গ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার ও হাসপাতালের পরামর্শ দিতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে
