// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses
const responses = {
    "hello": "Hello! How can I assist you today?",
    "location": "Please share your current location to find the nearest clinic or hospital.",
    "problem": "Tell me more about your symptoms or concern.",
    "clinic": "I’m searching for clinics near your location. Please wait a moment...",
    "language": "I can assist you in multiple languages. Which language do you prefer?"
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
    } else if (responses[userMessage]) {
        displayMessage(responses[userMessage], "bot");
    } else {
        displayMessage("I'm sorry, I didn't understand that. Can you please rephrase?", "bot");
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
