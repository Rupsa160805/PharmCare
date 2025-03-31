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
        "doctors_found": "Here are the doctors and hospitals I found based on your condition.",
        "location_error": "I'm unable to retrieve your location. Please allow location access."
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

// Dummy Data for Doctors and Hospitals
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
        }
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
        }
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
        }
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

// Get User’s Live Location Using Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        displayMessage(responses[userLanguage]["location"], "bot");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                reverseGeocode(latitude, longitude);
            },
            () => {
                displayMessage(responses[userLanguage]["location_error"], "bot");
            }
        );
    } else {
        displayMessage(responses[userLanguage]["location_error"], "bot");
    }
}

// Reverse Geocode: Convert Latitude and Longitude to Location Name
function reverseGeocode(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.address && data.address.city) {
                const city = data.address.city.toLowerCase();
                displayMessage(`Location detected: ${city.charAt(0).toUpperCase() + city.slice(1)}`, "bot");
                findDoctorsForSpecialtyAndLocation(userSpecialty, city);
            } else {
                displayMessage("Unable to detect your exact location. Please mention your city manually.", "bot");
            }
        })
        .catch(() => {
            displayMessage("Error fetching location details. Please enter your location manually.", "bot");
        });
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
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

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(
        (hospital) =>
            hospital.location.toLowerCase() === location.toLowerCase() &&
            hospital.specialties.map((s) => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = `${responses[userLanguage]["doctors_found"]}\n\n`;
        matchingHospitals.forEach((hospital) => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
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

    // Check if language switch is requested
    if (detectLanguageSwitch(userMessage)) {
        return;
    }

    // Check if user wants to know about available languages
    if (userMessage.includes("language") || userMessage.includes("bhasha") || userMessage.includes("ভাষা")) {
        displayMessage(responses[userLanguage]["language"], "bot");
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
