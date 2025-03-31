// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses
const responses = {
    "hello": "Hello! How can I assist you today?",
    "location": "Please share your current location to find the nearest clinic or hospital.",
    "clinic": "I’m searching for clinics near your location. Please wait a moment...",
    "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)"
};

// Available Languages
const languageOptions = {
    "english": "en",
    "hindi": "hi",
    "bengali": "bn"
};

// Default Language
let userLanguage = "en";

// Doctor and Hospital Data Based on Symptoms/Problems
const doctorRecommendations = {
    "fever": {
        "doctors": ["Dr. Amit Gupta", "Dr. Riya Das"],
        "hospitals": ["Care Plus Hospital", "XYZ Medical Center"]
    },
    "cough": {
        "doctors": ["Dr. Rajesh Sharma", "Dr. Priya Sen"],
        "hospitals": ["Apollo Clinic", "MediCare Hospital"]
    },
    "diabetes": {
        "doctors": ["Dr. Anirban Mukherjee", "Dr. Sneha Roy"],
        "hospitals": ["Diabetes Care Center", "Endocrine Hospital"]
    },
    "heart": {
        "doctors": ["Dr. Arjun Malhotra", "Dr. Neha Kapoor"],
        "hospitals": ["Fortis Heart Institute", "Max Super Specialty Hospital"]
    }
};

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");

        // Process User Input
        processInput(userMessage.toLowerCase());
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
    if (userMessage.includes("location")) {
        getLocation();
    } else if (userMessage.includes("language")) {
        askForLanguage();
    } else if (checkSymptoms(userMessage)) {
        recommendDoctors(userMessage);
    } else if (responses[userMessage]) {
        displayMessage(responses[userMessage], "bot");
    } else {
        displayMessage("I'm sorry, I didn't understand that. Can you please rephrase?", "bot");
    }
}

// Check for Symptoms/Problem in User Input
function checkSymptoms(message) {
    const symptoms = Object.keys(doctorRecommendations);
    for (const symptom of symptoms) {
        if (message.includes(symptom)) {
            return symptom;
        }
    }
    return false;
}

// Recommend Doctors and Hospitals Based on Symptoms
function recommendDoctors(message) {
    const symptom = checkSymptoms(message);
    if (symptom) {
        const recommendation = doctorRecommendations[symptom];
        displayMessage(`Based on your symptoms, I recommend consulting the following doctors:`, "bot");
        recommendation.doctors.forEach((doctor, index) => {
            displayMessage(`${index + 1}. ${doctor} - Available at ${recommendation.hospitals[index]}`, "bot");
        });
        askForLanguage(); // Ask for language after recommendation
    } else {
        displayMessage("I couldn’t identify the issue. Please describe your problem again.", "bot");
    }
}

// Ask for Preferred Language
function askForLanguage() {
    displayMessage("Which language do you prefer? (English, Hindi, Bengali, etc.)", "bot");
}

// Set User's Preferred Language
function setLanguage(lang) {
    if (languageOptions[lang]) {
        userLanguage = languageOptions[lang];
        displayMessage(`Language set to ${capitalizeFirstLetter(lang)}. I will assist you in this language.`, "bot");
    } else {
        displayMessage("I'm sorry, I don't support that language yet. Continuing in English.", "bot");
    }
}

// Get User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(`Searching for clinics near (${latitude}, ${longitude})...`, "bot");
                findClinics(latitude, longitude);
            },
            () => {
                displayMessage("Unable to fetch your location. Please enable location services.", "bot");
            }
        );
    } else {
        displayMessage("Geolocation is not supported by this browser.", "bot");
    }
}

// Dummy Function to Find Clinics (Add API later)
function findClinics(lat, lng) {
    setTimeout(() => {
        displayMessage(`Found 3 clinics near your location. Check the list below:`, "bot");
        displayMessage("1. ABC Diagnostics\n2. XYZ Medical Center\n3. Care Plus Hospital", "bot");
    }, 2000);
}

// Capitalize First Letter of Language
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Translate Bot Messages Based on Language (Future Feature)
function translateMessage(message, lang) {
    // Use translation API later (for now, return message as is)
    return message;
}
