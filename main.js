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
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment...",
        "language_confirm": "Sure! I will now assist you in English."
    },
    "hi": {
        "hello": "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! यदि आपको और सहायता की आवश्यकता हो तो बताएं।",
        "thank you": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "कृपया अपने स्थान को साझा करें ताकि मैं पास के क्लीनिक या अस्पताल ढूंढ सकूं।",
        "clinic": "मैं आपके स्थान के पास के क्लीनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा में बात करना पसंद करेंगे? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "मेडिकल परीक्षण और चेकअप के लिए पास के अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल की सिफारिश कर सकूं।",
        "default": "माफ़ कीजिए, मैं इसे समझ नहीं सका। क्या आप इसे फिर से कह सकते हैं?",
        "take_care": "ख्याल रखें! यदि आपको सहायता की आवश्यकता हो तो मुझे बताएं।",
        "checkup": "आपको बेहतर देखभाल के लिए परामर्श के साथ स्वास्थ्य जांच कराने पर विचार करना चाहिए।",
        "location_confirm": "समझ गया! मैं आपके स्थान के पास के अस्पताल और क्लीनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "language_confirm": "ठीक है! अब मैं आपकी हिंदी में सहायता करूंगा।"
    },
    "bn": {
        "hello": "নমস্কার! আপনাকে আজ কীভাবে সাহায্য করতে পারি?",
        "hi": "হ্যালো! আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনাকে স্বাগতম! আরও সহায়তার প্রয়োজন হলে আমাকে জানান।",
        "thank you": "আপনাকে স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার বর্তমান অবস্থান শেয়ার করুন যাতে কাছাকাছি ক্লিনিক বা হাসপাতাল খুঁজে দিতে পারি।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি... অনুগ্রহ করে অপেক্ষা করুন।",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষায় কথা বলতে চান? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "মেডিকেল টেস্ট এবং চেকআপের জন্য কাছের হাসপাতাল খুঁজছি...",
        "ask_disease": "অনুগ্রহ করে আপনার রোগ বা উপসর্গ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল পরামর্শ দিতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে পারিনি। আপনি কি আবার বলতে পারেন?",
        "take_care": "নিজের খেয়াল রাখুন! সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "checkup": "ভালো যত্নের জন্য পরামর্শের পাশাপাশি স্বাস্থ্য পরীক্ষা করার কথা ভাবা উচিত।",
        "location_confirm": "পেয়েছি! আমি আপনার অবস্থানের কাছাকাছি হাসপাতাল এবং ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "language_confirm": "ঠিক আছে! এখন আমি বাংলায় কথা বলব।"
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

// Store User Location and Disease
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

// Detect Language Change
function detectLanguage(userMessage) {
    if (userMessage.includes("english")) {
        userLanguage = "en";
    } else if (userMessage.includes("hindi") || userMessage.includes("हिंदी")) {
        userLanguage = "hi";
    } else if (userMessage.includes("bengali") || userMessage.includes("বাংলা")) {
        userLanguage = "bn";
    }

    if (languageOptions[userLanguage]) {
        displayMessage(responses[userLanguage]["language_confirm"], "bot");
    }
}

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.map(s => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = responses[userLanguage]["hospital"] + "\n\n";
        matchingHospitals.forEach(hospital => {
            response += `${hospital.name} - ${hospital.address}\n${responses[userLanguage]["doctor"]}: ${hospital.doctors[specialty]}\n\n`;
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
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "stomach": "gastroenterology",
        "lungs": "pulmonology"
    };

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

    // Detect Language Change
    detectLanguage(userMessage);

    // Handle predefined responses
    if (responses[userLanguage][userMessage]) {
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
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    }
    // Check for disease or specialty
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
