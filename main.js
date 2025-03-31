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
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! यदि आपको और सहायता चाहिए तो बताएं।",
        "thank you": "धन्यवाद! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "निकटतम क्लिनिक या अस्पताल खोजने के लिए कृपया अपना स्थान साझा करें।",
        "clinic": "आपके स्थान के पास क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप कौन सी भाषा पसंद करेंगे? (अंग्रेज़ी, हिंदी, बंगाली आदि)",
        "hospital": "मेडिकल जांच और चेकअप के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल की सिफारिश कर सकूं।",
        "default": "मुझे खेद है, मैं इसे समझ नहीं सका। कृपया पुनः कहें।",
        "take_care": "अपना ख्याल रखें! अगर आपको कोई सहायता चाहिए तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए आपको स्वास्थ्य जांच और परामर्श करवाना चाहिए।",
        "location_confirm": "समझ गया! मैं आपके स्थान के पास अस्पताल और क्लिनिक खोजूंगा। कृपया प्रतीक्षा करें..."
    },
    "bn": {
        "hello": "হ্যালো! আমি আপনাকে আজ কীভাবে সাহায্য করতে পারি?",
        "hi": "হাই! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "নিকটস্থ ক্লিনিক বা হাসপাতাল খুঁজতে দয়া করে আপনার অবস্থান শেয়ার করুন।",
        "clinic": "আপনার অবস্থানের নিকটবর্তী ক্লিনিক খুঁজছি... অনুগ্রহ করে অপেক্ষা করুন।",
        "language": "আমি বিভিন্ন ভাষায় সাহায্য করতে পারি। আপনি কোন ভাষা পছন্দ করবেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "চিকিৎসা পরীক্ষা এবং চেকআপের জন্য নিকটস্থ হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ বলুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। অনুগ্রহ করে পুনরায় বলুন।",
        "take_care": "সাবধানে থাকুন! আপনাকে আরও সাহায্য করতে পারলে বলুন।",
        "checkup": "ভালো চিকিৎসার জন্য আপনাকে স্বাস্থ্য পরীক্ষা এবং পরামর্শ নেওয়া উচিত।",
        "location_confirm": "বুঝেছি! আমি আপনার অবস্থানের কাছাকাছি হাসপাতাল এবং ক্লিনিক খুঁজছি... অনুগ্রহ করে অপেক্ষা করুন।"
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

// Store User Location and Specialty
let userLocation = "";
let userSpecialty = "";

// Predefined List of Hospitals and Doctors
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. R. Sharma (Heart Specialist)",
            "orthopedics": "Dr. A. Das (Bone Specialist)",
            "neurology": "Dr. M. Roy (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cancer", "cardiology", "gastroenterology"],
        doctors: {
            "cancer": "Dr. P. Mehta (Cancer Specialist)",
            "cardiology": "Dr. S. Ghosh (Heart Specialist)",
            "gastroenterology": "Dr. B. Kumar (Stomach Specialist)"
        }
    },
    {
        name: "Narayana Hospital",
        address: "Delhi, India",
        location: "delhi",
        specialties: ["cardiology", "cancer", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. P. Rao (Heart Specialist)",
            "cancer": "Dr. R. Iyer (Cancer Specialist)",
            "neurology": "Dr. M. Singh (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Medanta Hospital",
        address: "Gurgaon, Haryana",
        location: "gurgaon",
        specialties: ["orthopedics", "cardiology", "neurology"],
        doctors: {
            "orthopedics": "Dr. A. Verma (Bone Specialist)",
            "cardiology": "Dr. K. Malhotra (Heart Specialist)",
            "neurology": "Dr. S. Kapoor (Nerve/Brain Specialist)"
        }
    }
];

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.map(s => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = `${responses[userLanguage]["hospital"]}\n\n`;
        matchingHospitals.forEach(hospital => {
            response += `${hospital.name} - ${hospital.address}\nDoctor: ${hospital.doctors[specialty]}\n\n`;
        });
        displayMessage(response, "bot");
    } else {
        displayMessage(`Sorry, I couldn't find any hospitals with ${specialty} services near ${location}.`, "bot");
    }
}

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "brain": "neurology",
        "nerves": "neurology",
        "neurology": "neurology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "stomach": "gastroenterology",
        "gastro": "gastroenterology",
        "checkup": "general checkup"
    };

    // Check for matching disease keywords
    const matchedDisease = Object.keys(diseaseKeywords).find(disease =>
        userMessage.includes(disease.toLowerCase())
    );

    if (matchedDisease) {
        userSpecialty = diseaseKeywords[matchedDisease];
        if (userLocation) {
            findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    } else {
        displayMessage(responses[userLanguage]["ask_disease"], "bot");
    }
}

// Process User Input and Respond
function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    displayMessage(userMessage, "user");
    userInput.value = "";

    // Check if user wants to change language
    if (userMessage.includes("language") || userMessage.includes("bhasha")) {
        displayMessage(responses[userLanguage]["language"], "bot");
    } else if (userMessage.includes("hindi")) {
        userLanguage = "hi";
        displayMessage("ठीक है! अब मैं हिंदी में आपकी सहायता करूंगा।", "bot");
    } else if (userMessage.includes("bengali") || userMessage.includes("bangla")) {
        userLanguage = "bn";
        displayMessage("ঠিক আছে! এখন থেকে আমি বাংলায় কথা বলব।", "bot");
    } else if (userMessage.includes("english")) {
        userLanguage = "en";
        displayMessage("Okay! I will now assist you in English.", "bot");
    }
    // Handle greetings and responses
    else if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Handle location input
    else if (userMessage.startsWith("location")) {
        userLocation = userMessage.slice(9).trim(); // Extract location after "location"
        if (userLocation) {
            displayMessage(responses[userLanguage]["location_confirm"], "bot");

            // If disease already provided, show relevant doctors
            if (userSpecialty) {
                findDoctorsForSpecialtyAndLocation(userSpecialty, userLocation);
            }
        } else {
            displayMessage("Please provide a valid location.", "bot");
        }
    }
    // Check for diseases or symptoms
    else {
        checkForDisease(userMessage);
    }
}

// Handle Send Button Click
sendBtn.addEventListener("click", () => {
    processUserInput();
});

// Handle Enter Key Press
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processUserInput();
    }
});
