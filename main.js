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
        "location": "I'm fetching your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'm fetching nearby hospitals and clinics now. Please wait a moment...",
        "doctors_found": "Here are the doctors and hospitals I found based on your condition:",
        "location_error": "I'm unable to retrieve your location. Please allow location access.",
        "switch_language": "Language switched successfully. How may I assist you now?",
        "language_error": "Sorry, I currently support English, Hindi, and Bengali. Please choose one.",
        "ask_location": "Please enable location services so I can suggest nearby hospitals.",
        "heart_disease": "For heart-related issues, you may consult a Cardiologist. Fetching nearby hospitals...",
        "bone_issue": "For bone problems, an Orthopedic specialist would be helpful. Fetching nearby hospitals...",
        "nerve_issue": "For nerve issues, I recommend consulting a Neurologist. Fetching nearby hospitals...",
        "cancer_issue": "For cancer concerns, please consult an Oncologist. Fetching nearby hospitals...",
        "skin_issue": "For skin problems, a Dermatologist is the best choice. Fetching nearby hospitals..."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्कार! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! मुझे बताएं कि और कोई सहायता चाहिए।",
        "thank you": "धन्यवाद! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "मैं आपके स्थान का पता लगा रहा हूँ ताकि निकटतम क्लिनिक या अस्पताल खोज सकूं।",
        "clinic": "मैं आपके स्थान के निकट क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बांग्ला, आदि)",
        "hospital": "चिकित्सा परीक्षणों और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?",
        "take_care": "अपना ख्याल रखें! यदि कोई सहायता चाहिए तो मुझे बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको एक स्वास्थ्य जांच निर्धारित करनी चाहिए।",
        "location_confirm": "समझ गया! निकटतम अस्पतालों और क्लीनिक की जानकारी प्राप्त कर रहा हूँ। कृपया प्रतीक्षा करें...",
        "doctors_found": "यहाँ आपके रोग के आधार पर मैंने डॉक्टर और अस्पताल ढूंढे हैं:",
        "location_error": "मैं आपका स्थान प्राप्त करने में असमर्थ हूँ। कृपया स्थान की अनुमति दें।",
        "switch_language": "भाषा सफलतापूर्वक बदली गई। अब मैं आपकी कैसे सहायता कर सकता हूँ?",
        "language_error": "मुझे क्षमा करें, फिलहाल मैं केवल अंग्रेजी, हिंदी, और बांग्ला में सहायता कर सकता हूँ।",
        "ask_location": "कृपया स्थान सेवाएं सक्षम करें ताकि मैं निकटतम अस्पतालों का सुझाव दे सकूं।",
        "heart_disease": "हृदय से जुड़ी समस्याओं के लिए, आप किसी हृदय रोग विशेषज्ञ से परामर्श करें। निकटतम अस्पतालों की जानकारी ला रहा हूँ...",
        "bone_issue": "हड्डियों की समस्याओं के लिए, किसी अस्थि रोग विशेषज्ञ से परामर्श करें। निकटतम अस्पतालों की जानकारी ला रहा हूँ...",
        "nerve_issue": "नसों की समस्याओं के लिए, किसी न्यूरोलॉजिस्ट से मिलें। निकटतम अस्पताल खोज रहा हूँ...",
        "cancer_issue": "कैंसर के मामलों में, एक ऑन्कोलॉजिस्ट से परामर्श करें। निकटतम अस्पताल खोज रहा हूँ...",
        "skin_issue": "त्वचा संबंधी समस्याओं के लिए, त्वचा विशेषज्ञ से मिलें। निकटतम अस्पताल खोज रहा हूँ..."
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার অবস্থান সনাক্ত করছি যাতে কাছের হাসপাতাল বা ক্লিনিক খুঁজে বের করা যায়।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সাহায্য করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা, ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং চেকআপের জন্য কাছের হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে পুনরায় বলুন।",
        "take_care": "ভাল থাকুন! প্রয়োজনে আমাকে জানান।",
        "checkup": "ভাল যত্নের জন্য একটি স্বাস্থ্য পরীক্ষা করার পরামর্শ দিচ্ছি।",
        "location_confirm": "বুঝেছি! নিকটস্থ হাসপাতাল ও ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "doctors_found": "আপনার পরিস্থিতির উপর ভিত্তি করে আমি যে ডাক্তার ও হাসপাতাল পেয়েছি:",
        "location_error": "আমি আপনার অবস্থান সনাক্ত করতে পারছি না। দয়া করে অবস্থানের অনুমতি দিন।",
        "switch_language": "ভাষা সফলভাবে পরিবর্তিত হয়েছে। এখন আমি কীভাবে সাহায্য করতে পারি?",
        "language_error": "দুঃখিত, আমি বর্তমানে শুধুমাত্র ইংরেজি, হিন্দি এবং বাংলা সমর্থন করি।",
        "ask_location": "অনুগ্রহ করে অবস্থান পরিষেবা সক্রিয় করুন যাতে আমি নিকটবর্তী হাসপাতালগুলি সুপারিশ করতে পারি।",
        "heart_disease": "হৃদরোগ সংক্রান্ত সমস্যার জন্য, একজন কার্ডিওলজিস্টের পরামর্শ নিন। কাছের হাসপাতালের তালিকা আনছি...",
        "bone_issue": "হাড়ের সমস্যার জন্য একজন অর্থোপেডিক বিশেষজ্ঞের সাথে যোগাযোগ করুন। কাছাকাছি হাসপাতাল খুঁজছি...",
        "nerve_issue": "স্নায়বিক সমস্যার জন্য একজন নিউরোলজিস্টের পরামর্শ নিন। কাছের হাসপাতালের সন্ধান করছি...",
        "cancer_issue": "ক্যান্সার রোগের জন্য অনকোলজিস্টের পরামর্শ নিন। কাছের হাসপাতালের তথ্য আনছি...",
        "skin_issue": "ত্বক সংক্রান্ত সমস্যার জন্য, একজন চর্মরোগ বিশেষজ্ঞের পরামর্শ নিন। নিকটবর্তী হাসপাতালের তালিকা আনছি..."
    }
};

// Available Languages
const languageOptions = {
    "english": "en",
    "hindi": "hi",
    "bengali": "bn"
};

// Default Language
let userLanguage = "en";

// Store User Specialty
let userSpecialty = "";

// Detect Health Issues and Respond
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
    "dermatology": "skin_issue"
};

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

// Switch Language Based on User Input
function switchLanguage(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (languageOptions[lowerCaseMessage]) {
        userLanguage = languageOptions[lowerCaseMessage];
        displayMessage(responses[userLanguage]["switch_language"], "bot");
        return true;
    }
    return false;
}

// Fetch Nearby Hospitals Based on User Location
function fetchNearbyHospitals(condition) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(responses[userLanguage][condition], "bot");
                displayMessage(`Fetching nearby hospitals for latitude: ${latitude}, longitude: ${longitude}...`, "bot");
            },
            () => {
                displayMessage(responses[userLanguage]["location_error"], "bot");
            }
        );
    } else {
        displayMessage(responses[userLanguage]["location_error"], "bot");
    }
}

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Handle language switching
    if (switchLanguage(userMessage)) {
        return;
    }

    // Check for disease or symptoms
    for (const [key, value] of Object.entries(healthConditions)) {
        if (userMessage.includes(key)) {
            fetchNearbyHospitals(value);
            return;
        }
    }

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Add Event Listeners
sendBtn.addEventListener("click", processUserInput);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processUserInput();
    }
});
