// Doctor fee mapping
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
    "Psychiatrist": [{ name: "Dr. Anirban Roy", fee: "₹1200" }]
};

// Assume chatbot sets this based on diagnosis
let selectedSpecialist = "Cardiologist"; // You can update this dynamically from chatbot

// Get base consultation fee for the first doctor in the specialty
function getConsultationFeeFromSpecialist() {
    let doctorList = doctorFees[selectedSpecialist];
    if (doctorList && doctorList.length > 0) {
        let feeStr = doctorList[0].fee.replace("₹", ""); // Remove ₹
        return parseInt(feeStr); // Convert to number
    }
    return 500; // Default fallback if nothing found
}

function subscribe(plan) {
    if (plan === "free") {
        alert("You have started a Free Trial!");
        window.location.href = "/subscribe/free";
    } else if (plan === "premium") {
        alert("Thank you for subscribing! Your consultation price is now 40% less.");
        localStorage.setItem("subscription", "premium");
        updatePrice(); // Update price after subscription
        window.location.href = "/subscribe/premium";
    } else if (plan === "consultation") {
        let isSubscribed = localStorage.getItem("subscription") === "premium";
        let baseFee = getConsultationFeeFromSpecialist();
        let extraFee = 100;
        let totalFee = baseFee + extraFee;
        let finalPrice = isSubscribed ? Math.round(totalFee * 0.6) : totalFee;

        alert(`Consultation booked with ${selectedSpecialist}. Price: ₹${finalPrice}`);
        window.location.href = "/book-consultation";
    }
}

function updatePrice() {
    let isSubscribed = localStorage.getItem("subscription") === "premium";
    let baseFee = getConsultationFeeFromSpecialist();
    let extraFee = 100;
    let totalFee = baseFee + extraFee;
    let finalPrice = isSubscribed ? Math.round(totalFee * 0.6) : totalFee;

    const priceElement = document.getElementById("consultation-price");
    if (priceElement) {
        priceElement.innerText = `Price: ₹${finalPrice}`;
    }
}

document.addEventListener("DOMContentLoaded", updatePrice);
