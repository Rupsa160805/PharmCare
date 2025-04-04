// Function to get consultation fee from main.js (Assume it's a global function or variable)
function getConsultationFeeFromChatbot() {
    // Example: Let's assume chatbot sets a global variable `chatbotConsultationFee`
    // You can change this if you retrieve the fee differently
    return typeof chatbotConsultationFee !== "undefined" ? chatbotConsultationFee : 500;
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
        let baseFee = getConsultationFeeFromChatbot(); // Fee from chatbot
        let extraFee = 100;
        let total = baseFee + extraFee;

        let finalPrice = isSubscribed ? Math.round(total * 0.6) : total;

        alert(`Consultation booked! Price: ₹${finalPrice}`);
        window.location.href = "/book-consultation";
    }
}

// Function to update the displayed consultation price
function updatePrice() {
    let isSubscribed = localStorage.getItem("subscription") === "premium";
    let baseFee = getConsultationFeeFromChatbot(); // Fee from chatbot
    let extraFee = 100;
    let total = baseFee + extraFee;

    let finalPrice = isSubscribed ? Math.round(total * 0.6) : total;

    const priceElement = document.getElementById("consultation-price");
    if (priceElement) {
        priceElement.innerText = `Price: ₹${finalPrice}`;
    }
}

// Ensure price updates when the page loads
document.addEventListener("DOMContentLoaded", updatePrice);
