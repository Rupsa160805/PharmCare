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
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    },
    "bn": {
        "hello": "হ্যালো! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনাকে স্বাগতম! যদি আরও সাহায্য লাগে জানাবেন।",
        "thank you": "আপনাকে স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান জানান।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খোঁজা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষায় কথা বলতে চান? (ইংরেজি, হিন্দি, বাংলা)",
        "hospital": "চিকিৎসা পরীক্ষার জন্য কাছাকাছি হাসপাতাল খোঁজা হচ্ছে...",
        "ask_disease": "অনুগ্রহ করে আপনার রোগ বা উপসর্গ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে আবার বলুন।",
        "take_care": "ভাল থাকুন! যদি সহায়তা প্রয়োজন হয়, জানান।",
        "checkup": "ভাল চিকিৎসার জন্য একটি স্বাস্থ্য পরীক্ষা এবং পরামর্শ করার কথা ভাবতে পারেন।",
        "location_confirm": "পেয়েছি! আপনার অবস্থানের কাছাকাছি হাসপাতাল ও ক্লিনিক খোঁজা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন..."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! आपको कैसे मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! यदि आपको और सहायता की आवश्यकता हो तो बताएं।",
        "thank you": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "कृपया निकटतम क्लिनिक या अस्पताल खोजने के लिए अपना स्थान साझा करें।",
        "clinic": "आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा में बात करना चाहते हैं? (अंग्रेजी, हिंदी, बंगाली)",
        "hospital": "चिकित्सा परीक्षण और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षणों का उल्लेख करें ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "माफ करें, मैंने समझा नहीं। क्या आप दोहरा सकते हैं?",
        "take_care": "ख्याल रखें! यदि आपको सहायता की आवश्यकता हो तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको परामर्श और स्वास्थ्य जांच करवानी चाहिए।",
        "location_confirm": "समझ गया! आपके स्थान के पास अस्पताल और क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें..."
    }
};

// Available Languages
const languageOptions = {
    "english": "en",
    "hindi": "hi",
    "bengali": "bn",
    "bangla": "bn",
    "हिंदी": "hi",
    "বাংলা": "bn"
};

// Default Language
let userLanguage = "en";

// Store User Location and Specialty
let userLocation = "";
let userSpecialty = "";

// Predefined List of Hospitals and Doctors
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. R. Sharma (Heart Specialist)",
            "orthopedics": "Dr. A. Das (Bone Specialist)",
            "neurology": "Dr. M. Roy (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cancer", "cardiology", "gastroenterology"],
        doctors: {
            "cancer": "Dr. P. Mehta (Cancer Specialist)",
            "cardiology": "Dr. S. Ghosh (Heart Specialist)",
            "gastroenterology": "Dr. B. Kumar (Stomach Specialist)"
        }
    },
    {
        name: "Narayana Hospital",
        address: "Delhi, India",
        location: "delhi",
        specialties: ["cardiology", "cancer", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. P. Rao (Heart Specialist)",
            "cancer": "Dr. R. Iyer (Cancer Specialist)",
            "neurology": "Dr. M. Singh (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Medanta Hospital",
        address: "Gurgaon, Haryana",
        location: "gurgaon",
        specialties: ["orthopedics", "cardiology", "neurology"],
        doctors: {
            "orthopedics": "Dr. A. Verma (Bone Specialist)",
            "cardiology": "Dr. K. Malhotra (Heart Specialist)",
            "neurology": "Dr. S. Kapoor (Nerve/Brain Specialist)"
        }
    }
];

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

// Detect Language and Update Bot Response Language
function detectLanguage(userMessage) {
    const matchedLanguage = Object.keys(languageOptions).find((lang) =>
        userMessage.includes(lang.toLowerCase())
    );

    if (matchedLanguage) {
        userLanguage = languageOptions[matchedLanguage];
        displayMessage(
            `✅ Language switched to ${matchedLanguage.charAt(0).toUpperCase() + matchedLanguage.slice(1)}.`,
            "bot"
        );
        return true;
    }
    return false;
}

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(
        (hospital) =>
            hospital.location.toLowerCase() === location.toLowerCase() &&
            hospital.specialties.map((s) => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = `${responses[userLanguage]["location_confirm"]}\n\n`;
        matchingHospitals.forEach((hospital) => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage(
            `⚠️ Sorry, no hospitals with ${specialty} services were found near ${location}.`,
            "bot"
        );
    }
}

// Detect and Suggest Hospitals Based on Symptoms
function detectSpecialtyFromSymptoms(userMessage) {
    if (userMessage.includes("heart") || userMessage.includes("chest pain")) return "cardiology";
    if (userMessage.includes("cancer") || userMessage.includes("tumor")) return "cancer";
    if (userMessage.includes("bones") || userMessage.includes("fracture")) return "orthopedics";
    if (userMessage.includes("nerves") || userMessage.includes("headache")) return "neurology";
    return "";
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function processUserMessage(userMessage) {
    userMessage = userMessage.toLowerCase();

    // Detect and Update Language
    if (detectLanguage(userMessage)) {
        return;
    }

    // Handle Greetings and Basic Responses
    if (["hello", "hi", "hey"].some((greet) => userMessage.includes(greet))) {
        displayMessage(responses[userLanguage]["hello"], "bot");
    } else if (userMessage.includes("thank")) {
        displayMessage(responses[userLanguage]["thanks"], "bot");
    } else if (userMessage.includes("sorry")) {
        displayMessage(responses[userLanguage]["sorry"], "bot");
    } else if (userMessage.includes("location")) {
        displayMessage(responses[userLanguage]["location"], "bot");
    } else if (userMessage.includes("hospital") || userMessage.includes("clinic")) {
        displayMessage(responses[userLanguage]["hospital"], "bot");
    } else if (userMessage.includes("checkup")) {
        displayMessage(responses[userLanguage]["checkup"], "bot");
    } else if (userMessage.includes("disease") || userMessage.includes("symptom")) {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    } else if (userMessage.includes("bye") || userMessage.includes("take care")) {
        displayMessage(responses[userLanguage]["take_care"], "bot");
    }
    // Handle Location & Specialty Detection
    else if (userMessage.includes("kolkata") || userMessage.includes("delhi") || userMessage.includes("gurgaon")) {
        userLocation = userMessage;
        displayMessage(responses[userLanguage]["location_confirm"], "bot");
        if (userSpecialty) {
            findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
        }
    } else {
        const detectedSpecialty = detectSpecialtyFromSymptoms(userMessage);
        if (detectedSpecialty) {
            userSpecialty = detectedSpecialty;
            if (userLocation) {
                findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
            } else {
                displayMessage(responses[userLanguage]["location"], "bot");
            }
        } else {
            displayMessage(responses[userLanguage]["default"], "bot");
        }
    }
}

// Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
        processUserMessage(userMessage);
        userInput.value = "";
    }
});

// Press "Enter" to Send Message
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendBtn.click();
    }
});
