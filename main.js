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
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment...",
        "heart_doctors": "Here are some cardiologists near your location:",
        "bones_doctors": "Here are some orthopedic doctors near your location:",
        "cancer_doctors": "Here are some oncologists near your location:",
        "skin_doctors": "Here are some dermatologists near your location:"
    }
};

// Available Languages
const languageOptions = {
    "english": "en"
};

// Default Language
let userLanguage = "en";

// Store User Location and Specialty
let userLocation = "";
let userSpecialty = "";

// Sample Hospital and Doctor Data
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Salt Lake, Kolkata",
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "oncology", "dermatology"],
        doctors: {
            "cardiology": "Dr. Rajiv Kapoor",
            "orthopedics": "Dr. Amit Gupta",
            "oncology": "Dr. Priya Sharma",
            "dermatology": "Dr. Sneha Bose"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Rajarhat, Kolkata",
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "oncology"],
        doctors: {
            "cardiology": "Dr. Sandeep Bhalla",
            "orthopedics": "Dr. Ravi Verma",
            "oncology": "Dr. Meenal Joshi"
        }
    },
    {
        name: "AMRI Hospital",
        address: "Dhakuria, Kolkata",
        location: "kolkata",
        specialties: ["cardiology", "dermatology"],
        doctors: {
            "cardiology": "Dr. Sunil Mehta",
            "dermatology": "Dr. Anjali Sen"
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

// Detect Language Switch Requests
function detectLanguageSwitch(userMessage) {
    if (userMessage.includes("hindi")) {
        userLanguage = "hi";
        displayMessage("ठीक है! अब मैं हिंदी में आपकी सहायता करूंगा।", "bot");
        return true;
    } else if (userMessage.includes("bengali")) {
        userLanguage = "bn";
        displayMessage("ঠিক আছে! এখন থেকে আমি বাংলায় কথা বলব।", "bot");
        return true;
    } else if (userMessage.includes("english")) {
        userLanguage = "en";
        displayMessage("Okay! I will now assist you in English.", "bot");
        return true;
    }
    return false;
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "oncology",
        "oncology": "oncology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "skin": "dermatology",
        "dermatology": "dermatology"
    };

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

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.map(s => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = `${responses[userLanguage][specialty + "_doctors"]}\n\n`;
        matchingHospitals.forEach(hospital => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage("Sorry, I couldn't find any suitable doctors nearby. Please try again with a different location.", "bot");
    }
}

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Check if language switch is requested
    if (detectLanguageSwitch(userMessage)) {
        return;
    }

    // Check if user wants to know about available languages
    if (userMessage.includes("language")) {
        displayMessage(responses[userLanguage]["language"], "bot");
        return;
    }

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Handle location input
    else if (userMessage.startsWith("location")) {
        userLocation = userMessage.slice(9).trim();
        if (userLocation) {
            displayMessage(responses[userLanguage]["location_confirm"], "bot");
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    }
    // Check for disease/specialty
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
