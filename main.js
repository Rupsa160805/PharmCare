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
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "hi": "हाय! मैं आपकी किस प्रकार मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! अगर आपको और सहायता चाहिए तो बताएं।",
        "thank you": "कोई बात नहीं! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि हम निकटतम क्लिनिक या अस्पताल खोज सकें।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और स्वास्थ्य जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उचित अस्पताल सुझा सकूँ।",
        "default": "मुझे क्षमा करें, मैंने समझा नहीं। कृपया दोबारा प्रयास करें।"
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি কীভাবে আপনার সহায়তা করতে পারি?",
        "hi": "হাই! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "thanks": "আপনাকে স্বাগতম! যদি আরও সহায়তা লাগে, আমাকে জানান।",
        "thank you": "আপনাকে স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কিভাবে সাহায্য করতে পারি?",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি আপনাকে বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং স্বাস্থ্য পরীক্ষার জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
        "ask_disease": "অনুগ্রহ করে আপনার রোগ বা লক্ষণগুলি বলুন যাতে আমি উপযুক্ত হাসপাতাল সুপারিশ করতে পারি।",
        "default": "আমি দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে আবার বলুন।"
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

// Predefined List of Hospitals
const hospitalData = [
    { name: "Apollo Hospital", address: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639, specialties: ["cardiology", "orthopedics", "neurology"] },
    { name: "Fortis Hospital", address: "Kolkata, West Bengal", lat: 22.5795, lng: 88.4336, specialties: ["cancer", "cardiology", "gastroenterology"] },
    { name: "AMRI Hospital", address: "Dhakuria, Kolkata", lat: 22.5124, lng: 88.3709, specialties: ["orthopedics", "neurology", "urology"] },
    { name: "Ruby General Hospital", address: "Kolkata, West Bengal", lat: 22.5154, lng: 88.4076, specialties: ["diabetes", "gynecology", "pulmonology"] }
];

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
        processInput(userMessage);
        userInput.value = "";
    }
});

// Display Chat Message
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Process User Input and Generate Response
function processInput(userMessage) {
    if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    } else if (checkLanguage(userMessage)) {
        setLanguage(userMessage);
    } else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("test")) {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    } else if (userMessage in responses[userLanguage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Check if User Mentioned a Language
function checkLanguage(message) {
    return Object.keys(languageOptions).find(lang => message.includes(lang)) || false;
}

// Set User's Preferred Language
function setLanguage(lang) {
    const langKey = languageOptions[lang];
    if (langKey) {
        userLanguage = langKey;
        displayMessage(`✅ ${capitalizeFirstLetter(lang)} selected.`, "bot");
        displayMessage(responses[userLanguage]["hello"], "bot");
    } else {
        displayMessage("I'm sorry, I don't support that language yet. Continuing in English.", "bot");
    }
}

// Ask for Preferred Language
function askForLanguage() {
    displayMessage(responses[userLanguage]["language"], "bot");
}

// Capitalize First Letter of Text
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Find Suitable Hospitals Based on Disease
function findHospitalsForDisease(disease) {
    const recommendedHospitals = hospitalData.filter(hospital =>
        hospital.specialties.some(specialty => disease.includes(specialty))
    );

    if (recommendedHospitals.length > 0) {
        displayMessage("Here are some hospitals specializing in your condition:", "bot");
        recommendedHospitals.forEach(hospital => {
            displayMessage(`${hospital.name} - ${hospital.address}`, "bot");
        });
    } else {
        displayMessage("I'm sorry, I couldn't find a hospital for that condition.", "bot");
    }
}
