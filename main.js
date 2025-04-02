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
    "pain": "General Physician",
    "women": "Gynecologist",
    "pregnancy": "Gynecologist"
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
    ]
};

// Hospitals Categorized by Specialization
const hospitals = {
    "Cardiologist": [
        "🏥 Heart Care Hospital, Main Street",
        "🏥 Pulse Cardiac Center, Downtown"
    ],
    "Orthopedic": [
        "🏥 Bone & Joint Clinic, City Center",
        "🏥 Ortho Plus Hospital, Park Avenue"
    ],
    "Neurologist": [
        "🏥 Brain & Spine Institute, Lake Road",
        "🏥 Neuro Care Hospital, Tech Park"
    ],
    "Oncologist": [
        "🏥 Cancer Institute, South Block",
        "🏥 Oncology Care Center, West End"
    ],
    "Dermatologist": [
        "🏥 Skin & Hair Clinic, Midtown",
        "🏥 Glow Dermatology Center, Central Plaza"
    ],
    "Pulmonologist": [
        "🏥 Respiratory Health Center, Green Valley",
        "🏥 Pulmonary Care Hospital, Elm Street"
    ],
    "Gynecologist": [
        "🏥 Women's Health Center, Green Lane",
        "🏥 Motherhood Hospital, City Square"
    ],
    "General Physician": [
        "🏥 MedLife Clinic, High Street",
        "🏥 City General Hospital, Downtown"
    ],
    "Proctologist": [
        "🏥 Piles & Anorectal Clinic, City Hospital",
        "🏥 Proctology Care Center, East Side"
    ]
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

    // Health Condition Detection
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            const specialization = healthConditions[keyword];
            displayMessage(`Based on your concern, here are some recommended doctors:`, "bot");
            fetchDoctors(specialization);
            fetchNearbyHospitals(specialization);
            return;
        }
    }

    // Default response
    displayMessage("Please mention your health concern so I can suggest suitable doctors and hospitals.", "bot");
}

// Display Messages in Chat
function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    if (!chatContainer) return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fetch Doctor Details
function fetchDoctors(specialization) {
    const doctorList = doctors[specialization] || [];
    if (doctorList.length > 0) {
        const doctorMessage = doctorList.map(doc => `👨‍⚕️ ${doc.name} (Fee: ${doc.fee})`).join("\n");
        displayMessage(doctorMessage, "bot");
    } else {
        displayMessage("Sorry, no doctors available for this specialization at the moment.", "bot");
    }
}

// Fetch Nearby Hospitals Based on Specialization
function fetchNearbyHospitals(specialization) {
    const hospitalList = hospitals[specialization] || [];
    if (hospitalList.length > 0) {
        displayMessage("Here are some hospitals specializing in this field:", "bot");
        const hospitalMessage = hospitalList.join("\n");
        displayMessage(hospitalMessage, "bot");
    } else {
        displayMessage("Sorry, no hospitals found for this specialization.", "bot");
    }
}
