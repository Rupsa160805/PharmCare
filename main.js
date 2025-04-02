console.log("Chatbot script loaded successfully!");

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

// Hardcoded Hospital Data based on Approximate Locations
const hospitals = [
    { name: { en: "City Hospital", hi: "सिटी अस्पताल", bn: "সিটি হাসপাতাল" }, latRange: [22.50, 22.60], lonRange: [88.30, 88.40], address: "Park Street, Kolkata" },
    { name: { en: "Metro Care Hospital", hi: "मेट्रो केयर अस्पताल", bn: "মেট্রো কেয়ার হাসপাতাল" }, latRange: [28.60, 28.70], lonRange: [77.10, 77.20], address: "Connaught Place, Delhi" },
    { name: { en: "Green Cross Medical", hi: "ग्रीन क्रॉस मेडिकल", bn: "গ্রীন ক্রস মেডিক্যাল" }, latRange: [19.00, 19.10], lonRange: [72.80, 72.90], address: "Andheri, Mumbai" },
    { name: { en: "Sunrise Hospital", hi: "सनराइज अस्पताल", bn: "সানরাইজ হাসপাতাল" }, latRange: [13.00, 13.10], lonRange: [77.50, 77.60], address: "MG Road, Bangalore" },
    { name: { en: "Apollo Clinic", hi: "अपोलो क्लिनिक", bn: "অ্যাপোলো ক্লিনিক" }, latRange: [17.40, 17.50], lonRange: [78.40, 78.50], address: "Banjara Hills, Hyderabad" }
];

// Multilingual Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "hospital": "Searching for nearby hospitals...",
        "ask_disease": "Please mention your health concern so I can suggest suitable doctors and hospitals.",
        "doctor_recommendation": "Based on your concern, here are some recommended doctors:"
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्कार! मैं आपकी क्या मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! कोई और सहायता चाहिए?",
        "thank you": "धन्यवाद! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hospital": "निकटतम अस्पताल खोज रहा हूँ...",
        "ask_disease": "कृपया अपनी समस्या बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "doctor_recommendation": "आपकी समस्या के अनुसार, यहाँ कुछ अनुशंसित डॉक्टर हैं:"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "hospital": "নিকটবর্তী হাসপাতাল খুঁজছি...",
        "ask_disease": "আপনার সমস্যার কথা উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "doctor_recommendation": "আপনার সমস্যার ভিত্তিতে, এখানে কিছু সুপারিশকৃত ডাক্তার আছেন:"
    }
};

// Initialize Chatbot
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

// Fetch Doctors
function fetchDoctors(specialization) {
    const doctorList = doctors[specialization] || [];
    let doctorMessage = doctorList.map(doc => `${doc.name} (Fee: ${doc.fee})`).join("\n");
    displayMessage(doctorMessage || "No available doctors.", "bot");
}

// Fetch Nearby Hospitals
function fetchNearbyHospitals() {
    navigator.geolocation.getCurrentPosition((position) => {
        let userLat = position.coords.latitude, userLon = position.coords.longitude;
        let nearbyHospitals = hospitals.filter(h => userLat >= h.latRange[0] && userLat <= h.latRange[1] && userLon >= h.lonRange[0] && userLon <= h.lonRange[1]);
        displayMessage(nearbyHospitals.length ? nearbyHospitals.map(h => `${h.name[selectedLanguage]} - ${h.address}`).join("\n") : "No hospitals found.", "bot");
    });
}
