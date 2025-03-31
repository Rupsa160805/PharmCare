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
        "location_error": "I'm unable to retrieve your location. Please allow location access."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
        "hi": "नमस्ते! मैं आपकी सहायता कैसे कर सकता हूँ?",
        "thanks": "आपका स्वागत है! किसी भी और सहायता की आवश्यकता हो तो बताएं।",
        "thank you": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "मैं आपके निकटतम क्लिनिक या अस्पताल को खोजने के लिए आपका स्थान प्राप्त कर रहा हूँ।",
        "clinic": "मैं आपके स्थान के निकट क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और चेकअप के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उचित डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "मुझे खेद है, मैं इसे समझ नहीं पाया। कृपया पुनः प्रयास करें।",
        "take_care": "ध्यान रखें! यदि आपको किसी भी सहायता की आवश्यकता हो तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको स्वास्थ्य जांच करवानी चाहिए।",
        "location_confirm": "समझ गया! अब मैं निकटतम अस्पताल और क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "doctors_found": "आपकी स्थिति के अनुसार मुझे ये डॉक्टर और अस्पताल मिले हैं:",
        "location_error": "मैं आपका स्थान प्राप्त नहीं कर सका। कृपया स्थान अनुमति दें।"
    },
    "bn": {
        "hello": "হ্যালো! আমি কিভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি কিভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও কোনো সহায়তার প্রয়োজন হলে জানান।",
        "thank you": "আপনার স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কিভাবে সাহায্য করতে পারি?",
        "location": "আমি আপনার অবস্থান থেকে নিকটতম ক্লিনিক বা হাসপাতাল খুঁজছি।",
        "clinic": "আমি আপনার নিকটবর্তী ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "মেডিকেল টেস্ট এবং চেকআপের জন্য নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা উপসর্গের নাম বলুন, যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সাজেস্ট করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। অনুগ্রহ করে আবার বলুন।",
        "take_care": "সাবধান থাকুন! যদি সহায়তার প্রয়োজন হয়, আমাকে জানান।",
        "checkup": "ভাল যত্নের জন্য আপনাকে স্বাস্থ্য পরীক্ষার সময় নির্ধারণ করা উচিত।",
        "location_confirm": "বুঝেছি! এখন আমি নিকটবর্তী হাসপাতাল ও ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "doctors_found": "আপনার সমস্যার উপর ভিত্তি করে এখানে কিছু ডাক্তার ও হাসপাতাল পাওয়া গেছে:",
        "location_error": "আমি আপনার অবস্থান খুঁজে পেতে পারিনি। দয়া করে অবস্থান অনুমতি দিন।"
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
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "neurology", "dermatology"],
        doctors: {
            "cardiology": "Dr. Anil Sharma",
            "orthopedics": "Dr. Rakesh Gupta",
            "neurology": "Dr. Rajeev Nair",
            "dermatology": "Dr. Priya Mukherjee"
        },
        coordinates: { lat: 22.5726, lon: 88.3639 }
    },
    {
        name: "Fortis Hospital",
        address: "Rajarhat, Kolkata",
        location: "kolkata",
        specialties: ["cardiology", "cancer", "gastroenterology"],
        doctors: {
            "cardiology": "Dr. Suresh Patel",
            "cancer": "Dr. Pooja Mehta",
            "gastroenterology": "Dr. Alok Sen"
        },
        coordinates: { lat: 22.5958, lon: 88.4791 }
    },
    {
        name: "Medica Super Specialty Hospital",
        address: "Mukundapur, Kolkata",
        location: "kolkata",
        specialties: ["orthopedics", "neurology", "cancer"],
        doctors: {
            "orthopedics": "Dr. Kunal Roy",
            "neurology": "Dr. Amit Dutta",
            "cancer": "Dr. Ananya Basu"
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

// Detect Language Switch Requests
function detectLanguageSwitch(userMessage) {
    if (userMessage.includes("hindi") || userMessage.includes("हिंदी")) {
        userLanguage = "hi";
        displayMessage("ठीक है! अब मैं हिंदी में आपकी सहायता करूंगा।", "bot");
        return true;
    } else if (userMessage.includes("bengali") || userMessage.includes("bangla") || userMessage.includes("বাংলা")) {
        userLanguage = "bn";
        displayMessage("ঠিক আছে! এখন থেকে আমি বাংলায় কথা বলব।", "bot");
        return true;
    } else if (userMessage.includes("english") || userMessage.includes("अंग्रेजी") || userMessage.includes("ইংরেজি")) {
        userLanguage = "en";
        displayMessage("Okay! I will now assist you in English.", "bot");
        return true;
    }
    return false;
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

// Find Nearest Hospitals Based on User's Location and Specialty
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
            response += `${hospital.name} - ${hospital.address}\n${responses[userLanguage]["hospital"]}: ${hospital.doctors[userSpecialty]}\n${responses[userLanguage]["location_confirm"]}: ${hospital.distance.toFixed(2)} km\n\n`;
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

    // Detect language switch
    if (detectLanguageSwitch(userMessage)) {
        return;
    }

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
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
