// Default language is English
let selectedLanguage = "en";

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
    "dermatology": "Dermatologist",
    "pulmonary": "Pulmonologist",
    "fever": "General Physician",
    "pain": "General Physician",
    "women": "Gynecologist"
};

// Doctors List with Consultation Fees
const doctors = {
    "Cardiologist": [
        { name: "Dr. Rajesh Sharma", fee: "₹800" },
        { name: "Dr. Anjali Mehta", fee: "₹900" }
    ],
    "Orthopedic": [
        { name: "Dr. Vikram Das", fee: "₹700" },
        { name: "Dr. Riya Sen", fee: "₹750" }
    ],
    "Neurologist": [
        { name: "Dr. Alok Verma", fee: "₹1000" },
        { name: "Dr. Sneha Kapoor", fee: "₹950" }
    ],
    "Oncologist": [
        { name: "Dr. Neeraj Khanna", fee: "₹1200" },
        { name: "Dr. Aisha Gupta", fee: "₹1100" }
    ],
    "Dermatologist": [
        { name: "Dr. Sunita Rao", fee: "₹500" },
        { name: "Dr. Kunal Bose", fee: "₹600" }
    ],
    "Pulmonologist": [
        { name: "Dr. Meera Nair", fee: "₹850" },
        { name: "Dr. Amit Roy", fee: "₹800" }
    ],
    "General Physician": [
        { name: "Dr. Ramesh Patil", fee: "₹400" },
        { name: "Dr. Priya Malhotra", fee: "₹450" }
    ],
    "Gynecologist": [
        { name: "Dr. Kavita Sharma", fee: "₹900" },
        { name: "Dr. Poonam Das", fee: "₹850" }
    ]
};

// Multilingual Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali)",
        "ask_disease": "Please mention your health concern so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "doctor_recommendation": "Based on your concern, here are some recommended doctors:",
        "hospital_recommendation": "Here are some nearby hospitals:"
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "आपका स्वागत है! मुझे बताएं कि और कोई सहायता चाहिए।",
        "language": "मैं कई भाषाओं में आपकी सहायता कर सकता हूँ। आप किस भाषा को पसंद करते हैं? (अंग्रेजी, हिंदी, बंगाली)",
        "ask_disease": "कृपया अपनी समस्या बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "default": "मुझे क्षमा करें, मैं इसे समझ नहीं पाया। क्या आप इसे दोहरा सकते हैं?",
        "doctor_recommendation": "आपकी समस्या के अनुसार, यहाँ कुछ अनुशंसित डॉक्टर हैं:",
        "hospital_recommendation": "यहाँ कुछ निकटतम अस्पताल हैं:"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "language": "আমি একাধিক ভাষায় আপনাকে সহায়তা করতে পারি। আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা)",
        "ask_disease": "আপনার সমস্যার কথা উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "default": "দুঃখিত, আমি এটি বুঝতে পারিনি। দয়া করে পুনরায় বলুন।",
        "doctor_recommendation": "আপনার সমস্যার ভিত্তিতে, এখানে কিছু সুপারিশকৃত ডাক্তার আছেন:",
        "hospital_recommendation": "এখানে কিছু নিকটস্থ হাসপাতাল রয়েছে:"
    }
};

// Chatbot Initialization
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send-btn").addEventListener("click", processUserInput);
    document.getElementById("user-input").addEventListener("keypress", (event) => {
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

    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            displayMessage(responses[selectedLanguage]["doctor_recommendation"], "bot");
            fetchDoctors(healthConditions[keyword]);
            fetchNearbyHospitals();
            return;
        }
    }

    displayMessage(responses[selectedLanguage][userText] || responses[selectedLanguage]["default"], "bot");
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
    const doctorList = doctors[specialization] || [];
    let doctorMessage = doctorList.map(doc => `${doc.name} (Fee: ${doc.fee})`).join("\n");

    if (!doctorMessage) doctorMessage = "No available doctors for this specialization.";
    displayMessage(doctorMessage, "bot");
}

// Fetch Nearby Hospitals
async function fetchNearbyHospitals() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                // Call a backend API to get hospitals (replace 'your-api-endpoint' with an actual API)
                const response = await fetch(`your-api-endpoint?lat=${lat}&lon=${lon}`);
                const data = await response.json();

                if (data && data.hospitals.length > 0) {
                    displayMessage(responses[selectedLanguage]["hospital_recommendation"], "bot");

                    data.hospitals.forEach(hospital => {
                        displayMessage(`${hospital.name} - ${hospital.location}`, "bot");
                    });
                } else {
                    displayMessage("No hospitals found nearby.", "bot");
                }
            } catch (error) {
                displayMessage("Error fetching hospital data.", "bot");
            }
        }, () => {
            displayMessage("Unable to access your location. Please enable location services.", "bot");
        });
    } else {
        displayMessage("Geolocation is not supported by your browser.", "bot");
    }
}
