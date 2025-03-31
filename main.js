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
        "hello": "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
        "hi": "नमस्ते! कैसे मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! और किसी सहायता की आवश्यकता हो तो बताएं।",
        "thank you": "धन्यवाद! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे मदद कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि हम नजदीकी अस्पताल या क्लिनिक ढूंढ सकें।",
        "clinic": "आपके स्थान के पास क्लिनिक की खोज कर रहा हूँ। कृपया प्रतीक्षा करें...",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा को पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली आदि)",
        "hospital": "नजदीकी अस्पतालों की खोज कर रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "मुझे क्षमा करें, मैं समझ नहीं पाया। कृपया दोबारा कोशिश करें।",
        "take_care": "अपना ध्यान रखें! किसी भी सहायता की आवश्यकता हो तो बताएं।",
        "checkup": "बेहतर देखभाल के लिए परामर्श के साथ एक स्वास्थ्य जांच कराने पर विचार करें।",
        "location_confirm": "समझ गया! मैं आपके स्थान के आसपास के अस्पतालों और क्लीनिकों को खोजूंगा। कृपया प्रतीक्षा करें..."
    },
    "bn": {
        "hello": "নমস্কার! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
        "hi": "হাই! বলুন কিভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও কিছু সাহায্যের প্রয়োজন হলে বলুন।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার বর্তমান অবস্থান জানান যাতে আমি কাছের ক্লিনিক বা হাসপাতাল খুঁজে দিতে পারি।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। একটু অপেক্ষা করুন...",
        "language": "আমি একাধিক ভাষায় সাহায্য করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা ইত্যাদি)",
        "hospital": "কাছাকাছি হাসপাতালগুলোর সন্ধান করছি...",
        "ask_disease": "আপনার রোগ বা উপসর্গের নাম বলুন যাতে আমি যথাযথ ডাক্তার ও হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি বুঝতে পারিনি। অনুগ্রহ করে আবার বলুন।",
        "take_care": "সাবধানে থাকুন! কোনো সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "checkup": "উন্নত চিকিৎসার জন্য পরামর্শের পাশাপাশি একটি স্বাস্থ্য পরীক্ষা নির্ধারণ করুন।",
        "location_confirm": "বুঝেছি! আমি আপনার অবস্থানের নিকটবর্তী হাসপাতাল এবং ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন..."
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
        "urology": "urology",
        "stomach": "gastroenterology",
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

    // Language Preference Handling
    if (userMessage.includes("english")) {
        userLanguage = "en";
        displayMessage("Language changed to English.", "bot");
    } else if (userMessage.includes("hindi")) {
        userLanguage = "hi";
        displayMessage("भाषा हिंदी में बदल दी गई।", "bot");
    } else if (userMessage.includes("bengali") || userMessage.includes("bangla")) {
        userLanguage = "bn";
        displayMessage("ভাষা বাংলা তে পরিবর্তন করা হয়েছে।", "bot");
    }

    // Handle basic responses
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
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    }
    // Handle symptoms or diseases
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
