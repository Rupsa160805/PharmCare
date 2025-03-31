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
        "language_error": "Sorry, I currently support English, Hindi, and Bengali. Please choose one."
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
        "language_error": "मुझे क्षमा करें, फिलहाल मैं केवल अंग्रेजी, हिंदी, और बांग्ला में सहायता कर सकता हूँ।"
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
        "language_error": "দুঃখিত, আমি বর্তমানে শুধুমাত্র ইংরেজি, হিন্দি এবং বাংলা সমর্থন করি।"
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

// Switch Language Based on User Input
function switchLanguage(userMessage) {
    const selectedLanguage = userMessage.split(" ")[1]?.toLowerCase();
    if (languageOptions[selectedLanguage]) {
        userLanguage = languageOptions[selectedLanguage];
        displayMessage(responses[userLanguage]["switch_language"], "bot");
    } else {
        displayMessage(responses[userLanguage]["language_error"], "bot");
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

    // Handle language switching
    if (userMessage.startsWith("switch to")) {
        switchLanguage(userMessage);
    }
    // Handle basic responses
    else if (responses[userLanguage][userMessage]) {
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
