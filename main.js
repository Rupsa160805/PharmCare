// Health Conditions Mapping
const healthConditions = {
    "heart": "heart_disease",
    "cardio": "heart_disease",
    "bones": "bone_issue",
    "orthopedic": "bone_issue",
    "nerves": "nerve_issue",
    "neurology": "nerve_issue",
    "cancer": "cancer_issue",
    "oncology": "cancer_issue",
    "skin": "skin_issue",
    "dermatology": "skin_issue",
    "pulmonary": "pulmonary_issue",
    "fever": "general_physician_issue",
    "pain": "general_physician_issue",
    "women": "women_issue"
};

// Default language is English
let selectedLanguage = "en";

// Multilingual Responses (English, Hindi, Bengali)
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "location": "Fetching your current location to find nearby clinics and hospitals...",
        "clinic": "Searching for clinics near your location. Please wait...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "heart_disease": "For heart-related issues, you may consult a Cardiologist. Fetching nearby hospitals...",
        "bone_issue": "For bone problems, an Orthopedic specialist would be helpful. Fetching nearby hospitals...",
        "nerve_issue": "For nerve issues, I recommend consulting a Neurologist. Fetching nearby hospitals...",
        "cancer_issue": "For cancer concerns, please consult an Oncologist. Fetching nearby hospitals...",
        "skin_issue": "For skin problems, a Dermatologist is the best choice. Fetching nearby hospitals...",
        "pulmonary_issue": "For pulmonary issues, you should consult a Pulmonologist. Searching for nearby hospitals...",
        "general_physician_issue": "For fever or general pain, you should consult a General Physician. Searching for nearby hospitals...",
        "women_issue": "For women's health issues, you may consult a Gynecologist. Searching for nearby hospitals..."
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्कार! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! मुझे बताएं कि और कोई सहायता चाहिए।",
        "thank you": "धन्यवाद! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "location": "मैं आपके स्थान का पता लगा रहा हूँ ताकि निकटतम क्लिनिक या अस्पताल खोज सकूं।",
        "clinic": "मैं आपके स्थान के निकट क्लिनिक खोज रहा हूँ। कृपया प्रतीक्षा करें...",
        "hospital": "चिकित्सा परीक्षणों और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?",
        "heart_disease": "हृदय से जुड़ी समस्याओं के लिए, आप किसी हृदय रोग विशेषज्ञ से परामर्श करें।"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "location": "আপনার অবস্থান সনাক্ত করছি যাতে কাছের হাসপাতাল বা ক্লিনিক খুঁজে বের করা যায়।",
        "clinic": "আপনার অবস্থানের কাছাকাছি ক্লিনিক খুঁজছি। অনুগ্রহ করে অপেক্ষা করুন...",
        "hospital": "চিকিৎসা পরীক্ষা এবং চেকআপের জন্য কাছের হাসপাতাল খুঁজছি..."
    }
};

// Ensure Chatbot Initializes Properly
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");

    if (!sendButton || !userInput || !chatContainer) {
        console.error("Error: Some chatbot elements are missing in HTML.");
        return;
    }

    sendButton.addEventListener("click", processUserInput);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            processUserInput();
        }
    });

    console.log("Chatbot initialized.");
});

function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userText = userInputField.value.trim().toLowerCase();

    if (!userText) return;

    displayMessage(userText, "user");
    userInputField.value = "";

    // Check if user requested a language change
    if (userText.includes("hindi")) selectedLanguage = "hi";
    else if (userText.includes("bengali")) selectedLanguage = "bn";
    else if (userText.includes("english")) selectedLanguage = "en";

    // Look for predefined responses
    let botResponse = responses[selectedLanguage][userText] || responses[selectedLanguage]["default"];

    // Check if user mentioned a health issue
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            botResponse = responses[selectedLanguage][healthConditions[keyword]];
            fetchNearbyHospitals();
            break;
        }
    }

    displayMessage(botResponse, "bot");
}

function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fetch nearby hospitals
function fetchNearbyHospitals() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            const locationName = data.display_name;

            displayMessage(`Fetching hospitals near ${locationName}...`, "bot");

            // Dummy hospital response (replace with actual API if needed)
            const hospitalList = [
                "Apollo Gleneagles Hospital, Kolkata",
                "Woodlands Multispeciality Hospital, Kolkata",
                "Desun Hospital, Kolkata"
            ];

            displayMessage(`Recommended Hospitals:\n${hospitalList.join("\n")}`, "bot");
        });
    } else {
        displayMessage("Geolocation is not supported by your browser.", "bot");
    }
}
