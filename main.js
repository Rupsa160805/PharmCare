// Health Conditions Mapping to Specialists
const healthConditions = {
    "heart": { issue: "heart_disease", specialist: "Cardiologist" },
    "cardio": { issue: "heart_disease", specialist: "Cardiologist" },
    "bones": { issue: "bone_issue", specialist: "Orthopedic Specialist" },
    "orthopedic": { issue: "bone_issue", specialist: "Orthopedic Specialist" },
    "nerves": { issue: "nerve_issue", specialist: "Neurologist" },
    "neurology": { issue: "nerve_issue", specialist: "Neurologist" },
    "cancer": { issue: "cancer_issue", specialist: "Oncologist" },
    "oncology": { issue: "cancer_issue", specialist: "Oncologist" },
    "skin": { issue: "skin_issue", specialist: "Dermatologist" },
    "dermatology": { issue: "skin_issue", specialist: "Dermatologist" },
    "pulmonary": { issue: "pulmonary_issue", specialist: "Pulmonologist" },
    "fever": { issue: "general_physician_issue", specialist: "General Physician" },
    "pain": { issue: "general_physician_issue", specialist: "General Physician" },
    "women": { issue: "women_issue", specialist: "Gynecologist" }
};

// Doctor and Hospital Data
const doctors = {
    "Cardiologist": ["Dr. Rajesh Sharma - Apollo Hospital", "Dr. Anita Mehta - Fortis"],
    "Orthopedic Specialist": ["Dr. Vikram Das - AIIMS", "Dr. Sneha Kapoor - Medanta"],
    "Neurologist": ["Dr. Prakash Sen - Columbia Asia", "Dr. Ritu Verma - Max Hospital"],
    "Oncologist": ["Dr. A.K. Bansal - Tata Memorial", "Dr. Sunita Rao - AIIMS"],
    "Dermatologist": ["Dr. Ravi Nair - Kaya Clinic", "Dr. Monika Singh - SkinCity"],
    "Pulmonologist": ["Dr. Ajay Gupta - Narayana Health", "Dr. Neha Kumar - Apollo"],
    "General Physician": ["Dr. Alok Jain - Fortis", "Dr. Meera Patel - Cloudnine"],
    "Gynecologist": ["Dr. Seema Das - Manipal Hospital", "Dr. Rachna Aggarwal - Artemis"]
};

// Time-Based Greetings
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    if (hour < 22) return "Good evening!";
    return "Good night!";
}

// Multilingual Responses (English, Hindi, Bengali)
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! " + getTimeBasedGreeting() + " How may I help you?",
        "good morning": "Good morning! How can I assist you today?",
        "good afternoon": "Good afternoon! What can I do for you?",
        "good evening": "Good evening! How may I help?",
        "good night": "Good night! Stay healthy and take care!",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "location": "Fetching your current location to find nearby clinics and hospitals...",
        "clinic": "Searching for clinics near your location. Please wait...",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    }
};

// Function to Fetch User's Live Location
function fetchUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                callback(latitude, longitude);
            },
            error => {
                console.error("Error fetching location:", error);
                appendMessage("bot", "Unable to fetch location. Please enable GPS.");
            }
        );
    } else {
        appendMessage("bot", "Geolocation is not supported by your browser.");
    }
}

// Function to Fetch Nearby Hospitals
function fetchNearbyHospitals(lat, lon) {
    const searchQuery = `nearby hospitals near ${lat},${lon}`;
    appendMessage(
        "bot",
        `Here are some nearby hospitals: <a href="https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}" target="_blank">Click here to view</a>`
    );
}

// Function to Process User Input
function processUserInput() {
    const userInput = document.getElementById("user-input").value.toLowerCase().trim();
    if (!userInput) return;

    appendMessage("user", userInput);

    // Check for greetings and responses
    if (responses["en"][userInput]) {
        appendMessage("bot", responses["en"][userInput]);
        return;
    }

    // Check for health conditions
    let foundIssue = null;
    for (let key in healthConditions) {
        if (userInput.includes(key)) {
            foundIssue = healthConditions[key];
            break;
        }
    }

    if (foundIssue) {
        const specialist = foundIssue.specialist;
        const doctorList = doctors[specialist] ? doctors[specialist].join("<br>") : "No doctor found";
        
        appendMessage(
            "bot",
            `Please take care! For your concern, I recommend consulting a **${specialist}**.<br>Here are some suggested doctors:<br>${doctorList}`
        );

        fetchUserLocation(fetchNearbyHospitals);
        return;
    }

    // Default response
    appendMessage("bot", responses["en"]["default"]);
}

// Function to Append Messages to Chat
function appendMessage(sender, message) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Ensure Chatbot Initializes Properly
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");

    if (!sendButton || !userInput) {
        console.error("Error: Some chatbot elements are missing in HTML.");
        return;
    }

    sendButton.addEventListener("click", processUserInput);
    console.log("Chatbot initialized.");
});
