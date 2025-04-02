// Store user's selected language (default: English)
let userLanguage = "en";

// Health Conditions Mapping
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
        "thanks": "आपका स्वागत है! स्वस्थ रहें।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "language": "मैं कई भाषाओं में सहायता कर सकता हूँ। आप किस भाषा को प्राथमिकता देते हैं? (अंग्रेजी, हिंदी, बंगाली)",
        "location": "आपका स्थान खोज रहा हूँ ताकि निकटतम अस्पताल मिल सके...",
        "hospital": "चिकित्सा परीक्षणों और जांच के लिए निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। कृपया दोहराएँ।"
    },
    "bn": {
        "greeting": "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "language": "আমি একাধিক ভাষায় সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা)",
        "location": "আপনার অবস্থান খুঁজছি যাতে কাছের হাসপাতাল খুঁজে পাওয়া যায়...",
        "hospital": "চিকিৎসা পরীক্ষার জন্য কাছের হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার ও হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। অনুগ্রহ করে পুনরায় বলুন।"
    }
};

// Ensure chatbot initializes properly
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

// Function to Process User Input
function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userMessage = userInputField.value.trim();

    if (!userMessage) return;

    console.log("💬 User input received:", userMessage);

    appendMessage("user", userMessage);
    userInputField.value = ""; // Clear input field

    setTimeout(() => {
        generateBotResponse(userMessage);
    }, 500); // Slight delay for a natural interaction
}

// Function to Append Messages to Chat
function appendMessage(sender, message) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to latest message

    console.log(`✅ Message appended: [${sender}] ${message}`);
}

// Function to Generate Chatbot Response
function generateBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let botResponse = responses[userLanguage]["default"];

    // Language Selection
    if (lowerInput.includes("language")) {
        botResponse = responses[userLanguage]["language"];
    } else if (lowerInput.includes("english")) {
        userLanguage = "en";
        botResponse = "Language set to English.";
    } else if (lowerInput.includes("hindi")) {
        userLanguage = "hi";
        botResponse = "भाषा हिंदी में बदल दी गई।";
    } else if (lowerInput.includes("bengali") || lowerInput.includes("bangla")) {
        userLanguage = "bn";
        botResponse = "ভাষা বাংলায় পরিবর্তন করা হয়েছে।";
    } 
    // Greeting Responses
    else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = responses[userLanguage]["greeting"];
    } else if (lowerInput.includes("thanks") || lowerInput.includes("thank you")) {
        botResponse = responses[userLanguage]["thanks"];
    } else if (lowerInput.includes("sorry")) {
        botResponse = responses[userLanguage]["sorry"];
    } 
    // Health Issue Recognition
    else {
        for (let key in healthConditions) {
            if (lowerInput.includes(key)) {
                const condition = healthConditions[key];
                const specialist = condition.specialist;
                const doctorList = doctors[specialist] || ["No doctor found"];

                botResponse = `আপনাকে **${specialist}** এর সাথে যোগাযোগ করতে হবে।<br>
                সুপারিশকৃত ডাক্তার:<br>${doctorList.join("<br>")}`;

                // Find nearby hospitals
                findNearbyHospitals();
                break;
            }
        }
    }

    appendMessage("bot", botResponse);
}

// Function to Detect User's Location and Find Nearby Hospitals
async function findNearbyHospitals() {
    appendMessage("bot", responses[userLanguage]["location"]);

    try {
        const searchResults = await web.search("hospitals near me");

        if (searchResults && searchResults.length > 0) {
            let hospitalList = searchResults.slice(0, 3).map((hospital, index) => `${index + 1}. ${hospital.title}`).join("<br>");
            appendMessage("bot", hospitalList);
        }
    } catch (error) {
        appendMessage("bot", "Sorry, unable to fetch hospital details.");
    }
}
