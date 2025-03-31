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
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "হাই! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনাকে স্বাগতম! আর কিছু জানতে চাইলে জানান।",
        "thank you": "আপনাকে স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! কীভাবে সাহায্য করব?",
        "location": "আপনার বর্তমান অবস্থান জানান যাতে কাছের হাসপাতাল খুঁজে দেওয়া যায়।",
        "clinic": "আপনার নিকটবর্তী ক্লিনিক খুঁজছি। একটু অপেক্ষা করুন...",
        "language": "আমি বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (বাংলা, ইংরেজি, হিন্দি ইত্যাদি)",
        "hospital": "মেডিকেল টেস্ট ও চেকআপের জন্য নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা উপসর্গ বলুন যাতে আমি উপযুক্ত ডাক্তার ও হাসপাতাল সাজেস্ট করতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে পারিনি। দয়া করে আবার বলুন।",
        "take_care": "নিজের যত্ন নিন! প্রয়োজনে আমাকে জানান।",
        "checkup": "ভালো যত্নের জন্য কনসাল্টেশনের সাথে স্বাস্থ্য পরীক্ষা করার কথা ভাবুন।",
        "location_confirm": "বুঝেছি! আমি আপনার অবস্থানের কাছাকাছি হাসপাতাল ও ক্লিনিক খুঁজছি। দয়া করে অপেক্ষা করুন..."
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
        "hi": "हाय! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! और किसी सहायता की जरूरत हो तो बताइए।",
        "thank you": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता करूं?",
        "location": "कृपया अपना स्थान साझा करें ताकि मैं आपके नजदीकी अस्पतालों को खोज सकूं।",
        "clinic": "आपके स्थान के निकट क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं विभिन्न भाषाओं में सहायता कर सकता हूँ। आप किस भाषा को पसंद करेंगे? (हिंदी, अंग्रेजी, बंगाली, आदि)",
        "hospital": "चिकित्सा परीक्षण और चेकअप के लिए नजदीकी अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपने रोग या लक्षण का उल्लेख करें ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "माफ़ कीजिए, मैं समझ नहीं सका। कृपया फिर से कहें।",
        "take_care": "अपना ख्याल रखें! और किसी सहायता की आवश्यकता हो तो बताइए।",
        "checkup": "बेहतर देखभाल के लिए परामर्श के साथ स्वास्थ्य जांच कराने पर विचार करें।",
        "location_confirm": "समझ गया! मैं आपके स्थान के पास अस्पताल और क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें..."
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

// Store User Location and Disease
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

// Detect and Change User Language
function changeLanguage(userMessage) {
    if (userMessage.includes("bengali")) {
        userLanguage = "bn";
        displayMessage("আমি এখন বাংলা ভাষায় সাহায্য করবো।", "bot");
    } else if (userMessage.includes("hindi")) {
        userLanguage = "hi";
        displayMessage("अब मैं हिंदी में आपकी सहायता करूंगा।", "bot");
    } else if (userMessage.includes("english")) {
        userLanguage = "en";
        displayMessage("I will now assist you in English.", "bot");
    }
}

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.map(s => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = responses[userLanguage]["hospital"] + "\n\n";
        matchingHospitals.forEach(hospital => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "brain": "neurology",
        "nerves": "neurology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "skin": "dermatology",
        "skin problem": "dermatology"
    };

    // Check for matching disease keywords
    const matchedDisease = Object.keys(diseaseKeywords).find(disease =>
        userMessage.includes(disease.toLowerCase())
    );

    if (matchedDisease) {
        userSpecialty = diseaseKeywords[matchedDisease];
        if (userLocation) {
            findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
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

    // Check for language change
    changeLanguage(userMessage);

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Handle location input
    else if (userMessage.startsWith("location")) {
        userLocation = userMessage.slice(9).trim(); // Extract location after "location"
        if (userLocation) {
            displayMessage(responses[userLanguage]["location_confirm"], "bot");

            // If disease already provided, show relevant doctors
            if (userSpecialty) {
                findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
            }
        } else {
            displayMessage("Please provide a valid location.", "bot");
        }
    }
    // Check for diseases or symptoms
    else {
        checkForDisease(userMessage);
    }
}

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    processUserInput();
});

// Handle Enter Key Press
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processUserInput();
    }
});
