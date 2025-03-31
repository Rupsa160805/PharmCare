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
        "location": "Please share your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care."
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "hi": "हाय! मैं आपकी किस प्रकार मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! अगर आपको और सहायता चाहिए तो बताएं।",
        "thank you": "कोई बात नहीं! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि हम निकटतम क्लिनिक या अस्पताल खोज सकें।",
        "clinic": "मैं आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "चिकित्सा परीक्षण और स्वास्थ्य जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उचित डॉक्टर और अस्पताल सुझा सकूँ।",
        "default": "मुझे क्षमा करें, मैंने समझा नहीं। कृपया दोबारा प्रयास करें।",
        "take_care": "ख्याल रखना! अगर आपको और सहायता चाहिए तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए एक स्वास्थ्य परीक्षण और परामर्श शेड्यूल करने पर विचार करें।"
    },
    "bn": {
        "hello": "হ্যালো! আজ আমি কীভাবে আপনার সহায়তা করতে পারি?",
        "hi": "হাই! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "thanks": "আপনাকে স্বাগতম! যদি আরও সহায়তা লাগে, আমাকে জানান।",
        "thank you": "আপনাকে স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কিভাবে সাহায্য করতে পারি?",
        "location": "নিকটবর্তী ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার বর্তমান অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language": "আমি আপনাকে বিভিন্ন ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং স্বাস্থ্য পরীক্ষার জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
        "ask_disease": "অনুগ্রহ করে আপনার রোগ বা লক্ষণগুলি বলুন যাতে আমি উপযুক্ত ডাক্তার ও হাসপাতাল সুপারিশ করতে পারি।",
        "default": "আমি দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে আবার বলুন।",
        "take_care": "সাবধানে থাকুন! আমাকে জানান যদি আপনার কোনো সাহায্যের প্রয়োজন হয়।",
        "checkup": "ভাল যত্নের জন্য একটি স্বাস্থ্য পরীক্ষা এবং পরামর্শ নির্ধারণ করুন।"
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

// Predefined List of Hospitals and Doctors
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Kolkata, West Bengal",
        specialties: ["cardiology", "orthopedics", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. R. Sharma (Cardiologist)",
            "orthopedics": "Dr. A. Das (Orthopedic)",
            "neurology": "Dr. M. Roy (Neurologist)"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Kolkata, West Bengal",
        specialties: ["cancer", "cardiology", "gastroenterology"],
        doctors: {
            "cancer": "Dr. P. Mehta (Oncologist)",
            "cardiology": "Dr. S. Ghosh (Cardiologist)",
            "gastroenterology": "Dr. B. Kumar (Gastroenterologist)"
        }
    },
    {
        name: "AMRI Hospital",
        address: "Dhakuria, Kolkata",
        specialties: ["orthopedics", "neurology", "urology", "general checkup"],
        doctors: {
            "orthopedics": "Dr. T. Sen (Orthopedic)",
            "neurology": "Dr. K. Gupta (Neurologist)",
            "urology": "Dr. R. Chakraborty (Urologist)"
        }
    },
    {
        name: "Ruby General Hospital",
        address: "Kolkata, West Bengal",
        specialties: ["diabetes", "gynecology", "pulmonology", "general checkup"],
        doctors: {
            "diabetes": "Dr. S. Bose (Diabetologist)",
            "gynecology": "Dr. N. Banerjee (Gynecologist)",
            "pulmonology": "Dr. A. Dasgupta (Pulmonologist)"
        }
    }
];

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
        processInput(userMessage);
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
    if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    } else if (checkLanguage(userMessage)) {
        setLanguage(userMessage);
    } else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("checkup")) {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    } else if (userMessage in responses[userLanguage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    } else {
        checkForDisease(userMessage);
    }
}

// Check if User Mentioned a Language
function checkLanguage(message) {
    return Object.keys(languageOptions).find(lang => message.includes(lang)) || false;
}

// Set User's Preferred Language
function setLanguage(lang) {
    const langKey = languageOptions[lang];
    if (langKey) {
        userLanguage = langKey;
        displayMessage(`✅ ${capitalizeFirstLetter(lang)} selected.`, "bot");
        displayMessage(responses[userLanguage]["hello"], "bot");
    } else {
        displayMessage("I'm sorry, I don't support that language yet. Continuing in English.", "bot");
    }
}

// Ask for Preferred Language
function askForLanguage() {
    displayMessage(responses[userLanguage]["language"], "bot");
}

// Capitalize First Letter of Text
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "diabetes": "diabetes",
        "brain": "neurology",
        "neurology": "neurology",
        "bones": "orthopedics",
        "orthopedics": "orthopedics",
        "urology": "urology",
        "gynecology": "gynecology",
        "lungs": "pulmonology",
        "pulmonology": "pulmonology",
        "stomach": "gastroenterology",
        "gastroenterology": "gastroenterology",
        "checkup": "general checkup"
    };

    const matchedDisease = Object.keys(diseaseKeywords).find(disease =>
        userMessage.includes(disease)
    );

    if (matchedDisease) {
        const specialty = diseaseKeywords[matchedDisease];
        findDoctorsForSpecialty(specialty);
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Find Suitable Doctors and Hospitals Based on Specialties
function findDoctorsForSpecialty(specialty) {
    const recommendedHospitals = hospitalData.filter(hospital =>
        hospital.specialties.includes(specialty)
    );

    if (recommendedHospitals.length > 0) {
        displayMessage(
            userLanguage === "hi"
                ? "यहाँ आपके रोग के लिए उपयुक्त अस्पताल और डॉक्टर हैं:"
                : userLanguage === "bn"
                ? "আপনার রোগের জন্য উপযুক্ত হাসপাতাল এবং ডাক্তারগুলি এখানে রয়েছে:"
                : "Here are some hospitals and doctors specializing in your condition:",
            "bot"
        );

        recommendedHospitals.forEach(hospital => {
            if (hospital.doctors[specialty]) {
                displayMessage(`🏥 ${hospital.name} - ${hospital.address}`, "bot");
                displayMessage(`👨‍⚕️ ${hospital.doctors[specialty]}`, "bot");
            }
        });

        displayMessage(responses[userLanguage]["checkup"], "bot");
        displayMessage(responses[userLanguage]["take_care"], "bot");
    } else {
        displayMessage(
            userLanguage === "hi"
                ? "मुझे उस बीमारी के लिए कोई उपयुक्त अस्पताल नहीं मिला।"
                : userLanguage === "bn"
                ? "আমি সেই রোগের জন্য কোনও উপযুক্ত হাসপাতাল খুঁজে পাইনি।"
                : "I'm sorry, I couldn't find a suitable hospital for that condition.",
            "bot"
        );
    }
}
