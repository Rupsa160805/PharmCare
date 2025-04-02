// Default language is English
let selectedLanguage = "en";

// Multilingual responses
const translations = {
    en: {
        doctors: "Here are some recommended doctors:",
        hospitals: "Here are some hospitals specializing in this field:",
        unknown: "I didn't understand. Please mention a health issue or ask for a doctor.",
        greeting: "Hello! How can I assist you today?",
        thanks: "You're welcome! Let me know if you need any more help.",
        sorry: "No worries! How can I assist you?",
        languageChanged: "I will now respond in English."
    },
    hi: {
        doctors: "यहाँ कुछ अनुशंसित डॉक्टर हैं:",
        hospitals: "यहाँ इस क्षेत्र में विशेषज्ञ अस्पताल हैं:",
        unknown: "मैं समझ नहीं पाया। कृपया कोई स्वास्थ्य समस्या बताएं या डॉक्टर से पूछें।",
        greeting: "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        thanks: "आपका स्वागत है! अगर आपको और मदद चाहिए तो बताइए।",
        sorry: "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        languageChanged: "अब से मैं हिंदी में जवाब दूंगा।"
    },
    bn: {
        doctors: "এখানে কিছু সুপারিশকৃত ডাক্তার:",
        hospitals: "এখানে এই ক্ষেত্রে বিশেষজ্ঞ হাসপাতাল রয়েছে:",
        unknown: "আমি বুঝতে পারিনি। অনুগ্রহ করে কোনো স্বাস্থ্য সমস্যা উল্লেখ করুন বা ডাক্তার সম্পর্কে জিজ্ঞাসা করুন।",
        greeting: "হ্যালো! আমি কিভাবে আপনাকে সাহায্য করতে পারি?",
        thanks: "আপনাকে স্বাগতম! যদি আরও সাহায্য দরকার হয়, জানান।",
        sorry: "কোনো সমস্যা নেই! আমি কিভাবে আপনাকে সাহায্য করতে পারি?",
        languageChanged: "এখন থেকে আমি বাংলায় উত্তর দেব।"
    }
};

// Health Conditions Mapping to Specializations
const healthConditions = {
    "heart": "Cardiologist", "blood pressure": "Cardiologist", "bp": "Cardiologist",
    "bones": "Orthopedic", "fracture": "Orthopedic", "joint": "Orthopedic",
    "nerves": "Neurologist", "brain": "Neurologist",
    "cancer": "Oncologist", "tumor": "Oncologist",
    "skin": "Dermatologist", "pimples": "Dermatologist", "acne": "Dermatologist",
    "piles": "Proctologist", "hemorrhoids": "Proctologist",
    "lungs": "Pulmonologist", "breathing": "Pulmonologist", "asthma": "Pulmonologist",
    "fever": "General Physician", "cold": "General Physician", "cough": "General Physician",
    "pregnancy": "Gynecologist", "women": "Gynecologist",
    "mental": "Psychiatrist", "anxiety": "Psychiatrist", "depression": "Psychiatrist",
    "stress": "Psychiatrist", "sleep": "Psychiatrist"
};

// Doctors List
const doctors = {
    "Cardiologist": [{ name: "Dr. Rajesh Sharma", fee: "₹800" }, { name: "Dr. Anjali Mehta", fee: "₹900" }],
    "Orthopedic": [{ name: "Dr. Vikram Das", fee: "₹700" }, { name: "Dr. Riya Sen", fee: "₹750" }],
    "Neurologist": [{ name: "Dr. Alok Verma", fee: "₹1000" }, { name: "Dr. Sneha Kapoor", fee: "₹950" }],
    "Oncologist": [{ name: "Dr. Rajiv Menon", fee: "₹1500" }, { name: "Dr. Neha Agarwal", fee: "₹1400" }],
    "Dermatologist": [{ name: "Dr. Sanjay Bose", fee: "₹600" }, { name: "Dr. Payal Gupta", fee: "₹650" }],
    "Pulmonologist": [{ name: "Dr. Arvind Iyer", fee: "₹900" }, { name: "Dr. Kiran Das", fee: "₹850" }],
    "Gynecologist": [{ name: "Dr. Kavita Sharma", fee: "₹900" }, { name: "Dr. Poonam Das", fee: "₹850" }],
    "General Physician": [{ name: "Dr. Ramesh Patil", fee: "₹400" }, { name: "Dr. Priya Malhotra", fee: "₹450" }],
    "Proctologist": [{ name: "Dr. Amit Sen", fee: "₹1000" }, { name: "Dr. Sunita Nair", fee: "₹950" }],
    "Psychiatrist": [{ name: "Dr. Anirban Roy", fee: "₹1200" }, { name: "Dr. Shalini Gupta", fee: "₹1100" }]
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
        displayMessage(translations[selectedLanguage].languageChanged, "bot"); 
        return; 
    }
    if (userText.includes("bengali")) { 
        selectedLanguage = "bn"; 
        displayMessage(translations[selectedLanguage].languageChanged, "bot"); 
        return; 
    }
    if (userText.includes("english")) { 
        selectedLanguage = "en"; 
        displayMessage(translations[selectedLanguage].languageChanged, "bot"); 
        return; 
    }

    // Health Condition Detection
    let found = false;
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            const specialization = healthConditions[keyword];
            displayMessage(translations[selectedLanguage].doctors, "bot");
            fetchDoctors(specialization);
            displayMessage(translations[selectedLanguage].hospitals, "bot");
            fetchHospitals(specialization);
            found = true;
            break;
        }
    }

    if (!found) {
        if (userText.includes("hello") || userText.includes("hi")) {
            displayMessage(translations[selectedLanguage].greeting, "bot");
        } else if (userText.includes("thanks")) {
            displayMessage(translations[selectedLanguage].thanks, "bot");
        } else if (userText.includes("sorry")) {
            displayMessage(translations[selectedLanguage].sorry, "bot");
        } else {
            displayMessage(translations[selectedLanguage].unknown, "bot");
        }
    }
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
    if (doctorList.length > 0) {
        displayMessage(doctorList.map(doc => `👨‍⚕️ ${doc.name} (Fee: ${doc.fee})`).join("\n"), "bot");
    }
}

// Fetch Hospitals
function fetchHospitals(specialization) {
    const hospitalList = hospitals[specialization] || [];
    if (hospitalList.length > 0) {
        displayMessage(hospitalList.join("\n"), "bot");
    }
}
