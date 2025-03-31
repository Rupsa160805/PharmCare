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
        "language_changed": "Language changed successfully! How can I assist you now?"
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
        "hi": "नमस्ते! आपकी क्या सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! यदि आपको और सहायता की आवश्यकता हो तो बताएं।",
        "thank you": "धन्यवाद! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "मैं निकटतम क्लिनिक या अस्पताल खोजने के लिए आपका स्थान प्राप्त कर रहा हूँ।",
        "clinic": "कृपया प्रतीक्षा करें, मैं आपके स्थान के निकट क्लिनिक खोज रहा हूँ...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा में बात करना पसंद करेंगे? (अंग्रेजी, हिंदी, बांग्ला, आदि)",
        "hospital": "चिकित्सा परीक्षण और जांच के लिए निकटतम अस्पतालों की खोज कर रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उचित डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "मुझे खेद है, मैं समझ नहीं पाया। कृपया पुनः प्रयास करें।",
        "take_care": "ध्यान रखें! यदि आपको और सहायता की आवश्यकता हो तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको परामर्श के साथ स्वास्थ्य जांच कराने पर विचार करना चाहिए।",
        "location_confirm": "समझ गया! मैं अभी निकटतम अस्पताल और क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "doctors_found": "यहाँ आपके लक्षणों के अनुसार डॉक्टर और अस्पताल हैं:",
        "location_error": "मुझे आपका स्थान प्राप्त करने में असमर्थता हो रही है। कृपया स्थान एक्सेस की अनुमति दें।",
        "language_changed": "भाषा सफलतापूर्वक बदल गई! अब मैं आपकी कैसे सहायता कर सकता हूँ?"
    },
    "bn": {
        "hello": "নমস্কার! আজ আমি কিভাবে সাহায্য করতে পারি?",
        "hi": "হ্যালো! কিভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আমি নিকটতম ক্লিনিক বা হাসপাতাল খুঁজে বের করার জন্য আপনার অবস্থান সনাক্ত করছি।",
        "clinic": "আপনার অবস্থানের নিকট ক্লিনিক খুঁজছি। একটু অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা, ইত্যাদি)",
        "hospital": "চিকিৎসার জন্য নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণগুলি উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল পরামর্শ দিতে পারি।",
        "default": "আমি দুঃখিত, আমি বুঝতে পারিনি। দয়া করে আবার চেষ্টা করুন।",
        "take_care": "নিজের যত্ন নিন! আরও সাহায্যের প্রয়োজন হলে জানান।",
        "checkup": "ভাল স্বাস্থ্য পরীক্ষার জন্য আপনাকে ডাক্তারি পরামর্শ নিতে হবে।",
        "location_confirm": "বুঝেছি! আমি নিকটস্থ হাসপাতাল এবং ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "doctors_found": "আপনার সমস্যার জন্য উপযুক্ত ডাক্তার ও হাসপাতাল এখানে রয়েছে:",
        "location_error": "আপনার অবস্থান সনাক্ত করতে ব্যর্থ হয়েছি। অনুগ্রহ করে অবস্থানের অনুমতি দিন।",
        "language_changed": "ভাষা সফলভাবে পরিবর্তিত হয়েছে! এখন আমি কিভাবে সাহায্য করতে পারি?"
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
            "cardiology": { name: "Dr. Anil Sharma", designation: "Cardiologist" },
            "orthopedics": { name: "Dr. Rakesh Gupta", designation: "Orthopedic Surgeon" },
            "neurology": { name: "Dr. Rajeev Nair", designation: "Neurologist" },
            "dermatology": { name: "Dr. Priya Mukherjee", designation: "Dermatologist" }
        },
        coordinates: { lat: 22.5726, lon: 88.3639 }
    },
    {
        name: "Fortis Hospital",
        address: "Rajarhat, Kolkata",
        specialties: ["cardiology", "cancer", "gastroenterology"],
        doctors: {
            "cardiology": { name: "Dr. Suresh Patel", designation: "Cardiologist" },
            "cancer": { name: "Dr. Pooja Mehta", designation: "Oncologist" },
            "gastroenterology": { name: "Dr. Alok Sen", designation: "Gastroenterologist" }
        },
        coordinates: { lat: 22.5958, lon: 88.4791 }
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
            const doctor = hospital.doctors[userSpecialty];
            response += `🏥 *${hospital.name}*\n📍 ${hospital.address}\n👩‍⚕️ ${doctor.name}, ${doctor.designation}\n📏 Distance: ${hospital.distance.toFixed(2)} km\n\n`;
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
        displayMessage(`${responses[userLanguage]["location_confirm"]}`, "bot");
        getUserLocation(); // Automatically get location to suggest nearby doctors
    } else {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    }
}

// Change Language
function changeLanguage(userMessage) {
    const selectedLanguage = Object.keys(languageOptions).find((lang) =>
        userMessage.includes(lang.toLowerCase())
    );

    if (selectedLanguage) {
        userLanguage = languageOptions[selectedLanguage];
        displayMessage(responses[userLanguage]["language_changed"], "bot");
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
