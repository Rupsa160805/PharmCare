
function subscribe(plan) {
    if (plan === "free") {
        alert("You have started a Free Trial!");
        window.location.href = "/subscribe/free";
    } else if (plan === "premium") {
        alert("Thank you for subscribing! Your consultation price is now ₹100-₹150 less.");
        localStorage.setItem("subscription", "premium");
        updatePrice(); // Update price after subscription
        window.location.href = "/subscribe/premium";
    } else if (plan === "consultation") {
        let isSubscribed = localStorage.getItem("subscription") === "premium";
        let basePrice = 500;
        let discount = isSubscribed ? Math.floor(Math.random() * (150 - 100 + 1)) + 100 : 0;
        let finalPrice = basePrice - discount;

        alert(`Consultation booked! Price: ₹${finalPrice}`);
        window.location.href = "/book-consultation";
    }
}

// Function to Update Consultation Price
function updatePrice() {
    let isSubscribed = localStorage.getItem("subscription") === "premium";
    let basePrice = 500;
    let discount = isSubscribed ? Math.floor(Math.random() * (150 - 100 + 1)) + 100 : 0;
    let finalPrice = basePrice - discount;

    document.getElementById("consultation-price").innerText = `Price: ₹${finalPrice}`;
}

// Ensure price updates when the page loads
document.addEventListener("DOMContentLoaded", updatePrice);
