// Predefined List of Hospitals with Coordinates and Specialties
const hospitalData = [
    { name: "Apollo Hospital", address: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639, specialties: ["cardiology", "orthopedics", "neurology", "cancer"] },
    { name: "Fortis Hospital", address: "Kolkata, West Bengal", lat: 22.5795, lng: 88.4336, specialties: ["cardiology", "dermatology", "gynecology", "pediatrics"] },
    { name: "AMRI Hospital", address: "Dhakuria, Kolkata", lat: 22.5124, lng: 88.3709, specialties: ["neurology", "cancer", "orthopedics", "general medicine"] },
    { name: "Ruby General Hospital", address: "Kolkata, West Bengal", lat: 22.5154, lng: 88.4076, specialties: ["general medicine", "orthopedics", "cardiology"] },
    { name: "Narayana Hospital", address: "Howrah, West Bengal", lat: 22.5958, lng: 88.2636, specialties: ["cardiology", "neurology", "nephrology", "pediatrics"] }
];

// Disease to Specialty Mapping
const diseaseSpecialties = {
    "heart attack": "cardiology",
    "chest pain": "cardiology",
    "bone fracture": "orthopedics",
    "brain stroke": "neurology",
    "cancer": "cancer",
    "skin infection": "dermatology",
    "pregnancy": "gynecology",
    "child care": "pediatrics",
    "kidney disease": "nephrology",
    "fever": "general medicine"
};

// Process User Input and Generate Response
function processInput(userMessage) {
    // Check if the user is mentioning a disease or condition
    const detectedSpecialty = checkForDisease(userMessage);

    if (detectedSpecialty) {
        getLocationForHospitals(detectedSpecialty);
    }
    // Check if user wants to change language
    else if (userMessage.includes("language") || userMessage.includes("भाषा") || userMessage.includes("ভাষা")) {
        askForLanguage();
    }
    // Check if the user is mentioning a specific language
    else if (checkLanguage(userMessage)) {
        setLanguage(userMessage);
    }
    // Check if the user is asking for nearby hospitals
    else if (userMessage.includes("hospital") || userMessage.includes("clinic") || userMessage.includes("test")) {
        getLocationForHospitals(null);
    }
    // Handle predefined responses based on language
    else if (responses[userLanguage][userMessage]) {
        displayMessage(responses[userLanguage][userMessage], "bot");
    }
    // Default fallback
    else {
        displayMessage(responses[userLanguage]["default"], "bot");
    }
}

// Check if User Mentioned a Disease and Return Specialty
function checkForDisease(userMessage) {
    for (const disease in diseaseSpecialties) {
        if (userMessage.includes(disease)) {
            return diseaseSpecialties[disease];
        }
    }
    return null;
}

// Get User Location for Hospitals Based on Specialty
function getLocationForHospitals(specialty) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                displayMessage(
                    specialty
                        ? `🔍 Searching for hospitals specializing in ${specialty} near your location...`
                        : responses[userLanguage]["hospital"],
                    "bot"
                );
                findNearbyHospitals(latitude, longitude, specialty);
            },
            () => {
                displayMessage(
                    userLanguage === "hi"
                        ? "स्थान सेवाएं सक्षम करें।"
                        : userLanguage === "bn"
                        ? "অবস্থান পরিষেবা সক্ষম করুন।"
                        : "Please enable location services.",
                    "bot"
                );
            }
        );
    } else {
        displayMessage(
            userLanguage === "hi"
                ? "यह ब्राउज़र स्थान सेवाओं का समर्थन नहीं करता।"
                : userLanguage === "bn"
                ? "এই ব্রাউজার অবস্থান পরিষেবা সমর্থন করে না।"
                : "Geolocation is not supported by this browser.",
            "bot"
        );
    }
}

// Find Nearby Hospitals Based on User Location and Specialty
function findNearbyHospitals(lat, lng, specialty) {
    let filteredHospitals = hospitalData;

    // Filter Hospitals Based on Specialty
    if (specialty) {
        filteredHospitals = hospitalData.filter((hospital) =>
            hospital.specialties.includes(specialty)
        );
    }

    if (filteredHospitals.length === 0) {
        displayMessage(
            userLanguage === "hi"
                ? "इस विशेष बीमारी के लिए कोई अस्पताल नहीं मिला।"
                : userLanguage === "bn"
                ? "এই রোগের জন্য কোনো হাসপাতাল পাওয়া যায়নি।"
                : "No hospitals found for this condition near your location.",
            "bot"
        );
        return;
    }

    // Calculate Distances and Sort
    const hospitalsWithDistance = filteredHospitals.map((hospital) => {
        const distance = calculateDistance(lat, lng, hospital.lat, hospital.lng);
        return { ...hospital, distance };
    });

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    displayMessage(
        specialty
            ? `🏥 Here are the best hospitals specializing in ${specialty} near your location:`
            : responses[userLanguage]["hospital"],
        "bot"
    );

    // Show Top 3 Nearest Hospitals
    hospitalsWithDistance.slice(0, 3).forEach((hospital, index) => {
        displayMessage(
            `${index + 1}. ${hospital.name} - ${hospital.address} (${hospital.distance.toFixed(2)} km)`,
            "bot"
        );
    });
}

// Calculate Distance Between Two Coordinates Using Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
