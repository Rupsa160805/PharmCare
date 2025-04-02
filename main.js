// Default language is English
let selectedLanguage = "en";

// Health Conditions Mapping to Specializations
const healthConditions = {
    "heart": "Cardiologist",
    "cardio": "Cardiologist",
    "blood pressure": "Cardiologist",
    "bp": "Cardiologist",
    "bones": "Orthopedic",
    "fracture": "Orthopedic",
    "joint": "Orthopedic",
    "orthopedic": "Orthopedic",
    "nerves": "Neurologist",
    "neurology": "Neurologist",
    "brain": "Neurologist",
    "cancer": "Oncologist",
    "tumor": "Oncologist",
    "oncology": "Oncologist",
    "skin": "Dermatologist",
    "pimples": "Dermatologist",
    "acne": "Dermatologist",
    "rashes": "Dermatologist",
    "eczema": "Dermatologist",
    "allergy": "Dermatologist",
    "psoriasis": "Dermatologist",
    "piles": "Proctologist",
    "hemorrhoids": "Proctologist",
    "pulmonary": "Pulmonologist",
    "lungs": "Pulmonologist",
    "breathing": "Pulmonologist",
    "asthma": "Pulmonologist",
    "fever": "General Physician",
    "cold": "General Physician",
    "cough": "General Physician",
    "pain": "General Physician",
    "women": "Gynecologist",
    "pregnancy": "Gynecologist",
    "mental": "Psychiatrist",
    "anxiety": "Psychiatrist",
    "depression": "Psychiatrist",
    "stress": "Psychiatrist",
    "sleep": "Psychiatrist",
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
        { name: "Dr. Rajiv Menon", fee: "₹1500" },
        { name: "Dr. Neha Agarwal", fee: "₹1400" }
    ],
    "Dermatologist": [
        { name: "Dr. Sanjay Bose", fee: "₹600" },
        { name: "Dr. Payal Gupta", fee: "₹650" }
    ],
    "Pulmonologist": [
        { name: "Dr. Arvind Iyer", fee: "₹900" },
        { name: "Dr. Kiran Das", fee: "₹850" }
    ],
    "Gynecologist": [
        { name: "Dr. Kavita Sharma", fee: "₹900" },
        { name: "Dr. Poonam Das", fee: "₹850" }
    ],
    "General Physician": [
        { name: "Dr. Ramesh Patil", fee: "₹400" },
        { name: "Dr. Priya Malhotra", fee: "₹450" }
    ],
    "Proctologist": [
        { name: "Dr. Amit Sen", fee: "₹1000" },
        { name: "Dr. Sunita Nair", fee: "₹950" }
    ],
    "Psychiatrist": [
        { name: "Dr. Anirban Roy", fee: "₹1200" },
        { name: "Dr. Shalini Gupta", fee: "₹1100" }
    ]
};

// Hospitals Categorized by Specialization
const hospitals = {
    "Cardiologist": ["🏥 Heart Care Hospital", "🏥 Pulse Cardiac Center"],
    "Orthopedic": ["🏥 Bone & Joint Clinic", "🏥 Ortho Plus Hospital"],
    "Neurologist": ["🏥 Brain & Spine Institute", "🏥 Neuro Care Hospital"],
    "Oncologist": ["🏥 Cancer Institute", "🏥 Oncology Care Center"],
    "Dermatologist": ["🏥 Skin & Hair Clinic", "🏥 Glow Dermatology Center"],
    "Pulmonologist": ["🏥 Respiratory Health Center", "🏥 Pulmonary Care Hospital"],
    "Gynecologist": ["🏥 Women's Health Center", "🏥 Motherhood Hospital"],
    "General Physician": ["🏥 MedLife Clinic", "🏥 City General Hospital"],
    "Proctologist": ["🏥 Piles & Anorectal Clinic", "🏥 Proctology Care Center"],
    "Psychiatrist": ["🏥 Mental Wellness Center", "🏥 Psychiatry Health Clinic"]
};

// Chatbot Initialization
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send-btn").addEventListener("click", processUserInput);
    document.getElementById("user-input").addEventListener("keypress", (event) => {
        if (event.key === "Enter") processUserInput();
    });
});

// Process User Input
function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userText = userInputField.value.trim().toLowerCase();

    if (!userText) return;

    displayMessage(userText, "user");
    userInputField.value = "";

    // Language Switching
    if (userText.includes("hindi")) {
        selectedLanguage = "hi";
        displayMessage("अब से मैं हिंदी में जवाब दूंगा।", "bot");
        return;
    } else if (userText.includes("bengali")) {
        selectedLanguage = "bn";
        displayMessage("এখন থেকে আমি বাংলায় উত্তর দেব।", "bot");
        return;
    } else if (userText.includes("english")) {
        selectedLanguage = "en";
        displayMessage("I will now respond in English.", "bot");
        return;
    }

    // Check for Health Issues in Input
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            const specialization = healthConditions[keyword];
            displayMessage(`Here are some recommended doctors for ${specialization}:`, "bot");
            fetchDoctors(specialization);
            fetchNearbyHospitals(specialization);
            return;
        }
    }

    // Friendly Responses
    if (userText.includes("hello") || userText.includes("hi")) {
        displayMessage("Hello! How can I assist you today?", "bot");
        return;
    }
    if (userText.includes("thanks") || userText.includes("thank you")) {
        displayMessage("You're welcome! Let me know if you need any more help.", "bot");
        return;
    }
    if (userText.includes("sorry")) {
        displayMessage("No worries! How can I assist you?", "bot");
        return;
    }

    // Default Response
    displayMessage("I didn't understand. Please mention a health issue or ask for a doctor.", "bot");
}

// Display Messages in Chat
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
    displayMessage(doctors[specialization].map(doc => `👨‍⚕️ ${doc.name} (Fee: ${doc.fee})`).join("\n"), "bot");
}

// Fetch Nearby Hospitals
function fetchNearbyHospitals(specialization) {
    displayMessage("Here are some hospitals for this specialization:", "bot");
    displayMessage(hospitals[specialization].join("\n"), "bot");
}
