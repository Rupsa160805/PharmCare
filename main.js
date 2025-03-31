// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses in Multiple Languages
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "location": "Please share your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि हम निकटतम क्लिनिक या अस्पताल खोज सकें।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "default": "मुझे क्षमा करें, मैंने समझा नहीं। कृपया दोबारा प्रयास करें।"
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি কীভাবে আপনার সহায়তা করতে পারি?",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি আপনাকে বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
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

// Doctor and Hospital Data Based on Symptoms/Problems
const doctorRecommendations = {
    "fever": {
        "doctors": ["Dr. Amit Gupta", "Dr. Riya Das"],
        "hospitals": ["Care Plus Hospital", "XYZ Medical Center"]
    },
    "cough": {
        "doctors": ["Dr. Rajesh Sharma", "Dr. Priya Sen"],
        "hospitals": ["Apollo Clinic", "MediCare Hospital"]
    },
    "diabetes": {
        "doctors": ["Dr. Anirban Mukherjee", "Dr. Sneha Roy"],
        "hospitals": ["Diabetes Care Center", "Endocrine Hospital"]
    },
    "heart": {
        "doctors": ["Dr. Arjun Malhotra", "Dr. Neha Kapoor"],
        "hospitals": ["Fortis Heart Institute", "Max Super Specialty Hospital"]
    }
};

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");

        // Process User Input
        processInput(userMessage.toLowerCase());
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
    // Check if user wants to change language
    if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    } 
    // Check if the user is mentioning a specific language
    else if (checkLanguage(userMessage)) {
        setLanguage(userMessage);
    } 
    // Check if the user is sharing a symptom/problem
    else if (checkSymptoms(userMessage)) {
        recommendDoctors(userMessage);
    } 
    // Handle predefined responses based on language
    else if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } 
    // Default fallback
    else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Check if the User Mentioned a Language
function checkLanguage(message) {
    const languages = Object.keys(languageOptions);
    for (const lang of languages) {
        if (message.includes(lang)) {
            return lang;
        }
    }
    return false;
}

// Set User's Preferred Language
function setLanguage(lang) {
    const langKey = languageOptions[lang];
    if (langKey) {
        userLanguage = langKey;
        displayMessage(`✅ ${capitalizeFirstLetter(lang)} selected. I will assist you in this language now.`, "bot");
        displayMessage(responses[userLanguage]["hello"], "bot"); // Greeting in selected language
    } else {
        displayMessage("I'm sorry, I don't support that language yet. Continuing in English.", "bot");
    }
}

// Ask for Preferred Language
function askForLanguage() {
    displayMessage(responses[userLanguage]["language"], "bot");
}

// Check for Symptoms/Problem in User Input
function checkSymptoms(message) {
    const symptoms = Object.keys(doctorRecommendations);
    for (const symptom of symptoms) {
        if (message.includes(symptom)) {
            return symptom;
        }
    }
    return false;
}

// Recommend Doctors and Hospitals Based on Symptoms
function recommendDoctors(message) {
    const symptom = checkSymptoms(message);
    if (symptom) {
        const recommendation = doctorRecommendations[symptom];
        displayMessage(
            userLanguage === "hi"
                ? "आपके लक्षणों के आधार पर, मैं निम्नलिखित डॉक्टरों से परामर्श करने की सलाह देता हूँ:"
                : userLanguage === "bn"
                ? "আপনার লক্ষণগুলির উপর ভিত্তি করে, আমি নিম্নলিখিত ডাক্তারদের সাথে পরামর্শ করার পরামর্শ দিচ্ছি:"
                : "Based on your symptoms, I recommend consulting the following doctors:",
            "bot"
        );

        recommendation.doctors.forEach((doctor, index) => {
            displayMessage(`${index + 1}. ${doctor} - Available at ${recommendation.hospitals[index]}`, "bot");
        });
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Capitalize First Letter of Text
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(`📍 Searching for clinics near (${latitude}, ${longitude})...`, "bot");
                findClinics(latitude, longitude);
            },
            () => {
                displayMessage(
                    userLanguage === "hi"
                        ? "स्थान सेवाएं सक्षम करें।"
                        : userLanguage === "bn"
                        ? "অবস্থান পরিষেবা সক্ষম করুন।"
                        : "Please enable location services.",
                    "bot"
                );
            }
        );
    } else {
        displayMessage(
            userLanguage === "hi"
                ? "यह ब्राउज़र स्थान सेवाओं का समर्थन नहीं करता।"
                : userLanguage === "bn"
                ? "এই ব্রাউজার অবস্থান পরিষেবা সমর্থন করে না।"
                : "Geolocation is not supported by this browser.",
            "bot"
        );
    }
}

// Dummy Function to Find Clinics (Add API later)
function findClinics(lat, lng) {
    setTimeout(() => {
        displayMessage(
            userLanguage === "hi"
                ? "आपके स्थान के पास 3 क्लिनिक मिले।"
                : userLanguage === "bn"
                ? "আপনার অবস্থানের নিকটে ৩টি ক্লিনিক পাওয়া গেছে।"
                : "Found 3 clinics near your location. Check the list below:",
            "bot"
        );
        displayMessage("1. ABC Diagnostics\n2. XYZ Medical Center\n3. Care Plus Hospital", "bot");
    }, 2000);
}
