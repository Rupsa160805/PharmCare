function bookConsultation() {
    let isSubscribed = localStorage.getItem("subscription") === "premium";

    // Get stored consultation fee
    let baseFee = parseInt(localStorage.getItem("consultationFee")) || 500;
    let finalPrice = isSubscribed ? Math.round(baseFee * 0.6) : baseFee;

    // Store the final price in localStorage to use in consultation.html
    localStorage.setItem("finalConsultationPrice", finalPrice);

    // Redirect to consultation page
    window.location.href = "consultation.html";
}

// Ensure the price updates when the page loads
document.addEventListener("DOMContentLoaded", () => {
    let isSubscribed = localStorage.getItem("subscription") === "premium";
    let baseFee = parseInt(localStorage.getItem("consultationFee")) || 500;
    let finalPrice = isSubscribed ? Math.round(baseFee * 0.6) : baseFee;

    const priceElement = document.getElementById("consultation-price");
    if (priceElement) {
        priceElement.innerText = `Price: ₹${finalPrice}`;
    }
});
