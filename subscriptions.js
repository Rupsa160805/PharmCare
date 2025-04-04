// Doctor fee mapping (must match chatbot's specialty list)
const doctorFees = {
    "Cardiologist": [{ name: "Dr. Rajesh Sharma", fee: "₹800" }, { name: "Dr. Anjali Mehta", fee: "₹900" }],
    "Orthopedic": [{ name: "Dr. Vikram Das", fee: "₹700" }, { name: "Dr. Riya Sen", fee: "₹750" }],
    "Neurologist": [{ name: "Dr. Alok Verma", fee: "₹1000" }, { name: "Dr. Sneha Kapoor", fee: "₹950" }],
    "Oncologist": [{ name: "Dr. Rajiv Menon", fee: "₹1500" }, { name: "Dr. Neha Agarwal", fee: "₹1400" }],
    "Dermatologist": [{ name: "Dr. Sanjay Bose", fee: "₹600" }, { name: "Dr. Payal Gupta", fee: "₹650" }],
    "Pulmonologist": [{ name: "Dr. Arvind Iyer", fee: "₹900" }, { name: "Dr. Kiran Das", fee: "₹850" }],
    "Gynecologist": [{ name: "Dr. Kavita Sharma", fee: "₹900" }, { name: "Dr. Poonam Das", fee: "₹850" }],
    "General Physician": [{ name: "Dr. Ramesh Patil", fee: "₹400" }, { name: "Dr. Priya Malhotra", fee: "₹450" }],
    "Proctologist": [{ name: "Dr. Amit Sen", fee: "₹1000" }, { name: "Dr. Sunita Nair", fee: "₹950" }],
    "Psychiatrist": [{ name: "Dr. Anirban Roy", fee: "₹1200" }, { name: "Dr. Shalini Gupta", fee: "₹1100" }]
};

// Get chatbot-stored specialist & fee
function getChatbotFee() {
    let specialist = localStorage.getItem("selectedSpecialist") || "General Physician";
    let feeStr = localStorage.getItem("consultationFee") || "400";
    let fee = parseInt(feeStr);
    return { specialist, fee };
}

// Handles booking logic
function bookConsultation() {
    const { specialist, fee } = getChatbotFee();
    const isSubscribed = localStorage.getItem("subscription") === "premium";

    let totalFee = isSubscribed ? Math.round((fee + 100) * 0.6) : fee + 100;

    localStorage.setItem("finalConsultationPrice", totalFee);
    localStorage.setItem("confirmedSpecialist", specialist);

    window.location.href = "consultation.html";
}

// Display dynamic consultation price
document.addEventListener("DOMContentLoaded", () => {
    const { fee } = getChatbotFee();
    const isSubscribed = localStorage.getItem("subscription") === "premium";

    let totalFee = isSubscribed ? Math.round((fee + 100) * 0.6) : fee + 100;

    const priceEl = document.getElementById("consultation-price");
    if (priceEl) {
        priceEl.innerText = `Price: ₹${totalFee}`;
    }
});
