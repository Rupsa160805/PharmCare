// Default language is English
let selectedLanguage = "en";

// Translations for multilingual support
const translations = {
    en: {
        greeting: "Hello! How can I assist you today? 😊",
        thanks: "You're welcome! Let me know if you need any more help. 🤗",
        sorry: "No worries! How can I assist you? 😊",
        switchEnglish: "I will now respond in English.",
        switchHindi: "अब से मैं हिंदी में जवाब दूंगा।",
        switchBengali: "এখন থেকে আমি বাংলায় উত্তর দেব।",
        doctorIntro: "Here are some recommended doctors for",
        hospitalIntro: "Here are some hospitals for this specialization:",
        notUnderstood: "I didn't understand. Please mention a health issue or ask for a doctor."
    },
    hi: {
        greeting: "नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ? 😊",
        thanks: "आपका स्वागत है! मुझे बताइए कि क्या मैं और मदद कर सकता हूँ। 🤗",
        sorry: "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ? 😊",
        switchEnglish: "अब मैं अंग्रेज़ी में उत्तर दूँगा।",
        switchHindi: "अब से मैं हिंदी में जवाब दूंगा।",
        switchBengali: "अब से मैं बंगाली में उत्तर दूँगा।",
        doctorIntro: "यहाँ कुछ अनुशंसित डॉक्टर हैं",
        hospitalIntro: "इस विशेषज्ञता के लिए कुछ अस्पताल हैं:",
        notUnderstood: "मुझे समझ नहीं आया। कृपया किसी स्वास्थ्य समस्या का उल्लेख करें या डॉक्टर से पूछें।"
    },
    bn: {
        greeting: "হ্যালো! আমি আজ আপনাকে কীভাবে সাহায্য করতে পারি? 😊",
        thanks: "আপনার স্বাগতম! আমাকে জানান যদি আরও সাহায্য প্রয়োজন হয়। 🤗",
        sorry: "কোনও সমস্যা নেই! আমি আপনাকে কীভাবে সাহায্য করতে পারি? 😊",
        switchEnglish: "আমি এখন ইংরেজিতে উত্তর দেব।",
        switchHindi: "আমি এখন হিন্দিতে উত্তর দেব।",
        switchBengali: "এখন থেকে আমি বাংলায় উত্তর দেব।",
        doctorIntro: "এখানে কিছু সুপারিশকৃত ডাক্তার আছেন",
        hospitalIntro: "এই বিশেষায়নের জন্য কিছু হাসপাতাল:",
        notUnderstood: "আমি বুঝতে পারিনি। অনুগ্রহ করে একটি স্বাস্থ্য সমস্যা উল্লেখ করুন বা ডাক্তার সম্পর্কে জিজ্ঞাসা করুন।"
    }
};

// Function to get translated text based on selected language
function translate(key) {
    return translations[selectedLanguage][key];
}

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
        displayMessage(translate("switchHindi"), "bot");
        return;
    } else if (userText.includes("bengali")) {
        selectedLanguage = "bn";
        displayMessage(translate("switchBengali"), "bot");
        return;
    } else if (userText.includes("english")) {
        selectedLanguage = "en";
        displayMessage(translate("switchEnglish"), "bot");
        return;
    }

    // Detect Health Issues
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            const specialization = healthConditions[keyword];
            displayMessage(`${translate("doctorIntro")} ${specialization}:`, "bot");
            fetchDoctors(specialization);
            fetchNearbyHospitals(specialization);
            return;
        }
    }

    // Friendly Responses
    if (userText.includes("hello") || userText.includes("hi")) {
        displayMessage(translate("greeting"), "bot");
        return;
    }
    if (userText.includes("thanks") || userText.includes("thank you")) {
        displayMessage(translate("thanks"), "bot");
        return;
    }
    if (userText.includes("sorry")) {
        displayMessage(translate("sorry"), "bot");
        return;
    }

    // Default Response
    displayMessage(translate("notUnderstood"), "bot");
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
    displayMessage(translate("hospitalIntro"), "bot");
    displayMessage(hospitals[specialization].join("\n"), "bot");
}
