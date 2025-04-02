// Store the user's selected language (default: English)
let userLanguage = "en";

// Health Conditions Mapping
const healthConditions = {
    "heart": { specialist: "Cardiologist", key: "heart_disease" },
    "cardio": { specialist: "Cardiologist", key: "heart_disease" },
    "bones": { specialist: "Orthopedic", key: "bone_issue" },
    "orthopedic": { specialist: "Orthopedic", key: "bone_issue" },
    "nerves": { specialist: "Neurologist", key: "nerve_issue" },
    "neurology": { specialist: "Neurologist", key: "nerve_issue" },
    "cancer": { specialist: "Oncologist", key: "cancer_issue" },
    "oncology": { specialist: "Oncologist", key: "cancer_issue" },
    "skin": { specialist: "Dermatologist", key: "skin_issue" },
    "dermatology": { specialist: "Dermatologist", key: "skin_issue" },
    "pulmonary": { specialist: "Pulmonologist", key: "pulmonary_issue" },
    "fever": { specialist: "General Physician", key: "general_physician_issue" },
    "pain": { specialist: "General Physician", key: "general_physician_issue" },
    "women": { specialist: "Gynecologist", key: "women_issue" }
};

// Example Doctor Recommendations (can be expanded)
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

// Function to detect user's location for hospitals
function findNearbyHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                appendMessage("bot", responses[userLanguage]["location"]);

                // Fetch hospitals using web tool
                const query = "hospitals near me";
                const searchResults = await web.search(query);
                
                if (searchResults && searchResults.length > 0) {
                    let hospitalList = searchResults.slice(0, 3).map((hospital, index) => `${index + 1}. ${hospital.title}`).join("<br>");
                    appendMessage("bot", `Here are some nearby hospitals:<br>${hospitalList}`);
                } else {
                    appendMessage("bot", "Sorry, I couldn't find nearby hospitals.");
                }
            },
            () => appendMessage("bot", "Unable to detect your location.")
        );
    } else {
        appendMessage("bot", "Geolocation is not supported in your browser.");
    }
}

// Ensure Chatbot Initializes Properly
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");

    if (!sendButton || !userInput || !chatContainer) {
        console.error("Error: Missing chatbot elements in HTML.");
        return;
    }

    console.log("Chatbot initialized successfully.");

    sendButton.addEventListener("click", processUserInput);
    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            processUserInput();
        }
    });
});

// Function to Process User Input
function processUserInput() {
    const userInputField = document.getElementById("user-input");
    const userMessage = userInputField.value.trim();

    if (!userMessage) return;

    console.log("User input received:", userMessage);

    appendMessage("user", userMessage);
    userInputField.value = ""; // Clear input field after sending

    setTimeout(() => {
        generateBotResponse(userMessage);
    }, 500); // Adding slight delay for natural interaction
}

// Function to Append Messages to Chat
function appendMessage(sender, message) {
    const chatContainer = document.getElementById("chat-container");
    const messageDiv = document.createElement("div");

    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to latest message
}

// Function to Generate Chatbot Response
function generateBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let botResponse = responses[userLanguage]["default"];

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
    } else {
        // Check if input matches a health issue
        for (let key in healthConditions) {
            if (lowerInput.includes(key)) {
                const condition = healthConditions[key];
                const specialist = condition.specialist;
                const doctorList = doctors[specialist] || ["No doctor found"];

                botResponse = `${responses[userLanguage]["ask_disease"]}<br>
                You should see a **${specialist}**.<br>
                Recommended doctors:<br>${doctorList.join("<br>")}`;

                // Find nearby hospitals
                findNearbyHospitals();
                break;
            }
        }
    }

    appendMessage("bot", botResponse);
}
