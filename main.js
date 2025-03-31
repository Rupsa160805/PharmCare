// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses in Multiple Languages
const responses = {
    "en": {
        "hello": "Hello! How may I assist you today? I can help you with finding nearby hospitals, clinics, or medical tests.",
        "location": "Please share your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals or clinics for medical tests and health checkups...",
        "confirm_lang": "You have selected English. Would you like to proceed in this language? (Yes/No)",
        "retry_lang": "Okay, please mention your preferred language again.",
        "feedback": "Did I help you find the information you were looking for? (Yes/No)",
        "thank_you": "You're welcome! I'm happy to assist you anytime. 😊",
        "sorry": "No worries at all! Let me know how I can assist you further. 😊",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ? मैं आपको अस्पताल, क्लिनिक या चिकित्सा परीक्षण खोजने में सहायता कर सकता हूँ।",
        "location": "कृपया अपना स्थान साझा करें ताकि हम निकटतम क्लिनिक या अस्पताल खोज सकें।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और स्वास्थ्य जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "confirm_lang": "आपने हिंदी का चयन किया है। क्या आप इस भाषा में जारी रखना चाहेंगे? (हाँ/नहीं)",
        "retry_lang": "ठीक है, कृपया अपनी पसंदीदा भाषा का फिर से उल्लेख करें।",
        "feedback": "क्या मैंने आपको आवश्यक जानकारी खोजने में सहायता की? (हाँ/नहीं)",
        "thank_you": "आपका स्वागत है! मुझे आपकी सहायता करके खुशी हुई। 😊",
        "sorry": "कोई बात नहीं। कृपया मुझे बताएं कि मैं आपकी कैसे सहायता कर सकता हूँ। 😊",
        "default": "मुझे क्षमा करें, मैंने समझा नहीं। कृपया दोबारा प्रयास करें।"
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি কীভাবে আপনার সহায়তা করতে পারি? আমি আপনাকে কাছাকাছি হাসপাতাল, ক্লিনিক বা স্বাস্থ্য পরীক্ষার জন্য সহায়তা করতে পারি।",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি আপনাকে বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং স্বাস্থ্য পরীক্ষার জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
        "confirm_lang": "আপনি বাংলা নির্বাচন করেছেন। আপনি কি এই ভাষায় চালিয়ে যেতে চান? (হ্যাঁ/না)",
        "retry_lang": "ঠিক আছে, অনুগ্রহ করে আবার আপনার পছন্দের ভাষার নাম উল্লেখ করুন।",
        "feedback": "আমি কি আপনাকে প্রয়োজনীয় তথ্য পেতে সাহায্য করতে পেরেছি? (হ্যাঁ/না)",
        "thank_you": "আপনাকে স্বাগতম! আমি আপনাকে সাহায্য করতে পেরে খুশি। 😊",
        "sorry": "কোন সমস্যা নেই। আমাকে জানান কীভাবে আমি সহায়তা করতে পারি। 😊",
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
let waitingForLangConfirmation = false;
let waitingForFeedback = false;

// Predefined List of Hospitals with Coordinates and Specialties
const hospitalData = [
    { name: "Apollo Hospital", address: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639, specialties: ["cardiology", "neurology", "orthopedics"] },
    { name: "Fortis Hospital", address: "Kolkata, West Bengal", lat: 22.5795, lng: 88.4336, specialties: ["oncology", "urology", "nephrology"] },
    { name: "AMRI Hospital", address: "Dhakuria, Kolkata", lat: 22.5124, lng: 88.3709, specialties: ["gastroenterology", "pulmonology", "cardiology"] },
    { name: "Ruby General Hospital", address: "Kolkata, West Bengal", lat: 22.5154, lng: 88.4076, specialties: ["orthopedics", "gynecology", "pediatrics"] },
    { name: "Narayana Hospital", address: "Howrah, West Bengal", lat: 22.5958, lng: 88.2636, specialties: ["cardiology", "oncology", "neurology"] }
];

// List of Recognized Diseases and Related Specialties
const diseaseSpecialties = {
    "heart": "cardiology",
    "cancer": "oncology",
    "kidney": "nephrology",
    "lungs": "pulmonology",
    "bone": "orthopedics",
    "brain": "neurology",
    "stomach": "gastroenterology",
    "women": "gynecology",
    "children": "pediatrics"
};

// Initial Greeting and Language Setup
function greetUser() {
    displayMessage(responses[userLanguage]["hello"], "bot");
    setTimeout(askForLanguage, 2000);
}

// Send Button Event Listener
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
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
    if (waitingForLangConfirmation) {
        handleLangConfirmation(userMessage);
        return;
    }

    if (waitingForFeedback) {
        handleFeedback(userMessage);
        return;
    }

    const disease = checkForDisease(userMessage);

    if (disease) {
        getLocationForHospitals(disease);
    } 
    else if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    } 
    else if (checkLanguage(userMessage)) {
        confirmLanguage(userMessage);
    } 
    else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("test")) {
        getLocationForHospitals();
    } 
    else if (userMessage.includes("thank") || userMessage.includes("thanks") || userMessage.includes("धन्यवाद") || userMessage.includes("ধন্যবাদ")) {
        displayMessage(responses[userLanguage]["thank_you"], "bot");
    } 
    else if (userMessage.includes("sorry") || userMessage.includes("apology") || userMessage.includes("माफ़ कीजिए") || userMessage.includes("দুঃখিত")) {
        displayMessage(responses[userLanguage]["sorry"], "bot");
    }
    else if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } 
    else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Handle Language Confirmation
function handleLangConfirmation(response) {
    if (response.includes("yes") || response.includes("हाँ") || response.includes("হ্যাঁ")) {
        displayMessage(responses[userLanguage]["hello"], "bot");
    } else {
        displayMessage(responses[userLanguage]["retry_lang"], "bot");
        askForLanguage();
    }
    waitingForLangConfirmation = false;
}

// Handle User Feedback
function handleFeedback(response) {
    if (response.includes("yes") || response.includes("हाँ") || response.includes("হ্যাঁ")) {
        displayMessage(
            userLanguage === "hi"
                ? "धन्यवाद! मुझे आपकी सहायता करके खुशी हुई।"
                : userLanguage === "bn"
                ? "ধন্যবাদ! আমি আপনাকে সাহায্য করতে পেরে খুশি।"
                : "Thank you! I'm happy to have helped. 😊",
            "bot"
        );
    } else {
        displayMessage(
            userLanguage === "hi"
                ? "मुझे खेद है कि मैं आपकी मदद नहीं कर सका।"
                : userLanguage === "bn"
                ? "দুঃখিত, আমি আপনাকে সহায়তা করতে পারিনি।"
                : "I'm sorry I couldn't assist you better. 😔",
            "bot"
        );
    }
    waitingForFeedback = false;
}

// Ask for Language Preference
function askForLanguage() {
    displayMessage(responses[userLanguage]["language"], "bot");
}

// Check if User Mentioned a Disease
function checkForDisease(message) {
    for (const disease in diseaseSpecialties) {
        if (message.includes(disease)) {
            return diseaseSpecialties[disease];
        }
    }
    return null;
}

// Confirm User's Preferred Language
function confirmLanguage(lang) {
    const langKey = languageOptions[lang];
    if (langKey) {
        userLanguage = langKey;
        waitingForLangConfirmation = true;
        displayMessage(responses[userLanguage]["confirm_lang"], "bot");
    } else {
        displayMessage("I'm sorry, that language is not supported yet.", "bot");
    }
}

// Get User Location for Hospitals/Clinics Based on Disease
function getLocationForHospitals(specialty = null) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(responses[userLanguage]["hospital"], "bot");
                findNearbyHospitals(latitude, longitude, specialty);
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

// Find Nearby Hospitals Based on User Location and Disease Specialty
function findNearbyHospitals(lat, lng, specialty = null) {
    let hospitalsWithDistance = hospitalData.map((hospital) => {
        const distance = calculateDistance(lat, lng, hospital.lat, hospital.lng);
        return { ...hospital, distance };
    });

    // Filter Hospitals Based on Specialty if Provided
    if (specialty) {
        hospitalsWithDistance = hospitalsWithDistance.filter((hospital) =>
            hospital.specialties.includes(specialty)
        );
    }

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    if (hospitalsWithDistance.length > 0) {
        const introMessage =
            specialty
                ? `Here are the hospitals specializing in ${specialty} near your location:`
                : "Here are the hospitals near your location:";

        displayMessage(introMessage, "bot");

        hospitalsWithDistance.slice(0, 3).forEach((hospital, index) => {
            displayMessage(
                `${index + 1}. ${hospital.name} - ${hospital.address} (${hospital.distance.toFixed(2)} km)`,
                "bot"
            );
        });

        setTimeout(() => {
            displayMessage(responses[userLanguage]["feedback"], "bot");
            waitingForFeedback = true;
        }, 3000);
    } else {
        displayMessage("No hospitals found near your location.", "bot");
    }
}

// Calculate Distance Between Two Points Using Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Greet User on Load
greetUser();
