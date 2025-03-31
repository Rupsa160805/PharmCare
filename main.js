// Handle User Input and Bot Responses
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Predefined Bot Responses in Multiple Languages
const responses = {
    "en": {
        "hello": "Hello! How can I assist you today?",
        "hi": "Hi there! How may I help you?",
        "thanks": "You're welcome! Let me know if you need further assistance.",
        "thank you": "You're welcome! Stay healthy.",
        "sorry": "No worries! How can I assist you?",
        "location": "Please share your current location to find the nearest clinic or hospital.",
        "clinic": "I’m searching for clinics near your location. Please wait a moment...",
        "language": "I can assist you in multiple languages. Which language do you prefer? (English, Hindi, Bengali, etc.)",
        "hospital": "Searching for nearby hospitals for medical tests and checkups...",
        "ask_disease": "Please mention your disease or symptoms so I can suggest suitable doctors and hospitals.",
        "default": "I'm sorry, I didn't understand that. Can you please rephrase?",
        "take_care": "Take care! Let me know if you need any assistance.",
        "checkup": "You should consider scheduling a health checkup along with consultation for better care.",
        "location_confirm": "Got it! I'll find hospitals and clinics near your location. Please wait a moment..."
    }
};

// Available Languages
const languageOptions = {
    "english": "en",
    "hindi": "hi",
    "bengali": "bn"
};

// Default Language
let userLanguage = "en";

// Store User Location
let userLocation = "";

// Predefined List of Hospitals and Doctors
const hospitalData = [
    {
        name: "Apollo Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cardiology", "orthopedics", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. R. Sharma (Heart Specialist)",
            "orthopedics": "Dr. A. Das (Bone Specialist)",
            "neurology": "Dr. M. Roy (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Fortis Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["cancer", "cardiology", "gastroenterology"],
        doctors: {
            "cancer": "Dr. P. Mehta (Cancer Specialist)",
            "cardiology": "Dr. S. Ghosh (Heart Specialist)",
            "gastroenterology": "Dr. B. Kumar (Stomach Specialist)"
        }
    },
    {
        name: "AMRI Hospital",
        address: "Dhakuria, Kolkata",
        location: "kolkata",
        specialties: ["orthopedics", "neurology", "urology", "general checkup"],
        doctors: {
            "orthopedics": "Dr. T. Sen (Bone Specialist)",
            "neurology": "Dr. K. Gupta (Nerve/Brain Specialist)",
            "urology": "Dr. R. Chakraborty (Urine/Bladder Specialist)"
        }
    },
    {
        name: "Ruby General Hospital",
        address: "Kolkata, West Bengal",
        location: "kolkata",
        specialties: ["diabetes", "gynecology", "pulmonology", "general checkup"],
        doctors: {
            "diabetes": "Dr. S. Bose (Diabetes Specialist)",
            "gynecology": "Dr. N. Banerjee (Women’s Health/Baby Delivery)",
            "pulmonology": "Dr. A. Dasgupta (Lung/Chest Specialist)"
        }
    },
    {
        name: "Narayana Hospital",
        address: "Delhi, India",
        location: "delhi",
        specialties: ["cardiology", "cancer", "neurology", "general checkup"],
        doctors: {
            "cardiology": "Dr. P. Rao (Heart Specialist)",
            "cancer": "Dr. R. Iyer (Cancer Specialist)",
            "neurology": "Dr. M. Singh (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Medanta Hospital",
        address: "Gurgaon, Haryana",
        location: "gurgaon",
        specialties: ["orthopedics", "cardiology", "neurology"],
        doctors: {
            "orthopedics": "Dr. A. Verma (Bone Specialist)",
            "cardiology": "Dr. K. Malhotra (Heart Specialist)",
            "neurology": "Dr. S. Kapoor (Nerve/Brain Specialist)"
        }
    },
    {
        name: "Max Super Specialty Hospital",
        address: "Saket, New Delhi",
        location: "delhi",
        specialties: ["cancer", "orthopedics", "gastroenterology"],
        doctors: {
            "cancer": "Dr. R. Sharma (Cancer Specialist)",
            "orthopedics": "Dr. V. Bhatt (Bone Specialist)",
            "gastroenterology": "Dr. P. Khanna (Stomach Specialist)"
        }
    },
    {
        name: "Manipal Hospital",
        address: "Bangalore, Karnataka",
        location: "bangalore",
        specialties: ["pulmonology", "neurology", "urology", "general checkup"],
        doctors: {
            "pulmonology": "Dr. M. Nair (Lung/Chest Specialist)",
            "neurology": "Dr. R. Iyer (Nerve/Brain Specialist)",
            "urology": "Dr. A. Kulkarni (Urine/Bladder Specialist)"
        }
    },
    {
        name: "CMC Vellore",
        address: "Vellore, Tamil Nadu",
        location: "vellore",
        specialties: ["orthopedics", "neurology", "cardiology"],
        doctors: {
            "orthopedics": "Dr. J. Peter (Bone Specialist)",
            "neurology": "Dr. L. George (Nerve/Brain Specialist)",
            "cardiology": "Dr. B. Samuel (Heart Specialist)"
        }
    }
];

// Check for Disease or Symptoms and Suggest Doctors & Hospitals
function checkForDisease(userMessage) {
    const diseaseKeywords = {
        "heart": "cardiology",
        "cardiology": "cardiology",
        "cancer": "cancer",
        "diabetes": "diabetes",
        "brain": "neurology",
        "nerves": "neurology",
        "neurology": "neurology",
        "bones": "orthopedics",
        "orthopedic": "orthopedics",
        "urology": "urology",
        "urine": "urology",
        "bladder": "urology",
        "gynecology": "gynecology",
        "women's health": "gynecology",
        "baby delivery": "gynecology",
        "lungs": "pulmonology",
        "chest": "pulmonology",
        "pulmonary": "pulmonology",
        "stomach": "gastroenterology",
        "gastro": "gastroenterology",
        "checkup": "general checkup",
        "doctor visit": "general checkup"
    };

    // Check for matching disease keywords
    const matchedDisease = Object.keys(diseaseKeywords).find(disease =>
        new RegExp(`\\b${disease}\\b`, "i").test(userMessage)
    );

    if (matchedDisease) {
        const specialty = diseaseKeywords[matchedDisease];
        if (userLocation) {
            findDoctorsForSpecialtyAndLocation(specialty, userLocation);
        } else {
            displayMessage(responses[userLanguage]["location"], "bot");
        }
    } else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadPrescriptions();
    loadFeedbacks();

    // Handle Prescription Upload
    document.getElementById("prescription-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch("/upload-prescription", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            alert("Prescription uploaded successfully!");
            loadPrescriptions();
        } else {
            alert("Failed to upload prescription.");
        }
    });

    // Handle Feedback Submission
    document.getElementById("feedback-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            rating: document.getElementById("rating").value,
            comment: document.getElementById("comment").value
        };
        const response = await fetch("/submit-feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert("Feedback submitted successfully!");
            loadFeedbacks();
        } else {
            alert("Failed to submit feedback.");
        }
    });

    // Load Prescriptions
    async function loadPrescriptions() {
        const response = await fetch("/get-prescriptions");
        const prescriptions = await response.json();
        const prescriptionList = document.getElementById("prescriptions");
        prescriptionList.innerHTML = "";
        prescriptions.forEach((prescription) => {
            prescriptionList.innerHTML += `<li><a href="${prescription.url}" target="_blank">${prescription.name}</a></li>`;
        });
    }

    // Load Feedbacks
    async function loadFeedbacks() {
        const response = await fetch("/get-feedbacks");
        const feedbacks = await response.json();
        const feedbackList = document.getElementById("feedbacks");
        feedbackList.innerHTML = "";
        feedbacks.forEach((feedback) => {
            feedbackList.innerHTML += `<li>⭐ ${feedback.rating}/5 - ${feedback.comment}</li>`;
        });
    }
});
