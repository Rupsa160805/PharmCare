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
        "checkup": "You should consider scheduling a health checkup along with a consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी आज किस प्रकार सहायता कर सकता हूँ?",
        "location": "कृपया अपना स्थान साझा करें ताकि मैं आपके निकटतम क्लिनिक या अस्पताल खोज सकूं।",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण का उल्लेख करें ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।",
        "location_confirm": "समझ गया! मैं आपके स्थान के निकट अस्पतालों की खोज कर रहा हूँ। कृपया प्रतीक्षा करें..."
    },
    "bn": {
        "hello": "হ্যালো! আমি কিভাবে আপনাকে সাহায্য করতে পারি?",
        "location": "অনুগ্রহ করে আপনার বর্তমান অবস্থান জানান যাতে কাছের ক্লিনিক বা হাসপাতাল খুঁজে বের করা যায়।",
        "ask_disease": "আপনার রোগ বা লক্ষণগুলি উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "location_confirm": "বোঝা গেল! আপনার অবস্থানের কাছাকাছি হাসপাতাল এবং ক্লিনিক খুঁজছি... অনুগ্রহ করে অপেক্ষা করুন।"
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
    }
];

// Display User and Bot Messages
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "bot" ? "bot-message" : "user-message";
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
    if (sender === "bot") {
        speakText(message); // Speak the bot's response
    }
}

// Text-to-Speech Function
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = userLanguage === "en" ? "en-US" :
                  userLanguage === "hi" ? "hi-IN" : 
                  "bn-BD"; // Bengali
    window.speechSynthesis.speak(speech);
}

// Find Doctors for Specialty and Location
function findDoctorsForSpecialtyAndLocation(specialty, location) {
    const matchingHospitals = hospitalData.filter(hospital =>
        hospital.location.toLowerCase() === location.toLowerCase() &&
        hospital.specialties.map(s => s.toLowerCase()).includes(specialty.toLowerCase())
    );

    if (matchingHospitals.length > 0) {
        let response = `Here are some hospitals near ${location} with ${specialty} services:\n\n`;
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
        "cancer": "cancer",
        "brain": "neurology",
        "bones": "orthopedics",
        "skin": "dermatology",
        "lungs": "pulmonology",
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

    // Handle basic responses
    if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Handle location input
    else if (userMessage.startsWith("location")) {
        userLocation = userMessage.slice(9).trim();
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
    // Handle single-word disease inputs
    else if (Object.keys(responses[userLanguage]).includes(userMessage)) {
        displayMessage(responses[userLanguage][userMessage], "bot");
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

// Voice Recognition Function
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = userLanguage === "en" ? "en-US" :
                       userLanguage === "hi" ? "hi-IN" : 
                       "bn-BD"; // Bengali

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        displayMessage(transcript, "user");
        processUserInput(transcript);
    };

    recognition.onerror = (event) => {
        displayMessage("Sorry, I didn't catch that. Please try again.", "bot");
    };
}

// Add Voice Input Button
const voiceBtn = document.createElement("button");
voiceBtn.innerText = "🎤 Speak";
voiceBtn.onclick = startListening;
chatContainer.parentElement.insertBefore(voiceBtn, chatContainer);
