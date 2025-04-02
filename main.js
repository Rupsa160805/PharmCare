// Default language is English
let selectedLanguage = "en";

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

// Multilingual Responses (English, Hindi, Bengali)
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "hospital": "Searching for nearby hospitals...",
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
        "hospital": "निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपना रोग या लक्षण बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hospital": "নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার রোগ বা লক্ষণ উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে পুনরায় বলুন।"
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

// Fetch nearby hospitals based on user's live location
function fetchNearbyHospitals() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            displayMessage("Fetching hospitals near your location...", "bot");

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();
                const locationName = data.display_name;

                // Get actual hospitals nearby
                const hospitalSearch = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:5000,${lat},${lon});out;`);
                const hospitalData = await hospitalSearch.json();
                
                let hospitals = hospitalData.elements.map(h => h.tags.name).filter(name => name).slice(0, 5);
                
                if (hospitals.length === 0) {
                    hospitals = ["No hospitals found nearby."];
                }

                displayMessage(`Nearby hospitals in ${locationName}:\n${hospitals.join("\n")}`, "bot");
            } catch (error) {
                displayMessage("Unable to fetch nearby hospitals. Please try again later.", "bot");
                console.error("Error fetching hospitals:", error);
            }
        }, () => {
            displayMessage("Unable to access your location. Please enable location services.", "bot");
        });
    } else {
        displayMessage("Geolocation is not supported by your browser.", "bot");
    }
}
