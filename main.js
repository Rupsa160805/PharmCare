// Default language is English
let selectedLanguage = "en";

// Health Conditions Mapping to Specializations
const healthConditions = {
    "heart": "Cardiologist", "cardio": "Cardiologist", "blood pressure": "Cardiologist",
    "hypertension": "Cardiologist", "bp": "Cardiologist",
    "bones": "Orthopedic", "fracture": "Orthopedic", "joint pain": "Orthopedic",
    "nerves": "Neurologist", "neurology": "Neurologist", "migraine": "Neurologist",
    "cancer": "Oncologist", "tumor": "Oncologist",
    "skin": "Dermatologist", "pimples": "Dermatologist", "acne": "Dermatologist",
    "rashes": "Dermatologist", "eczema": "Dermatologist", "allergy": "Dermatologist",
    "psoriasis": "Dermatologist",
    "piles": "Proctologist", "hemorrhoids": "Proctologist", "anal bleeding": "Proctologist",
    "pulmonary": "Pulmonologist", "lungs": "Pulmonologist", "breathing": "Pulmonologist",
    "asthma": "Pulmonologist", "cough": "Pulmonologist",
    "fever": "General Physician", "pain": "General Physician", "headache": "General Physician",
    "women": "Gynecologist", "pregnancy": "Gynecologist", "period": "Gynecologist",
    "mental": "Psychiatrist", "depression": "Psychiatrist", "anxiety": "Psychiatrist",
    "stress": "Psychiatrist", "insomnia": "Psychiatrist"
};

// Doctors List with Fees
const doctors = {
    "Cardiologist": [{ name: "Dr. Rajesh Sharma", fee: "₹800" }, { name: "Dr. Anjali Mehta", fee: "₹900" }],
    "Orthopedic": [{ name: "Dr. Vikram Das", fee: "₹700" }, { name: "Dr. Riya Sen", fee: "₹750" }],
    "Neurologist": [{ name: "Dr. Alok Verma", fee: "₹1000" }, { name: "Dr. Sneha Kapoor", fee: "₹950" }],
    "Oncologist": [{ name: "Dr. Rajiv Menon", fee: "₹1500" }, { name: "Dr. Neha Agarwal", fee: "₹1400" }],
    "Dermatologist": [{ name: "Dr. Sanjay Bose", fee: "₹600" }, { name: "Dr. Payal Gupta", fee: "₹650" }],
    "Pulmonologist": [{ name: "Dr. Arvind Iyer", fee: "₹900" }, { name: "Dr. Kiran Das", fee: "₹850" }],
    "Gynecologist": [{ name: "Dr. Kavita Sharma", fee: "₹900" }, { name: "Dr. Poonam Das", fee: "₹850" }],
    "General Physician": [{ name: "Dr. Ramesh Patil", fee: "₹400" }, { name: "Dr. Priya Malhotra", fee: "₹450" }],
    "Proctologist": [{ name: "Dr. Amit Sen", fee: "₹1000" }, { name: "Dr. Sunita Nair", fee: "₹950" }],
    "Psychiatrist": [{ name: "Dr. Sameer Bhattacharya", fee: "₹1200" }, { name: "Dr. Meera Kapoor", fee: "₹1150" }]
};

// Hospitals by Specialization
const hospitals = {
    "Cardiologist": ["🏥 Heart Care Hospital", "🏥 Pulse Cardiac Center"],
    "Orthopedic": ["🏥 Bone & Joint Clinic", "🏥 Ortho Plus Hospital"],
    "Neurologist": ["🏥 Brain & Spine Institute", "🏥 Neuro Care Hospital"],
    "Oncologist": ["🏥 Cancer Institute", "🏥 Oncology Care Center"],
    "Dermatologist": ["🏥 Skin & Hair Clinic", "🏥 Glow Dermatology Center"],
    "Pulmonologist": ["🏥 Respiratory Health Center", "🏥 Pulmonary Care Hospital"],
    "Gynecologist": ["🏥 Women's Health Center", "🏥 Motherhood Hospital"],
    "General Physician": ["🏥 MedLife Clinic", "🏥 City General Hospital"],
    "Proctologist": ["🏥 Piles & Anorectal Clinic", "🏥 Proctology Care Center"],
    "Psychiatrist": ["🏥 Mind & Wellness Center", "🏥 Serenity Mental Health Clinic"]
};

// Multilingual Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today? 😊",
        "thanks": "You're welcome! Take care. 😊",
        "sorry": "No worries! Let me know how I can help. 😊",
        "ask_disease": "Please mention your health concern so I can assist you.",
        "doctor_recommendation": "Here are some recommended doctors for you:",
        "hospital_recommendation": "Here are some hospitals that specialize in this field:"
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ? 😊",
        "thanks": "आपका स्वागत है! ध्यान रखें। 😊",
        "sorry": "कोई बात नहीं! बताइए, मैं आपकी कैसे मदद कर सकता हूँ? 😊",
        "ask_disease": "कृपया अपनी स्वास्थ्य समस्या बताएं।",
        "doctor_recommendation": "आपके लिए अनुशंसित डॉक्टर यहाँ हैं:",
        "hospital_recommendation": "यहाँ कुछ संबंधित अस्पताल हैं:"
    },
    "bn": {
        "hello": "হ্যালো! আমি কিভাবে সাহায্য করতে পারি? 😊",
        "thanks": "আপনার স্বাগতম! ভালো থাকুন। 😊",
        "sorry": "কোন সমস্যা নেই! বলুন, আমি কিভাবে সাহায্য করতে পারি? 😊",
        "ask_disease": "আপনার স্বাস্থ্য সমস্যাটি উল্লেখ করুন।",
        "doctor_recommendation": "আপনার জন্য সুপারিশকৃত ডাক্তার এখানে:",
        "hospital_recommendation": "এখানে কিছু সংশ্লিষ্ট হাসপাতাল রয়েছে:"
    }
};

// Chatbot Initialization
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send-btn").addEventListener("click", processUserInput);
    document.getElementById("user-input").addEventListener("keypress", (event) => {
        if (event.key === "Enter") processUserInput();
    });
});

// Process User Input
function processUserInput() {
    let userInput = document.getElementById("user-input").value.trim().toLowerCase();
    if (!userInput) return;

    displayMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    if (userInput.includes("hindi")) {
        selectedLanguage = "hi";
        displayMessage("अब से मैं हिंदी में जवाब दूंगा। 😊", "bot");
        return;
    } else if (userInput.includes("bengali")) {
        selectedLanguage = "bn";
        displayMessage("এখন থেকে আমি বাংলায় উত্তর দেব। 😊", "bot");
        return;
    } else if (userInput.includes("english")) {
        selectedLanguage = "en";
        displayMessage("I will now respond in English. 😊", "bot");
        return;
    }

    for (let keyword in healthConditions) {
        if (userInput.includes(keyword)) {
            let specialization = healthConditions[keyword];
            displayMessage(responses[selectedLanguage]["doctor_recommendation"], "bot");
            fetchDoctors(specialization);
            fetchHospitals(specialization);
            return;
        }
    }

    if (userInput.includes("thanks") || userInput.includes("thank you")) {
        displayMessage(responses[selectedLanguage]["thanks"], "bot");
    } else if (userInput.includes("sorry")) {
        displayMessage(responses[selectedLanguage]["sorry"], "bot");
    } else {
        displayMessage(responses[selectedLanguage]["ask_disease"], "bot");
    }
}

// Fetch Doctor Details
function fetchDoctors(specialization) {
    let doctorList = doctors[specialization] || [];
    if (doctorList.length > 0) {
        displayMessage(doctorList.map(d => `👨‍⚕️ ${d.name} (Fee: ${d.fee})`).join("\n"), "bot");
    }
}

// Fetch Hospitals
function fetchHospitals(specialization) {
    let hospitalList = hospitals[specialization] || [];
    if (hospitalList.length > 0) {
        displayMessage(responses[selectedLanguage]["hospital_recommendation"], "bot");
        displayMessage(hospitalList.join("\n"), "bot");
    }
}
