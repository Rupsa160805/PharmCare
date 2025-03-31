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
        "language_changed": "Language updated successfully! How can I assist you?",
        "ask_specialty": "What kind of doctor are you looking for? Please mention your symptoms or specialty.",
        "no_location": "I couldn’t detect your location. Please enter it by saying: 'Location [your city]'."
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

// Store User Location
let userLocation = "";

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
        name: "AMRI Hospital",
        address: "Dhakuria, Kolkata",
        location: "kolkata",
        specialties: ["orthopedics", "neurology", "urology", "general checkup"],
        doctors: {
            "orthopedics": "Dr. T. Sen (Bone Specialist)",
            "neurology": "Dr. K. Gupta (Nerve/Brain Specialist)",
            "urology": "Dr. R. Chakraborty (Urine/Bladder Specialist)"
        }
    },
    {
        name: "Ruby General Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["diabetes", "gynecology", "pulmonology", "general checkup"],
        doctors: {
            "diabetes": "Dr. S. Bose (Diabetes Specialist)",
            "gynecology": "Dr. N. Banerjee (Women’s Health/Baby Delivery)",
            "pulmonology": "Dr. A. Dasgupta (Lung/Chest Specialist)"
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

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.includes(specialty)
    );

    if (matchingHospitals.length > 0) {
        let response = `Here are some hospitals near ${location} with ${specialty} services:\n\n`;
        matchingHospitals.forEach(hospital => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage(`Sorry, I couldn't find any hospitals with ${specialty} services near ${location}.`, "bot");
    }
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "diabetes": "diabetes",
        "brain": "neurology",
        "nerves": "neurology",
        "neurology": "neurology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "urology": "urology",
        "urine": "urology",
        "bladder": "urology",
        "gynecology": "gynecology",
        "women's health": "gynecology",
        "baby delivery": "gynecology",
        "lungs": "pulmonology",
        "chest": "pulmonology",
        "pulmonary": "pulmonology",
        "stomach": "gastroenterology",
        "gastro": "gastroenterology",
        "checkup": "general checkup",
        "doctor visit": "general checkup"
    };

    // Check for matching disease keywords
    const matchedDisease = Object.keys(diseaseKeywords).find(disease =>
        new RegExp(`\\b${disease}\\b`, "i").test(userMessage)
    );

    if (matchedDisease) {
        const specialty = diseaseKeywords[matchedDisease];
        if (userLocation) {
            findDoctorsForSpecialtyAndLocation(specialty, userLocation);
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Handle Language Change
function changeLanguage(newLang) {
    if (languageOptions[newLang.toLowerCase()]) {
        userLanguage = languageOptions[newLang.toLowerCase()];
        displayMessage(responses[userLanguage]["language_changed"], "bot");
    } else {
        displayMessage("Sorry, I can't assist in that language yet.", "bot");
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

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Handle Location Input
    if (userMessage.startsWith("location")) {
        userLocation = userMessage.split(" ")[1];
        displayMessage(responses[userLanguage]["location_confirm"], "bot");
    }
    // Change Language
    else if (userMessage.startsWith("language")) {
        const newLang = userMessage.split(" ")[1];
        changeLanguage(newLang);
    }
    // Check for Disease or Symptom
    else {
        checkForDisease(userMessage);
    }
}

// Handle Small Talk and Polite Conversation
function handleSmallTalk(userMessage) {
    const smallTalkResponses = {
        "hello": responses[userLanguage]["hello"],
        "hi": responses[userLanguage]["hi"],
        "thanks": responses[userLanguage]["thanks"],
        "thank you": responses[userLanguage]["thank you"],
        "sorry": responses[userLanguage]["sorry"],
        "take care": responses[userLanguage]["take_care"],
        "bye": "Goodbye! Stay safe and healthy.",
        "how are you": "I'm doing great! How can I assist you today?",
        "what can you do": "I can help you find doctors, suggest nearby hospitals, and provide assistance with telemedicine. How may I assist?"
    };

    const matchedTalk = Object.keys(smallTalkResponses).find(talk =>
        new RegExp(`\\b${talk}\\b`, "i").test(userMessage)
    );

    if (matchedTalk) {
        displayMessage(smallTalkResponses[matchedTalk], "bot");
        return true;
    }
    return false;
}

// Enhanced Input Processing
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Handle Small Talk
    if (handleSmallTalk(userMessage)) {
        return;
    }

    // Handle Location Input
    if (userMessage.startsWith("location")) {
        userLocation = userMessage.split(" ")[1];
        displayMessage(responses[userLanguage]["location_confirm"], "bot");
    }
    // Handle Language Change
    else if (userMessage.startsWith("language")) {
        const newLang = userMessage.split(" ")[1];
        changeLanguage(newLang);
    }
    // Check for Disease or Symptom
    else {
        checkForDisease(userMessage);
    }
}
