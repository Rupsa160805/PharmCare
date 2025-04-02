// Default language is English
let selectedLanguage = "en";

// Health Conditions Mapping to Specializations
const healthConditions = {
    "heart": "Cardiologist", "cardio": "Cardiologist",
    "bones": "Orthopedic", "orthopedic": "Orthopedic",
    "nerves": "Neurologist", "neurology": "Neurologist",
    "cancer": "Oncologist", "oncology": "Oncologist",
    "skin": "Dermatologist", "pimples": "Dermatologist", "acne": "Dermatologist",
    "rashes": "Dermatologist", "eczema": "Dermatologist", "allergy": "Dermatologist",
    "psoriasis": "Dermatologist", "piles": "Proctologist", "hemorrhoids": "Proctologist",
    "pulmonary": "Pulmonologist", "lungs": "Pulmonologist", "breathing": "Pulmonologist", "asthma": "Pulmonologist",
    "fever": "General Physician", "pain": "General Physician", "women": "Gynecologist", "pregnancy": "Gynecologist",
    "mental": "Psychiatrist", "depression": "Psychiatrist", "anxiety": "Psychiatrist", "stress": "Psychiatrist"
};

// Doctors List with Consultation Fees
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
    "Psychiatrist": [{ name: "Dr. Arjun Malhotra", fee: "₹1200" }, { name: "Dr. Sunaina Roy", fee: "₹1100" }]
};

// Hospitals Categorized by Specialization
const hospitals = {
    "Cardiologist": ["🏥 Heart Care Hospital, Main Street", "🏥 Pulse Cardiac Center, Downtown"],
    "Orthopedic": ["🏥 Bone & Joint Clinic, City Center", "🏥 Ortho Plus Hospital, Park Avenue"],
    "Neurologist": ["🏥 Brain & Spine Institute, Lake Road", "🏥 Neuro Care Hospital, Tech Park"],
    "Oncologist": ["🏥 Cancer Institute, South Block", "🏥 Oncology Care Center, West End"],
    "Dermatologist": ["🏥 Skin & Hair Clinic, Midtown", "🏥 Glow Dermatology Center, Central Plaza"],
    "Pulmonologist": ["🏥 Respiratory Health Center, Green Valley", "🏥 Pulmonary Care Hospital, Elm Street"],
    "Gynecologist": ["🏥 Women's Health Center, Green Lane", "🏥 Motherhood Hospital, City Square"],
    "General Physician": ["🏥 MedLife Clinic, High Street", "🏥 City General Hospital, Downtown"],
    "Proctologist": ["🏥 Piles & Anorectal Clinic, City Hospital", "🏥 Proctology Care Center, East Side"],
    "Psychiatrist": ["🏥 Mind Wellness Center, Urban Area", "🏥 Mental Health Institute, Oak Avenue"]
};

// Multilingual Responses
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "thanks": "You're welcome! 😊 Stay healthy!",
        "sorry": "No worries! I'm here to help. 🤗",
        "ask_disease": "Please mention your health concern so I can suggest suitable doctors and hospitals.",
        "doctor_recommendation": "Here are some recommended doctors:",
        "hospital_recommendation": "Here are some hospitals specializing in this field:"
    },
    "hi": {
        "hello": "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?",
        "thanks": "कोई बात नहीं! 😊 स्वस्थ रहें!",
        "sorry": "कोई चिंता नहीं! मैं आपकी मदद करने के लिए यहाँ हूँ। 🤗",
        "ask_disease": "कृपया अपनी समस्या बताएं ताकि मैं उपयुक्त डॉक्टरों और अस्पतालों का सुझाव दे सकूं।",
        "doctor_recommendation": "यहाँ कुछ अनुशंसित डॉक्टर हैं:",
        "hospital_recommendation": "यहाँ आपके निकटतम अस्पताल हैं जो इस क्षेत्र में विशेषज्ञता रखते हैं:"
    },
    "bn": {
        "hello": "হ্যালো! আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        "thanks": "কোন সমস্যা নেই! 😊 সুস্থ থাকুন!",
        "sorry": "কোন চিন্তা নেই! আমি সাহায্যের জন্য আছি। 🤗",
        "ask_disease": "আপনার সমস্যার কথা উল্লেখ করুন যাতে আমি উপযুক্ত ডাক্তার এবং হাসপাতাল সুপারিশ করতে পারি।",
        "doctor_recommendation": "এখানে কিছু সুপারিশকৃত ডাক্তার আছেন:",
        "hospital_recommendation": "এখানে আপনার কাছাকাছি কিছু হাসপাতাল রয়েছে যা এই ক্ষেত্রে বিশেষজ্ঞ:"
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
    const userInputField = document.getElementById("user-input");
    const userText = userInputField.value.trim().toLowerCase();

    if (!userText) return;
    displayMessage(userText, "user");
    userInputField.value = "";

    // Handle Language Change
    if (userText.includes("hindi")) { selectedLanguage = "hi"; displayMessage("अब से मैं हिंदी में जवाब दूंगा।", "bot"); return; }
    if (userText.includes("bengali")) { selectedLanguage = "bn"; displayMessage("এখন থেকে আমি বাংলায় উত্তর দেব।", "bot"); return; }
    if (userText.includes("english")) { selectedLanguage = "en"; displayMessage("I will now respond in English.", "bot"); return; }

    // Handle Polite Responses
    if (userText.includes("thank")) { displayMessage(responses[selectedLanguage]["thanks"], "bot"); return; }
    if (userText.includes("sorry")) { displayMessage(responses[selectedLanguage]["sorry"], "bot"); return; }

    // Detect Health Issue
    for (const keyword in healthConditions) {
        if (userText.includes(keyword)) {
            const specialization = healthConditions[keyword];
            displayMessage(responses[selectedLanguage]["doctor_recommendation"], "bot");
            fetchDoctors(specialization);
            fetchNearbyHospitals(specialization);
            return;
        }
    }

    displayMessage(responses[selectedLanguage]["ask_disease"], "bot");
}
