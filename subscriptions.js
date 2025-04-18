// Get stored subscription type and free trial count
let subscriptionType = localStorage.getItem("subscriptionType") || "none";
let freeTrialCount = parseInt(localStorage.getItem("freeTrialCount")) || 5; // 5 free consultations for free trial

// Doctor fees data
const doctorFees = {
    "Cardiologist": [{ name: "Dr. Rajesh Sharma", fee: 800 }, { name: "Dr. Anjali Mehta", fee: 900 }],
    "Orthopedic": [{ name: "Dr. Vikram Das", fee: 700 }, { name: "Dr. Riya Sen", fee: 750 }],
    "Neurologist": [{ name: "Dr. Alok Verma", fee: 1000 }, { name: "Dr. Sneha Kapoor", fee: 950 }],
    "Oncologist": [{ name: "Dr. Rajiv Menon", fee: 1500 }, { name: "Dr. Neha Agarwal", fee: 1400 }],
    "Dermatologist": [{ name: "Dr. Sanjay Bose", fee: 600 }, { name: "Dr. Payal Gupta", fee: 650 }],
    "Pulmonologist": [{ name: "Dr. Arvind Iyer", fee: 900 }, { name: "Dr. Kiran Das", fee: 850 }],
    "Gynecologist": [{ name: "Dr. Kavita Sharma", fee: 900 }, { name: "Dr. Poonam Das", fee: 850 }],
    "General Physician": [{ name: "Dr. Ramesh Patil", fee: 400 }, { name: "Dr. Priya Malhotra", fee: 450 }],
    "Proctologist": [{ name: "Dr. Amit Sen", fee: 1000 }, { name: "Dr. Sunita Nair", fee: 950 }],
    "Psychiatrist": [{ name: "Dr. Anirban Roy", fee: 1200 }, { name: "Dr. Shalini Gupta", fee: 1100 }]
};

// Function to handle subscription
function subscribe(type) {
    if (type === "free") {
        if (subscriptionType === "free") {
            alert("⚠️ You are already on the Free Trial.");
        } else {
            alert("✅ You have activated the Free Trial. You get 5 free consultations.");
            subscriptionType = "free";
            freeTrialCount = 5; // Reset free trial count
            localStorage.setItem("freeTrialCount", freeTrialCount);
        }
    } else if (type === "premium") {
        alert("🎉 You have subscribed to the Premium Plan! Your consultation fee is now discounted by 40%.");
        subscriptionType = "premium";
    }
    localStorage.setItem("subscriptionType", subscriptionType);
}

// Function to calculate and update consultation price for a selected doctor
function updateConsultationPrice(doctorCategory, doctorIndex) {
    let consultationFee = doctorFees[doctorCategory][doctorIndex].fee;

    if (subscriptionType === "free" && freeTrialCount > 0) {
        consultationFee = 0; // Free trial applies
        freeTrialCount--; // Reduce free consultations left
        localStorage.setItem("freeTrialCount", freeTrialCount);
    } else if (subscriptionType === "premium") {
        consultationFee = consultationFee * 0.6; // 40% discount
    }

    // Store the updated consultation fee and doctor details
    localStorage.setItem("consultationFee", consultationFee);
    localStorage.setItem("selectedDoctor", JSON.stringify(doctorFees[doctorCategory][doctorIndex]));
}

// Function to handle "Book Consultation" button click
function bookConsultation(event) {
    const doctorCategory = event.target.getAttribute("data-category");
    const doctorIndex = parseInt(event.target.getAttribute("data-index"));

    if (!doctorCategory || isNaN(doctorIndex)) {
        alert("❌ Error: Doctor details not found!");
        return;
    }

    updateConsultationPrice(doctorCategory, doctorIndex);
    
    // Redirect to consultation page
    window.location.href = "consultation.html";
}

// Attach event listeners to buttons
document.addEventListener("DOMContentLoaded", function () {
    const freeTrialBtn = document.getElementById("free-trial-btn");
    const premiumBtn = document.getElementById("premium-btn");
    const consultationBtns = document.querySelectorAll(".consultation-btn");

    if (freeTrialBtn) {
        freeTrialBtn.addEventListener("click", function () {
            subscribe("free");
        });
    }

    if (premiumBtn) {
        premiumBtn.addEventListener("click", function () {
            subscribe("premium");
        });
    }

    consultationBtns.forEach((btn) => {
        btn.addEventListener("click", bookConsultation);
    });
});

// Store doctor fees data in localStorage
localStorage.setItem("doctorFees", JSON.stringify(doctorFees));
