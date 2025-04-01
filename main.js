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
        "location": "I'm fetching your location to find the nearest clinic or hospital.",
        "clinic": "Searching for clinics near your location. Please wait...",
        "hospital": "Finding nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any help.",
        "checkup": "Consider scheduling a health checkup along with your consultation.",
        "location_confirm": "Got it! Fetching nearby hospitals and clinics...",
        "doctors_found": "Here are the doctors and hospitals I found for your condition:",
        "location_error": "I'm unable to retrieve your location. Please allow location access.",
        "switch_language": "Language switched successfully! How may I assist you now?",
        "language_error": "Sorry, I currently support English, Hindi, and Bengali. Please choose one.",
        "ask_location": "Please enable location services so I can suggest nearby hospitals.",
        "heart_disease": "For heart-related issues, consult a Cardiologist. Finding nearby hospitals...",
        "bone_issue": "For bone problems, an Orthopedic specialist would be helpful. Searching nearby hospitals...",
        "nerve_issue": "For nerve issues, I recommend a Neurologist. Searching nearby hospitals...",
        "cancer_issue": "For cancer concerns, please consult an Oncologist. Fetching nearby hospitals...",
        "skin_issue": "For skin problems, a Dermatologist is the best choice. Fetching nearby hospitals...",
        "pulmonary_issue": "For lung and respiratory problems, a Pulmonologist would be suitable. Fetching nearby hospitals...",
        "women_health": "For women's health concerns, consult a Gynecologist. Fetching nearby hospitals...",
        "general_physician": "For fever, pain, or general health concerns, a General Physician can help. Fetching nearby clinics..."
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

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

// Switch Language Based on User Input
function switchLanguage(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    if (languageOptions[lowerCaseMessage]) {
        userLanguage = languageOptions[lowerCaseMessage];
        displayMessage(responses[userLanguage]["switch_language"], "bot");
        return true;
    }
    return false;
}

// Fetch Nearby Hospitals and Doctors Using Google Places API
function fetchNearbyHospitals(condition) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                displayMessage(responses[userLanguage][condition], "bot");

                // Call Google Places API to fetch hospitals and doctors
                const query = condition === "general_physician" ? "general physician near me" : "gynecologist near me";
                const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}&near=${latitude},${longitude}`;

                displayMessage("Click the link below to see the nearby options:", "bot");

                // Display clickable link
                const linkElement = document.createElement("a");
                linkElement.href = googleSearchURL;
                linkElement.innerText = "Find Nearby Hospitals & Doctors";
                linkElement.target = "_blank";
                chatContainer.appendChild(linkElement);
                chatContainer.appendChild(document.createElement("br"));
                chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
            },
            () => {
                displayMessage(responses[userLanguage]["location_error"], "bot");
            }
        );
    } else {
        displayMessage(responses[userLanguage]["location_error"], "bot");
    }
}

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Handle language switching
    if (switchLanguage(userMessage)) {
        return;
    }

    // Check for symptoms and fetch nearby hospitals
    if (userMessage.includes("fever") || userMessage.includes("general physician")) {
        fetchNearbyHospitals("general_physician");
        return;
    }
    if (userMessage.includes("women") || userMessage.includes("gynecology") || userMessage.includes("pregnancy")) {
        fetchNearbyHospitals("women_health");
        return;
    }

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Add Event Listeners
sendBtn.addEventListener("click", processUserInput);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processUserInput();
    }
});
