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
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with a consultation for better care.",
        "location_confirm": "Got it! I'm fetching nearby hospitals and clinics now. Please wait a moment...",
        "doctors_found": "Here are the doctors and hospitals I found based on your condition:",
        "location_error": "I'm unable to retrieve your location. Please allow location access."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी आज किस प्रकार सहायता कर सकता हूँ?",
        "hi": "नमस्ते! आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "स्वागत है! अगर और मदद चाहिए तो बताएं।",
        "thank you": "धन्यवाद! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं किस प्रकार सहायता कर सकता हूँ?",
        "location": "मैं आपके स्थान के अनुसार निकटतम क्लिनिक या अस्पताल खोज रहा हूँ।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली)",
        "hospital": "चिकित्सा परीक्षण और जांच के लिए नज़दीकी अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उचित डॉक्टर और अस्पताल की सिफारिश कर सकूं।",
        "default": "मुझे समझ नहीं आया। क्या आप इसे दोहरा सकते हैं?",
        "take_care": "अपना ध्यान रखें! जरूरत हो तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए परामर्श के साथ स्वास्थ्य परीक्षण की योजना बनाएं।",
        "location_confirm": "समझ गया! अब मैं आपके पास के अस्पताल और क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "doctors_found": "यहाँ आपकी स्थिति के आधार पर डॉक्टर और अस्पताल हैं:",
        "location_error": "मैं आपका स्थान प्राप्त नहीं कर सका। कृपया स्थान पहुंच की अनुमति दें।"
    },
    "bn": {
        "hello": "নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "হ্যালো! আপনাকে কীভাবে সাহায্য করতে পারি?",
        "thanks": "স্বাগতম! আরও সহায়তার প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আমি আপনার বর্তমান অবস্থান থেকে নিকটতম ক্লিনিক বা হাসপাতাল খুঁজছি।",
        "clinic": "আমি আপনার কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা)",
        "hospital": "মেডিকেল টেস্ট এবং চেকআপের জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা উপসর্গের কথা বলুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতালের পরামর্শ দিতে পারি।",
        "default": "আমি বুঝতে পারিনি। দয়া করে আবার বলুন।",
        "take_care": "নিজের যত্ন নিন! যদি কোনো সাহায্যের প্রয়োজন হয়, আমাকে জানান।",
        "checkup": "ভালো যত্নের জন্য পরামর্শের পাশাপাশি স্বাস্থ্য পরীক্ষা করার পরামর্শ দিচ্ছি।",
        "location_confirm": "বোঝা গেছে! এখন আমি নিকটস্থ হাসপাতাল ও ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "doctors_found": "আপনার অবস্থা অনুযায়ী আমি খুঁজে পাওয়া চিকিৎসক ও হাসপাতালগুলি এখানে:",
        "location_error": "আপনার অবস্থান উদ্ধার করতে পারছি না। দয়া করে অবস্থান অ্যাক্সেস অনুমতি দিন।"
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

// Dummy Data for Hospitals and Doctors with Coordinates
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Salt Lake, Kolkata",
        specialties: ["cardiology", "orthopedics", "neurology", "dermatology"],
        doctors: {
            "cardiology": "Dr. Anil Sharma (Cardiologist)",
            "orthopedics": "Dr. Rakesh Gupta (Orthopedic Specialist)",
            "neurology": "Dr. Rajeev Nair (Neurologist)",
            "dermatology": "Dr. Priya Mukherjee (Dermatologist)"
        },
        coordinates: { lat: 22.5726, lon: 88.3639 }
    },
    {
        name: "Fortis Hospital",
        address: "Rajarhat, Kolkata",
        specialties: ["cardiology", "cancer", "gastroenterology"],
        doctors: {
            "cardiology": "Dr. Suresh Patel (Cardiologist)",
            "cancer": "Dr. Pooja Mehta (Oncologist)",
            "gastroenterology": "Dr. Alok Sen (Gastroenterologist)"
        },
        coordinates: { lat: 22.5958, lon: 88.4791 }
    },
    {
        name: "Medica Super Specialty Hospital",
        address: "Mukundapur, Kolkata",
        specialties: ["orthopedics", "neurology", "cancer"],
        doctors: {
            "orthopedics": "Dr. Kunal Roy (Orthopedic Surgeon)",
            "neurology": "Dr. Amit Dutta (Neurologist)",
            "cancer": "Dr. Ananya Basu (Oncologist)"
        },
        coordinates: { lat: 22.5018, lon: 88.3966 }
    }
];

// Disease-to-Specialty Mapping
const diseaseKeywords = {
    "heart": "cardiology",
    "cardiology": "cardiology",
    "cancer": "cancer",
    "brain": "neurology",
    "nerves": "neurology",
    "neurology": "neurology",
    "bones": "orthopedics",
    "orthopedic": "orthopedics",
    "stomach": "gastroenterology",
    "gastro": "gastroenterology",
    "skin": "dermatology",
    "checkup": "general checkup"
};

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

// Get User's Live Location Using Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        displayMessage(responses[userLanguage]["location"], "bot");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                findNearestDoctors(latitude, longitude);
            },
            () => {
                displayMessage(responses[userLanguage]["location_error"], "bot");
            }
        );
    } else {
        displayMessage(responses[userLanguage]["location_error"], "bot");
    }
}

// Haversine Formula to Calculate Distance Between Two Points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Find Nearest Hospitals and Suggest Doctors Based on User's Location
function findNearestDoctors(userLat, userLon) {
    let nearbyHospitals = [];

    hospitalData.forEach((hospital) => {
        if (
            hospital.specialties.includes(userSpecialty.toLowerCase())
        ) {
            const distance = calculateDistance(
                userLat,
                userLon,
                hospital.coordinates.lat,
                hospital.coordinates.lon
            );
            nearbyHospitals.push({ ...hospital, distance });
        }
    });

    // Sort hospitals by distance (nearest first)
    nearbyHospitals.sort((a, b) => a.distance - b.distance);

    if (nearbyHospitals.length > 0) {
        let response = `${responses[userLanguage]["doctors_found"]}\n\n`;
        nearbyHospitals.forEach((hospital) => {
            response += `🏥 *${hospital.name}*\n📍 ${hospital.address}\n👩‍⚕️ Doctor: ${hospital.doctors[userSpecialty]}\n📏 Distance: ${hospital.distance.toFixed(2)} km\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Check for Disease or Symptoms and Suggest Specialty
function checkForDisease(userMessage) {
    const matchedDisease = Object.keys(diseaseKeywords).find((disease) =>
        userMessage.includes(disease.toLowerCase())
    );

    if (matchedDisease) {
        userSpecialty = diseaseKeywords[matchedDisease];
        displayMessage(`✅ ${responses[userLanguage]["location_confirm"]}`, "bot");
        getUserLocation(); // Automatically get location to suggest nearby doctors
    } else {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    }
}

// Switch Language
function changeLanguage(userMessage) {
    const selectedLanguage = Object.keys(languageOptions).find((lang) =>
        userMessage.includes(lang.toLowerCase())
    );
    if (selectedLanguage) {
        userLanguage = languageOptions[selectedLanguage];
        displayMessage(
            responses[userLanguage]["language"],
            "bot"
        );
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Check for language change
    else if (userMessage.includes("language")) {
        changeLanguage(userMessage);
    }
    // Check for disease/specialty and get live location
    else {
        checkForDisease(userMessage);
    }
}

// Add Event Listeners
sendBtn.addEventListener("click", processUserInput);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processUserInput();
    }
});
