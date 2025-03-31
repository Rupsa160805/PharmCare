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
            "cardiology": "Dr. R. Sharma (Cardiologist)",
            "orthopedics": "Dr. A. Das (Orthopedic)",
            "neurology": "Dr. M. Roy (Neurologist)"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cancer", "cardiology", "gastroenterology"],
        doctors: {
            "cancer": "Dr. P. Mehta (Oncologist)",
            "cardiology": "Dr. S. Ghosh (Cardiologist)",
            "gastroenterology": "Dr. B. Kumar (Gastroenterologist)"
        }
    },
    {
        name: "AMRI Hospital",
        address: "Dhakuria, Kolkata",
        location: "kolkata",
        specialties: ["orthopedics", "neurology", "urology", "general checkup"],
        doctors: {
            "orthopedics": "Dr. T. Sen (Orthopedic)",
            "neurology": "Dr. K. Gupta (Neurologist)",
            "urology": "Dr. R. Chakraborty (Urologist)"
        }
    },
    {
        name: "Ruby General Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["diabetes", "gynecology", "pulmonology", "general checkup"],
        doctors: {
            "diabetes": "Dr. S. Bose (Diabetologist)",
            "gynecology": "Dr. N. Banerjee (Gynecologist)",
            "pulmonology": "Dr. A. Dasgupta (Pulmonologist)"
        }
    },
    {
        name: "Narayana Hospital",
        address: "Delhi, India",
        location: "delhi",
        specialties: ["cardiology", "cancer", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. P. Rao (Cardiologist)",
            "cancer": "Dr. R. Iyer (Oncologist)",
            "neurology": "Dr. M. Singh (Neurologist)"
        }
    }
];

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
        processInput(userMessage);
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
    if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    } else if (checkLanguage(userMessage)) {
        setLanguage(userMessage);
    } else if (userMessage.includes("location") || userMessage.includes("address")) {
        askForLocation();
    } else if (isLocation(userMessage)) {
        userLocation = userMessage.toLowerCase();
        displayMessage(responses[userLanguage]["location_confirm"], "bot");
    } else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("checkup")) {
        if (userLocation) {
            findNearbyHospitals(userLocation);
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    } else if (userMessage in responses[userLanguage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } else {
        checkForDisease(userMessage);
    }
}

// Check if User Mentioned a Language
function checkLanguage(message) {
    return Object.keys(languageOptions).find(lang => message.includes(lang)) || false;
}

// Set User's Preferred Language
function setLanguage(lang) {
    const langKey = languageOptions[lang];
    if (langKey) {
        userLanguage = langKey;
        displayMessage(`✅ ${capitalizeFirstLetter(lang)} selected.`, "bot");
        displayMessage(responses[userLanguage]["hello"], "bot");
    } else {
        displayMessage("I'm sorry, I don't support that language yet. Continuing in English.", "bot");
    }
}

// Ask for Preferred Language
function askForLanguage() {
    displayMessage(responses[userLanguage]["language"], "bot");
}

// Ask for User Location
function askForLocation() {
    displayMessage(responses[userLanguage]["location"], "bot");
}

// Check if User Provided a Location
function isLocation(message) {
    const locationKeywords = ["kolkata", "delhi", "mumbai", "chennai", "bangalore"];
    return locationKeywords.some(location => message.includes(location.toLowerCase()));
}

// Capitalize First Letter of Text
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "hearts": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "diabetes": "diabetes",
        "brain": "neurology",
        "neurology": "neurology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "urology": "urology",
        "gynecology": "gynecology",
        "lungs": "pulmonology",
        "pulmonary": "pulmonology",
        "stomach": "gastroenterology",
        "gastro": "gastroenterology",
        "checkup": "general checkup"
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

// Find Suitable Doctors and Hospitals Based on Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const recommendedHospitals = hospitalData.filter(hospital =>
        hospital.specialties.includes(specialty) &&
        hospital.location.toLowerCase() === location.toLowerCase()
    );

    if (recommendedHospitals.length > 0) {
        displayMessage(
            `Here are some hospitals and doctors specializing in ${specialty} near ${capitalizeFirstLetter(location)}:`,
            "bot"
        );

        recommendedHospitals.forEach(hospital => {
            if (hospital.doctors[specialty]) {
                displayMessage(`🏥 ${hospital.name} - ${hospital.address}`, "bot");
                displayMessage(`👨‍⚕️ ${hospital.doctors[specialty]}`, "bot");
            }
        });

        displayMessage(responses[userLanguage]["checkup"], "bot");
        displayMessage(responses[userLanguage]["take_care"], "bot");
    } else {
        displayMessage(
            `❗ Sorry, no hospitals found for ${specialty} near ${capitalizeFirstLetter(location)}.`,
            "bot"
        );
    }
}

// Find Nearby Hospitals Based on Location
function findNearbyHospitals(location) {
    const nearbyHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase()
    );

    if (nearbyHospitals.length > 0) {
        displayMessage(`✅ Here are some hospitals and clinics near ${capitalizeFirstLetter(location)}:`, "bot");

        nearbyHospitals.forEach(hospital => {
            displayMessage(`🏥 ${hospital.name} - ${hospital.address}`, "bot");
        });

        displayMessage(responses[userLanguage]["checkup"], "bot");
    } else {
        displayMessage(`❗ Sorry, no hospitals found near ${capitalizeFirstLetter(location)}.`, "bot");
    }
}
