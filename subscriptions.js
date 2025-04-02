document.addEventListener("DOMContentLoaded", function () {
    const freeTrialBtn = document.getElementById("free-trial-btn");
    const premiumBtn = document.getElementById("premium-subscribe-btn");
    const consultationBtn = document.getElementById("consultation-btn");

    if (freeTrialBtn) {
        freeTrialBtn.addEventListener("click", function () {
            fetch("http://localhost:3000/subscribe/free-trial", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error:", error));
        });
    }

    if (premiumBtn) {
        premiumBtn.addEventListener("click", function () {
            fetch("http://localhost:3000/subscribe/premium", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentToken: "dummy_token" }) // Replace with actual payment method
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error:", error));
        });
    }

    if (consultationBtn) {
        consultationBtn.addEventListener("click", function () {
            fetch("http://localhost:3000/book-consultation", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(error => console.error("Error:", error));
        });
    }
});
