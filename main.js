// Default language is English
let selectedLanguage = "en";

// Language messages
const messages = {
    en: {
        response: "Based on your concern (%s), here are some recommended doctors:",
        no_doctors: "Sorry, no doctors available for this specialization at the moment.",
        hospitals: "Here are some hospitals specializing in this field:",
        no_hospitals: "Sorry, no hospitals found for this specialization.",
        ask_issue: "Please mention your health concern so I can suggest suitable doctors and hospitals."
    },
    hi: {
        response: "आपकी समस्या (%s) के आधार पर, यहां कुछ अनुशंसित डॉक्टर हैं:",
        no_doctors: "माफ़ कीजिए, इस विशेषता के लिए अभी कोई डॉक्टर उपलब्ध नहीं हैं।",
        hospitals: "इस क्षेत्र में विशेषज्ञ अस्पताल यहां हैं:",
        no_hospitals: "माफ़ कीजिए, इस विशेषता के लिए कोई अस्पताल नहीं मिला।",
        ask_issue: "कृपया अपनी स्वास्थ्य समस्या बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।"
    },
    bn: {
        response: "আপনার সমস্যার উপর ভিত্তি করে (%s), এখানে কিছু সুপারিশকৃত ডাক্তার রয়েছে:",
        no_doctors: "দুঃখিত, এই বিশেষজ্ঞের জন্য কোনো ডাক্তার পাওয়া যায়নি।",
        hospitals: "এই ক্ষেত্রে বিশেষজ্ঞ হাসপাতালগুলি এখানে:",
        no_hospitals: "দুঃখিত, এই বিশেষজ্ঞের জন্য কোনো হাসপাতাল পাওয়া যায়নি।",
        ask_issue: "অনুগ্রহ করে আপনার স্বাস্থ্য সমস্যা উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।"
    }
};

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
    "pregnancy": "Gynecologist",
    "mental health": "Psychiatrist",
    "depression": "Psychiatrist",
    "anxiety": "Psychiatrist",
    "stress": "Psychiatrist",
    "psychiatry": "Psychiatrist"
};

// Doctors List with Consultation Fees
const doctors = {
    "Psychiatrist": [
        { name: "Dr. Aman Gupta", fee: "₹1200" },
        { name: "Dr. Shruti Desai", fee: "₹1100" }
    ],
    "Dermatologist": [
        { name: "Dr. Sanjay Bose", fee: "₹600" },
        { name: "Dr. Payal Gupta", fee: "₹650" }
    ]
};

// Hospitals Categorized by Specialization
const hospitals = {
    "Psychiatrist": [
        "🏥 Mind Wellness Center, Park Street",
        "🏥 Mental Health Institute, Green Valley"
    ],
    "Dermatologist": [
        "🏥 Skin & Hair Clinic, Midtown",
        "🏥 Glow Dermatology Center, Central Plaza"
    ]
};

// Chatbot Initialization
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send-btn").addEventListener("click", processUserInput);
    document.getElementById("user-input").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            processUserInput();
        }
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

    // Health Condition Detection (Detect issue ANYWHERE in input)
    let foundKeyword = Object.keys(healthConditions).find(keyword => userText.includes(keyword));

    if (foundKeyword) {
        const specialization = healthConditions[foundKeyword];
        displayMessage(messages[selectedLanguage].response.replace("%s", foundKeyword), "bot");
        fetchDoctors(specialization);
        fetchNearbyHospitals(specialization);
        return;
    }

    // Default response
    displayMessage(messages[selectedLanguage].ask_issue, "bot");
}

// Display Messages in Chat
function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    if (!chatContainer) return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message.replace(/\n/g, "<br>"); // Preserve new lines
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fetch Doctor Details
function fetchDoctors(specialization) {
    const doctorList = doctors[specialization] || [];
    if (doctorList.length > 0) {
        const doctorMessage = doctorList.map(doc => `👨‍⚕️ <b>${doc.name}</b> (Fee: ${doc.fee})`).join("<br>");
        displayMessage(doctorMessage, "bot");
    } else {
        displayMessage(messages[selectedLanguage].no_doctors, "bot");
    }
}

// Fetch Nearby Hospitals Based on Specialization
function fetchNearbyHospitals(specialization) {
    const hospitalList = hospitals[specialization] || [];
    if (hospitalList.length > 0) {
        displayMessage(messages[selectedLanguage].hospitals, "bot");
        const hospitalMessage = hospitalList.map(hosp => `🏥 ${hosp}`).join("<br>");
        displayMessage(hospitalMessage, "bot");
    } else {
        displayMessage(messages[selectedLanguage].no_hospitals, "bot");
    }
}
