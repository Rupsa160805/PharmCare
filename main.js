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
    "pregnancy": "Gynecologist"
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
        { name: "Dr. Rajiv Menon", fee: "₹1500" },
        { name: "Dr. Neha Agarwal", fee: "₹1400" }
    ],
    "Dermatologist": [
        { name: "Dr. Sanjay Bose", fee: "₹600" },
        { name: "Dr. Payal Gupta", fee: "₹650" }
    ],
    "Pulmonologist": [
        { name: "Dr. Arvind Iyer", fee: "₹900" },
        { name: "Dr. Kiran Das", fee: "₹850" }
    ],
    "Gynecologist": [
        { name: "Dr. Kavita Sharma", fee: "₹900" },
        { name: "Dr. Poonam Das", fee: "₹850" }
    ],
    "General Physician": [
        { name: "Dr. Ramesh Patil", fee: "₹400" },
        { name: "Dr. Priya Malhotra", fee: "₹450" }
    ],
    "Proctologist": [
        { name: "Dr. Amit Sen", fee: "₹1000" },
        { name: "Dr. Sunita Nair", fee: "₹950" }
    ]
};

// Hospitals Categorized by Specialization
const hospitals = {
    "Cardiologist": [
        "🏥 Heart Care Hospital, Main Street",
        "🏥 Pulse Cardiac Center, Downtown"
    ],
    "Orthopedic": [
        "🏥 Bone & Joint Clinic, City Center",
        "🏥 Ortho Plus Hospital, Park Avenue"
    ],
    "Neurologist": [
        "🏥 Brain & Spine Institute, Lake Road",
        "🏥 Neuro Care Hospital, Tech Park"
    ],
    "Oncologist": [
        "🏥 Cancer Institute, South Block",
        "🏥 Oncology Care Center, West End"
    ],
    "Dermatologist": [
        "🏥 Skin & Hair Clinic, Midtown",
        "🏥 Glow Dermatology Center, Central Plaza"
    ],
    "Pulmonologist": [
        "🏥 Respiratory Health Center, Green Valley",
        "🏥 Pulmonary Care Hospital, Elm Street"
    ],
    "Gynecologist": [
        "🏥 Women's Health Center, Green Lane",
        "🏥 Motherhood Hospital, City Square"
    ],
    "General Physician": [
        "🏥 MedLife Clinic, High Street",
        "🏥 City General Hospital, Downtown"
    ],
    "Proctologist": [
        "🏥 Piles & Anorectal Clinic, City Hospital",
        "🏥 Proctology Care Center, East Side"
    ]
};

// Multilingual Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "language": "Which language do you prefer? (English, Hindi, Bengali)",
        "ask_disease": "Please mention your health concern so I can suggest suitable doctors and hospitals.",
        "doctor_recommendation": "Based on your concern, here are some recommended doctors:",
        "hospital_recommendation": "Here are some hospitals near you specializing in this field:"
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "hi": "नमस्ते! मैं आपकी क्या मदद कर सकता हूँ?",
        "thanks": "आपका स्वागत है! मुझे बताएं कि और कोई सहायता चाहिए।",
        "thank you": "धन्यवाद! स्वस्थ रहिए।",
        "sorry": "कोई बात नहीं! मैं आपकी किस प्रकार सहायता कर सकता हूँ?",
        "language": "आप कौन सी भाषा पसंद करते हैं? (अंग्रेज़ी, हिंदी, बंगाली)",
        "ask_disease": "कृपया अपनी समस्या बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "doctor_recommendation": "आपकी समस्या के अनुसार, यहाँ कुछ अनुशंसित डॉक्टर हैं:",
        "hospital_recommendation": "यहाँ आपके निकटतम अस्पताल हैं जो इस क्षेत्र में विशेषज्ञता रखते हैं:"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "hi": "হ্যালো! আমি কিভাবে সাহায্য করতে পারি?",
        "thanks": "আপনার স্বাগতম! আরও সাহায্যের প্রয়োজন হলে আমাকে জানান।",
        "thank you": "ধন্যবাদ! সুস্থ থাকুন।",
        "sorry": "কোনো সমস্যা নেই! আমি কীভাবে সাহায্য করতে পারি?",
        "language": "আপনি কোন ভাষা পছন্দ করেন? (ইংরেজি, হিন্দি, বাংলা)",
        "ask_disease": "আপনার সমস্যার কথা উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "doctor_recommendation": "আপনার সমস্যার ভিত্তিতে, এখানে কিছু সুপারিশকৃত ডাক্তার আছেন:",
        "hospital_recommendation": "এখানে আপনার কাছাকাছি কিছু হাসপাতাল রয়েছে যা এই ক্ষেত্রে বিশেষজ্ঞ:"
    }
};

// Process user input
function processUserInput() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    if (!userInput) return;

    displayMessage(userInput, "user");
    document.getElementById("user-input").value = "";

    if (userInput.includes("hindi")) {
        selectedLanguage = "hi";
        displayMessage(responses[selectedLanguage]["language"], "bot");
        return;
    } else if (userInput.includes("bengali")) {
        selectedLanguage = "bn";
        displayMessage(responses[selectedLanguage]["language"], "bot");
        return;
    } else if (userInput.includes("english")) {
        selectedLanguage = "en";
        displayMessage(responses[selectedLanguage]["language"], "bot");
        return;
    }

    for (const keyword in healthConditions) {
        if (userInput.includes(keyword)) {
            displayMessage(responses[selectedLanguage]["doctor_recommendation"], "bot");
            fetchDoctors(healthConditions[keyword]);
            fetchNearbyHospitals(healthConditions[keyword]);
            return;
        }
    }

    displayMessage(responses[selectedLanguage]["ask_disease"], "bot");
}
