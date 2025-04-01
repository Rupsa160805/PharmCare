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

// Doctor and Hospital Suggestions
const doctorHospitalList = {
    "heart_disease": ["Dr. Amit Sharma (Cardiologist) - City Heart Clinic", "Carewell Hospital, Sector 12"],
    "bone_issue": ["Dr. Rakesh Verma (Orthopedic) - Bone & Joint Care", "Ortho Life Hospital, Sector 22"],
    "nerve_issue": ["Dr. Priya Kapoor (Neurologist) - NeuroCare Clinic", "Mind & Nerve Hospital, Sector 18"],
    "cancer_issue": ["Dr. Anjali Mehta (Oncologist) - Cancer Care Institute", "LifeLine Cancer Hospital, Sector 32"],
    "skin_issue": ["Dr. Sanjay Das (Dermatologist) - Skin Glow Clinic", "Derma Health Hospital, Sector 45"],
    "pulmonary_issue": ["Dr. Ravi Khanna (Pulmonologist) - Lung Care Clinic", "Breathe Easy Hospital, Sector 30"],
    "women_health": ["Dr. Pooja Bhatia (Gynecologist) - Women’s Health Center", "Mother & Child Hospital, Sector 40"],
    "general_physician": ["Dr. Rajesh Mehta (General Physician) - City Care Clinic", "HealthFirst Clinic, Sector 15"]
};

// Detect Health Issues and Respond
const healthConditions = {
    "heart": "heart_disease",
    "cardio": "heart_disease",
    "bones": "bone_issue",
    "orthopedic": "bone_issue",
    "nerves": "nerve_issue",
    "neurology": "nerve_issue",
    "cancer": "cancer_issue",
    "oncology": "cancer_issue",
    "skin": "skin_issue",
    "dermatology": "skin_issue",
    "lungs": "pulmonary_issue",
    "respiratory": "pulmonary_issue",
    "breathing": "pulmonary_issue",
    "women": "women_health",
    "gynecology": "women_health",
    "pregnancy": "women_health",
    "fever": "general_physician",
    "pain": "general_physician",
    "headache": "general_physician",
    "cold": "general_physician",
    "cough": "general_physician"
};

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

// Fetch Nearby Hospitals Based on User Location
function fetchNearbyHospitals(condition) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                displayMessage(responses[userLanguage][condition], "bot");

                // Show Suggested Doctors and Hospitals
                const hospitalList = doctorHospitalList[condition] || [];
                if (hospitalList.length > 0) {
                    displayMessage(responses[userLanguage]["doctors_found"], "bot");
                    hospitalList.forEach((hospital) => {
                        displayMessage(hospital, "bot");
                    });
                } else {
                    displayMessage(responses[userLanguage]["location_error"], "bot");
                }
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

    // Check for disease or symptoms
    for (const [key, value] of Object.entries(healthConditions)) {
        if (userMessage.includes(key)) {
            fetchNearbyHospitals(value);
            return;
        }
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
