// Health Conditions Mapping
const healthConditions = {
    "heart": "heart_disease",
    "cardio": "heart_disease",
    "bones": "bone_issue",
    "orthopedic": "bone_issue",
    "nerves": "nerve_issue",
    "neurology": "nerve_issue",
    "cancer": "cancer_issue",
    "oncology": "cancer_issue",
    "skin": "skin_issue",
    "dermatology": "skin_issue",
    "pulmonary": "pulmonary_issue",
    "fever": "general_physician_issue",
    "pain": "general_physician_issue",
    "women": "women_issue"
};

// Multilingual Responses (English, Hindi, Bengali)
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "location": "Fetching your current location to find nearby clinics and hospitals...",
        "clinic": "Searching for clinics near your location. Please wait...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "heart_disease": "For heart-related issues, you may consult a Cardiologist. Fetching nearby hospitals...",
        "bone_issue": "For bone problems, an Orthopedic specialist would be helpful. Fetching nearby hospitals...",
        "nerve_issue": "For nerve issues, I recommend consulting a Neurologist. Fetching nearby hospitals...",
        "cancer_issue": "For cancer concerns, please consult an Oncologist. Fetching nearby hospitals...",
        "skin_issue": "For skin problems, a Dermatologist is the best choice. Fetching nearby hospitals...",
        "pulmonary_issue": "For pulmonary issues, you should consult a Pulmonologist. Searching for nearby hospitals...",
        "general_physician_issue": "For fever or general pain, you should consult a General Physician. Searching for nearby hospitals...",
        "women_issue": "For women's health issues, you may consult a Gynecologist. Searching for nearby hospitals..."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्कार! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! मुझे बताएं कि और कोई सहायता चाहिए।",
        "thank you": "धन्यवाद! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "मैं आपके स्थान का पता लगा रहा हूँ ताकि निकटतम क्लिनिक या अस्पताल खोज सकूं।",
        "clinic": "मैं आपके स्थान के निकट क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "hospital": "चिकित्सा परीक्षणों और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?",
        "heart_disease": "हृदय से जुड़ी समस्याओं के लिए, आप किसी हृदय रोग विशेषज्ञ से परामर्श करें।",
        "bone_issue": "हड्डियों की समस्याओं के लिए, किसी अस्थि रोग विशेषज्ञ से परामर्श करें।",
        "nerve_issue": "नसों की समस्याओं के लिए, किसी न्यूरोलॉजिस्ट से मिलें।",
        "cancer_issue": "कैंसर के मामलों में, एक ऑन्कोलॉजिस्ट से परामर्श करें।",
        "skin_issue": "त्वचा संबंधी समस्याओं के लिए, त्वचा विशेषज्ञ से मिलें।",
        "pulmonary_issue": "पुल्मोनरी समस्याओं के लिए, आपको एक पल्मोनोलॉजिस्ट से परामर्श करना चाहिए।",
        "general_physician_issue": "बुखार या सामान्य दर्द के लिए, आपको एक सामान्य चिकित्सक से मिलना चाहिए।",
        "women_issue": "महिलाओं के स्वास्थ्य समस्याओं के लिए, आप एक गायनकोलॉजिस्ट से परामर्श कर सकती हैं।"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার অবস্থান সনাক্ত করছি যাতে কাছের হাসপাতাল বা ক্লিনিক খুঁজে বের করা যায়।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "hospital": "চিকিৎসা পরীক্ষা এবং চেকআপের জন্য কাছের হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে পুনরায় বলুন।",
        "heart_disease": "হৃদরোগ সংক্রান্ত সমস্যার জন্য, আপনাকে একজন কার্ডিওলজিস্টের পরামর্শ নিতে হবে।",
        "bone_issue": "হাড়ের সমস্যার জন্য একজন অর্থোপেডিক বিশেষজ্ঞের সাথে যোগাযোগ করুন।",
        "nerve_issue": "স্নায়বিক সমস্যার জন্য একজন নিউরোলজিস্টের পরামর্শ নিন।",
        "cancer_issue": "ক্যান্সার রোগের জন্য অনকোলজিস্টের পরামর্শ নিন।",
        "skin_issue": "ত্বক সংক্রান্ত সমস্যার জন্য, একজন চর্মরোগ বিশেষজ্ঞের পরামর্শ নিন।",
        "pulmonary_issue": "পালমোনারি সমস্যার জন্য, আপনাকে একজন পালমোনোলজিস্টের পরামর্শ নিতে হবে।",
        "general_physician_issue": "জ্বর বা সাধারণ ব্যথার জন্য, আপনাকে একজন সাধারণ চিকিৎসকের কাছে যেতে হবে।",
        "women_issue": "মহিলাদের স্বাস্থ্য সমস্যার জন্য, আপনাকে একজন গাইনোকোলজিস্টের পরামর্শ নিতে হবে।"
    }
};

// Ensure Chatbot Initializes Properly
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");

    if (!sendButton || !userInput) {
        console.error("Error: Some chatbot elements are missing in HTML.");
        return;
    }

    sendButton.addEventListener("click", processUserInput);
    console.log("Chatbot initialized.");
});
