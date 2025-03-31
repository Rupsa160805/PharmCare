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
        "hospital": "Searching for nearby hospitals or clinics for medical tests and health checkups...",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि हम निकटतम क्लिनिक या अस्पताल खोज सकें।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और स्वास्थ्य जांच के लिए निकटतम अस्पताल खोज रहा है...",
        "default": "मुझे क्षमा करें, मैंने समझा नहीं। कृपया दोबारा प्रयास करें।"
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি কীভাবে আপনার সহায়তা করতে পারি?",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি আপনাকে বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং স্বাস্থ্য পরীক্ষার জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
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

// Predefined List of Hospitals with Coordinates
const hospitalData = [
    { name: "Apollo Hospital", address: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639 },
    { name: "Fortis Hospital", address: "Kolkata, West Bengal", lat: 22.5795, lng: 88.4336 },
    { name: "AMRI Hospital", address: "Dhakuria, Kolkata", lat: 22.5124, lng: 88.3709 },
    { name: "Ruby General Hospital", address: "Kolkata, West Bengal", lat: 22.5154, lng: 88.4076 },
    { name: "Narayana Hospital", address: "Howrah, West Bengal", lat: 22.5958, lng: 88.2636 }
];

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
    // Check if the user is asking for nearby hospitals
    else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("test")) {
        getLocationForHospitals();
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

// Capitalize First Letter of Text
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get User Location for Hospitals/Clinics
function getLocationForHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(responses[userLanguage]["hospital"], "bot");
                findNearbyHospitals(latitude, longitude);
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

// Find Nearby Hospitals Based on User Location (Haversine Formula)
function findNearbyHospitals(lat, lng) {
    const hospitalsWithDistance = hospitalData.map((hospital) => {
        const distance = calculateDistance(lat, lng, hospital.lat, hospital.lng);
        return { ...hospital, distance };
    });

    // Sort Hospitals by Distance
    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    if (hospitalsWithDistance.length > 0) {
        displayMessage(
            userLanguage === "hi"
                ? "आपके स्थान के पास निम्नलिखित अस्पताल मिले:"
                : userLanguage === "bn"
                ? "আপনার অবস্থানের নিকটে নিম্নলিখিত হাসপাতালগুলি পাওয়া গেছে:"
                : "Here are the hospitals near your location:",
            "bot"
        );

        hospitalsWithDistance.slice(0, 3).forEach((hospital, index) => {
            displayMessage(`${index + 1}. ${hospital.name} - ${hospital.address} (${hospital.distance.toFixed(2)} km)`, "bot");
        });
    } else {
        displayMessage(
            userLanguage === "hi"
                ? "कोई अस्पताल नहीं मिला।"
                : userLanguage === "bn"
                ? "কোনো হাসপাতাল পাওয়া যায়নি।"
                : "No hospitals found near your location.",
            "bot"
        );
    }
}

// Calculate Distance Between Two Coordinates Using Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
