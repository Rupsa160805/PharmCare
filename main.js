// Debugging: Ensure script loads
console.log("Chatbot script loaded successfully!");

// Default language is English
let selectedLanguage = "en";

// Health Conditions Mapping to Specializations
const healthConditions = {
    "heart": "Cardiologist",
    "cardio": "Cardiologist",
    "bones": "Orthopedic",
    "orthopedic": "Orthopedic",
    "nerves": "Neurologist",
    "neurology": "Neurologist",
    "cancer": "Oncologist",
    "oncology": "Oncologist",
    "skin": "Dermatologist",
    "dermatology": "Dermatologist",
    "pulmonary": "Pulmonologist",
    "fever": "General Physician",
    "pain": "General Physician",
    "women": "Gynecologist"
};

// Doctors List with Consultation Fees
const doctors = {
    "Cardiologist": [
        { name: "Dr. Rajesh Sharma", fee: "₹800" },
        { name: "Dr. Anjali Mehta", fee: "₹900" }
    ],
    "Orthopedic": [
        { name: "Dr. Vikram Das", fee: "₹700" },
        { name: "Dr. Riya Sen", fee: "₹750" }
    ],
    "Neurologist": [
        { name: "Dr. Alok Verma", fee: "₹1000" },
        { name: "Dr. Sneha Kapoor", fee: "₹950" }
    ],
    "Oncologist": [
        { name: "Dr. Neeraj Khanna", fee: "₹1200" },
        { name: "Dr. Aisha Gupta", fee: "₹1100" }
    ],
    "Dermatologist": [
        { name: "Dr. Sunita Rao", fee: "₹500" },
        { name: "Dr. Kunal Bose", fee: "₹600" }
    ],
    "Pulmonologist": [
        { name: "Dr. Meera Nair", fee: "₹850" },
        { name: "Dr. Amit Roy", fee: "₹800" }
    ],
    "General Physician": [
        { name: "Dr. Ramesh Patil", fee: "₹400" },
        { name: "Dr. Priya Malhotra", fee: "₹450" }
    ],
    "Gynecologist": [
        { name: "Dr. Kavita Sharma", fee: "₹900" },
        { name: "Dr. Poonam Das", fee: "₹850" }
    ]
};

// Hospital Data based on Approximate Location Ranges
const hospitals = [
    { name: "City Hospital", latRange: [22.50, 22.60], lonRange: [88.30, 88.40], address: "Park Street, Kolkata" },
    { name: "Metro Care Hospital", latRange: [28.60, 28.70], lonRange: [77.10, 77.20], address: "Connaught Place, Delhi" },
    { name: "Green Cross Medical", latRange: [19.00, 19.10], lonRange: [72.80, 72.90], address: "Andheri, Mumbai" },
    { name: "Sunrise Hospital", latRange: [13.00, 13.10], lonRange: [77.50, 77.60], address: "MG Road, Bangalore" },
    { name: "Apollo Clinic", latRange: [17.40, 17.50], lonRange: [78.40, 78.50], address: "Banjara Hills, Hyderabad" }
];

// Predefined Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "hospital": "Searching for nearby hospitals...",
        "ask_disease": "Please mention your health concern so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "doctor_recommendation": "Based on your concern, here are some recommended doctors:"
    }
};

// Initialize Chatbot
window.onload = function () {
    console.log("Chatbot initialized.");

    document.getElementById("send-btn").addEventListener("click", processUserInput);
    document.getElementById("user-input").addEventListener("keypress", (event) => {
        if (event.key === "Enter") processUserInput();
    });
};

function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userText = userInputField.value.trim().toLowerCase();

    if (!userText) return;

    displayMessage(userText, "user");
    userInputField.value = "";

    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            displayMessage(responses[selectedLanguage]["doctor_recommendation"], "bot");
            fetchDoctors(healthConditions[keyword]);
            fetchNearbyHospitals();
            return;
        }
    }

    let botResponse = responses[selectedLanguage][userText] || responses[selectedLanguage]["default"];
    displayMessage(botResponse, "bot");
}

// Display Messages
function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fetch Doctor Details
function fetchDoctors(specialization) {
    const doctorList = doctors[specialization] || [];
    let doctorMessage = doctorList.map(doc => `${doc.name} (Fee: ${doc.fee})`).join("\n");

    if (!doctorMessage) doctorMessage = "No available doctors for this specialization.";
    displayMessage(doctorMessage, "bot");
}

// Fetch Nearby Hospitals using Live Location
function fetchNearbyHospitals() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;

            console.log(`User Location: ${userLat}, ${userLon}`);

            let nearbyHospitals = hospitals.filter(hospital => 
                userLat >= hospital.latRange[0] && userLat <= hospital.latRange[1] &&
                userLon >= hospital.lonRange[0] && userLon <= hospital.lonRange[1]
            );

            if (nearbyHospitals.length > 0) {
                let hospitalMessage = "Nearby hospitals:\n" +
                    nearbyHospitals.map(h => `${h.name} - ${h.address}`).join("\n");
                displayMessage(hospitalMessage, "bot");
            } else {
                displayMessage("No hospitals found in your immediate vicinity.", "bot");
            }
        }, () => {
            displayMessage("Unable to access your location. Please enable location services.", "bot");
        });
    } else {
        displayMessage("Geolocation is not supported by your browser.", "bot");
    }
}
