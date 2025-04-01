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
        "general_physician": "For fever, pain, or general health concerns, a General Physician can help. Fetching nearby clinics...",
        "women_health": "For women's health concerns, consult a Gynecologist. Fetching nearby hospitals..."
    }
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

// Function to Fetch Nearby Hospitals Using User's Live Location
function fetchNearbyHospitals(condition) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                displayMessage(responses[userLanguage][condition], "bot");

                // Dynamic Google Maps search query
