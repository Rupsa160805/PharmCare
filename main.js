// Default Language (English)
let userLanguage = "en";

// Language Keywords Mapping
const languageMapping = {
    "english": "en",
    "hindi": "hi",
    "hindi me": "hi",
    "hindi mein": "hi",
    "bengali": "bn",
    "bangla": "bn",
    "বাংলা": "bn",
    "ইংরেজি": "en",
    "हिंदी": "hi"
};

// Health Conditions and Specialist Mapping
const healthConditions = {
    "heart": { specialist: "Cardiologist", key: "heart_disease" },
    "bones": { specialist: "Orthopedic", key: "bone_issue" },
    "nerves": { specialist: "Neurologist", key: "nerve_issue" },
    "cancer": { specialist: "Oncologist", key: "cancer_issue" },
    "skin": { specialist: "Dermatologist", key: "skin_issue" },
    "pulmonary": { specialist: "Pulmonologist", key: "pulmonary_issue" },
    "fever": { specialist: "General Physician", key: "general_physician_issue" },
    "women": { specialist: "Gynecologist", key: "women_issue" }
};

// Doctor Recommendations
const doctors = {
    "Cardiologist": ["Dr. Rajesh Sharma", "Dr. Sunita Verma"],
    "Orthopedic": ["Dr. Anil Kumar", "Dr. Rakesh Mehta"],
    "Neurologist": ["Dr. Neha Das", "Dr. Vikram Singh"],
    "Oncologist": ["Dr. Priya Malhotra", "Dr. Arvind Joshi"],
    "Dermatologist": ["Dr. Sneha Kapoor", "Dr. Pooja Reddy"],
    "Pulmonologist": ["Dr. Aman Tripathi", "Dr. Ritu Sharma"],
    "General Physician": ["Dr. Sanjay Gupta", "Dr. Meera Kapoor"],
    "Gynecologist": ["Dr. Ananya Ghosh", "Dr. Shweta Nair"]
};

// Multilingual Responses
const responses = {
    "en": {
        "greeting": "Hello! How can I assist you today?",
        "thanks": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "location": "Fetching your location to find nearby hospitals...",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?"
    },
    "hi": {
        "greeting": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "location": "मैं आपके स्थान का पता लगा रहा हूँ ताकि निकटतम अस्पताल खोज सकूँ...",
        "hospital": "चिकित्सा परीक्षणों और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी बीमारी या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टर और अस्पताल सुझा सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?"
    },
    "bn": {
        "greeting": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার অবস্থান সনাক্ত করছি যাতে কাছের হাসপাতাল খুঁজে বের করা যায়...",
        "hospital": "চিকিৎসার জন্য কাছাকাছি হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার ও হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে পুনরায় বলুন।"
    }
};

// Initialize chatbot
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Chatbot script loaded successfully.");

    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");

    if (!sendButton || !userInput || !chatContainer) {
        console.error("❌ Error: Missing chatbot elements in HTML.");
        return;
    }

    sendButton.addEventListener("click", processUserInput);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            processUserInput();
        }
    });

    console.log("✅ Chatbot event listeners initialized.");
});

// Process User Input
function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userMessage = userInputField.value.trim();

    if (!userMessage) return;

    console.log("💬 User input received:", userMessage);

    appendMessage("user", userMessage);
    userInputField.value = ""; // Clear input field

    setTimeout(() => {
        generateBotResponse(userMessage);
    }, 500);
}

// Append Messages to Chat
function appendMessage(sender, message) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Generate Bot Response
function generateBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let botResponse = responses[userLanguage]["default"];

    // Detect Language Change
    for (let lang in languageMapping) {
        if (lowerInput.includes(lang)) {
            userLanguage = languageMapping[lang];
            botResponse = responses[userLanguage]["greeting"];
            appendMessage("bot", botResponse);
            return;
        }
    }

    // Detect Health Issue
    for (let key in healthConditions) {
        if (lowerInput.includes(key)) {
            const condition = healthConditions[key];
            const specialist = condition.specialist;
            const doctorList = doctors[specialist] || ["No doctor found"];

            botResponse = `${specialist} specialist recommended.<br>
            Recommended doctors:<br>${doctorList.join("<br>")}<br>
            Now finding hospitals...`;

            appendMessage("bot", botResponse);
            findNearbyHospitals();
            return;
        }
    }

    // Standard Responses
    if (responses[userLanguage][lowerInput]) {
        botResponse = responses[userLanguage][lowerInput];
    }

    appendMessage("bot", botResponse);
}

// Fetch Nearby Hospitals with Name & Location
async function findNearbyHospitals() {
    appendMessage("bot", responses[userLanguage]["location"]);

    try {
        const searchResults = await web.search("hospitals near me with address");
        let hospitalList = searchResults
            .slice(0, 3)
            .map((hospital, index) => `${index + 1}. <strong>${hospital.title}</strong><br>📍 ${hospital.snippet}`)
            .join("<br><br>");

        appendMessage("bot", `<strong>Nearby Hospitals:</strong><br>${hospitalList}`);
    } catch (error) {
        appendMessage("bot", "❌ Sorry, unable to fetch hospital details.");
    }
}
