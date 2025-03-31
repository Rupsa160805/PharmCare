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

// Dummy Data for Doctors and Hospitals (with approximate coordinates for matching)
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

// Get User’s Live Location Using Geolocation API
function getUserLocation() {
    if (navigator.geolocation) {
        displayMessage(responses[userLanguage]["location"], "bot");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                findNearestLocation(latitude, longitude);
            },
            () => {
                displayMessage(responses[userLanguage]["location_error"], "bot");
            }
        );
    } else {
        displayMessage(responses[userLanguage]["location_error"], "bot");
    }
}

// Find the Nearest City/Location Based on Lat-Long
function findNearestLocation(latitude, longitude) {
    let nearestHospital = null;
    let minDistance = Number.MAX_VALUE;

    // Calculate distance between user and each hospital
    hospitalData.forEach((hospital) => {
        const distance = calculateDistance(latitude, longitude, hospital.coordinates.lat, hospital.coordinates.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearestHospital = hospital.location.toLowerCase();
        }
    });

    if (nearestHospital) {
        displayMessage(`Location detected near: ${nearestHospital.charAt(0).toUpperCase() + nearestHospital.slice(1)}`, "bot");
        findDoctorsForSpecialtyAndLocation(userSpecialty, nearestHospital);
    } else {
        displayMessage("Unable to detect nearby hospitals. Please enter your location manually.", "bot");
    }
}

// Calculate Distance Using Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
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
        displayMessage(
            `I'm sorry, I couldn't find any ${specialty} specialists near your location. Please try another condition.`,
            "bot"
        );
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
