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
        "language_changed": "Language changed successfully. How can I assist you now?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! आप कैसे हैं?",
        "thanks": "आपका स्वागत है! अगर कोई और सहायता चाहिए तो बताएं।",
        "thank you": "धन्यवाद! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे मदद कर सकता हूँ?",
        "location": "मैं आपके स्थान का पता लगा रहा हूँ ताकि पास के क्लिनिक या अस्पताल की जानकारी दे सकूँ।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप कौनसी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली, आदि)",
        "hospital": "चिकित्सा परीक्षण और चेकअप के लिए पास के अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूँ।",
        "default": "मुझे खेद है, मैं समझ नहीं पाया। कृपया पुनः प्रयास करें।",
        "take_care": "अपना ध्यान रखें! यदि आपको किसी सहायता की आवश्यकता हो तो मुझे बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको परामर्श के साथ स्वास्थ्य जांच कराने पर विचार करना चाहिए।",
        "location_confirm": "समझ गया! अब मैं आपके आस-पास के अस्पतालों और क्लीनिक की जानकारी ला रहा हूँ।",
        "doctors_found": "यहाँ आपके रोग के अनुसार निकटतम डॉक्टर और अस्पताल हैं:",
        "location_error": "मैं आपका स्थान पता नहीं कर सका। कृपया स्थान की अनुमति दें।",
        "language_changed": "भाषा सफलतापूर्वक बदल दी गई है। अब मैं आपकी कैसे सहायता कर सकता हूँ?"
    },
    "bn": {
        "hello": "নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আপনি কেমন আছেন?",
        "thanks": "আপনাকে স্বাগতম! আরও কিছু দরকার হলে জানাবেন।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "location": "আমি আপনার বর্তমান অবস্থান অনুসন্ধান করছি যাতে নিকটস্থ ক্লিনিক বা হাসপাতাল খুঁজে দিতে পারি।",
        "clinic": "আমি আপনার অবস্থানের কাছাকাছি ক্লিনিক অনুসন্ধান করছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা, ইত্যাদি)",
        "hospital": "মেডিকেল টেস্ট এবং চেকআপের জন্য কাছাকাছি হাসপাতাল অনুসন্ধান করছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি সঠিক ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
        "take_care": "নিজের যত্ন নিন! আপনার আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "checkup": "ভাল যত্নের জন্য পরামর্শের সাথে স্বাস্থ্য পরীক্ষা করার কথা ভাবুন।",
        "location_confirm": "বুঝেছি! আমি এখন কাছাকাছি হাসপাতাল ও ক্লিনিক খুঁজছি।",
        "doctors_found": "এখানে আপনার রোগ অনুযায়ী নিকটস্থ ডাক্তার এবং হাসপাতালগুলি রয়েছে:",
        "location_error": "আমি আপনার অবস্থান নির্ধারণ করতে পারছি না। অনুগ্রহ করে অবস্থান অনুমতি দিন।",
        "language_changed": "ভাষা সফলভাবে পরিবর্তিত হয়েছে। এখন আমি কীভাবে আপনাকে সাহায্য করতে পারি?"
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
            "orthopedics": "Dr. Rakesh Gupta (Orthopedic Surgeon)",
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
            "orthopedics": "Dr. Kunal Roy (Orthopedic Specialist)",
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

// Bot Speech Function
function speakResponse(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    if (userLanguage === "hi") {
        utterance.lang = "hi-IN";
    } else if (userLanguage === "bn") {
        utterance.lang = "bn-IN";
    } else {
        utterance.lang = "en-US";
    }
    speechSynthesis.speak(utterance);
}

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom

    // Speak bot response
    if (sender === "bot") {
        speakResponse(message);
    }
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
        if (hospital.specialties.includes(userSpecialty.toLowerCase())) {
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

// Change Bot Language
function changeLanguage(userMessage) {
    const detectedLang = Object.keys(languageOptions).find((lang) =>
        userMessage.includes(lang.toLowerCase())
    );

    if (detectedLang) {
        userLanguage = languageOptions[detectedLang];
        displayMessage(responses[userLanguage]["language_changed"], "bot");
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
        displayMessage(`Got it! You may need to see a specialist in *${userSpecialty}*.`, "bot");
        getUserLocation(); // Automatically get location to suggest nearby doctors
    } else {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
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
