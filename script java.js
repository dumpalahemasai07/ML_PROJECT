
"use strict";

// ==========================================
// 1. TRAINED MODEL PARAMETERS
// Keep these values consistent with your Python model.
// Income is converted from dollars to thousands of dollars.
// ==========================================

const scalerParameters = {
    mean: [56.421017, 50.032588],
    scale: [28.75903412296232, 29.060527972186875]
};

const centroids = [
    [1.0193671404184244, 1.0846926029079549],
    [-1.0367069737269508, -0.9776087296380439],
    [1.0898081373335349, -1.088057719534682],
    [-0.01771182937007604, -0.00368834556282791],
    [-1.0030081283343428, 0.9817873103481094]
];

// Centroid-based descriptions.
// These descriptions are matched to the supplied centroid coordinates.

const clusterMapping = {
    0: {
        segment: "⭐ Cluster 1: High-Income, High-Spending Customer",
        strategy: "Strategy: Offer VIP rewards, exclusive product access, personalized recommendations, and loyalty benefits.",
        color: "#eab308"
    },
    1: {
        segment: "🟡 Cluster 2: Low-Income, Low-Spending Customer",
        strategy: "Strategy: Recommend affordable products, budget bundles, and value-for-money promotions.",
        color: "#a855f7"
    },
    2: {
        segment: "🔵 Cluster 3: High-Income, Low-Spending Customer",
        strategy: "Strategy: Build confidence with premium product information, quality guarantees, testimonials, and targeted offers.",
        color: "#3b82f6"
    },
    3: {
        segment: "🟢 Cluster 4: Average-Income, Average-Spending Customer",
        strategy: "Strategy: Use seasonal promotions, regular updates, and loyalty-point offers to encourage repeat purchases.",
        color: "#10b981"
    },
    4: {
        segment: "🔴 Cluster 5: Low-Income, High-Spending Customer",
        strategy: "Strategy: Offer relevant discounts, affordable alternatives, and responsible budget-friendly promotions.",
        color: "#ef4444"
    }
};

// ==========================================
// 2. FIND HTML ELEMENTS
// ==========================================

function getElement(id) {
    return document.getElementById(id);
}

function showError(message) {
    alert(message);
}

function updateScoreValue() {
    const scoreInput = getElement("spending-score");
    const scoreValue = getElement("score-value");

    if (scoreInput && scoreValue) {
        scoreValue.textContent = scoreInput.value;
    }
}

// ==========================================
// 3. PREDICT CUSTOMER SEGMENT
// ==========================================

function predictSegment(event) {
    if (event) {
        event.preventDefault();
    }

    const incomeInput = getElement("income");
    const spendingInput = getElement("spending-score");

    if (!incomeInput || !spendingInput) {
        console.error(
            "Prediction failed: check the HTML IDs income and spending-score."
        );
        showError("The input fields could not be found. Please check the website code.");
        return;
    }

    const rawIncome = Number(incomeInput.value);
    const rawSpending = Number(spendingInput.value);

    if (
        incomeInput.value.trim() === "" ||
        !Number.isFinite(rawIncome) ||
        rawIncome < 0
    ) {
        showError("Please enter a valid, non-negative annual income.");
        incomeInput.focus();
        return;
    }

    if (
        !Number.isFinite(rawSpending) ||
        rawSpending < 1 ||
        rawSpending > 100
    ) {
        showError("Please enter a spending score between 1 and 100.");
        return;
    }

    // The trained model expects income in thousands of dollars.
    const incomeK = rawIncome / 1000;

    // Apply the same StandardScaler transformation.
    const scaledIncome =
        (incomeK - scalerParameters.mean[0]) /
        scalerParameters.scale[0];

    const scaledSpending =
        (rawSpending - scalerParameters.mean[1]) /
        scalerParameters.scale[1];

    // Find the nearest K-Means centroid using Euclidean distance.
    let minDistance = Infinity;
    let predictedCluster = -1;
    const distances = [];

    centroids.forEach((centroid, index) => {
        const incomeDifference = scaledIncome - centroid[0];
        const spendingDifference = scaledSpending - centroid[1];

        const distance = Math.sqrt(
            incomeDifference ** 2 + spendingDifference ** 2
        );

        distances.push({
            index: index,
            label: index + 1,
            distance: distance
        });

        if (distance < minDistance) {
            minDistance = distance;
            predictedCluster = index;
        }
    });

    if (predictedCluster < 0) {
        showError("Unable to calculate a customer segment.");
        return;
    }

    // ==========================================
    // 4. DISPLAY THE PREDICTION
    // ==========================================

    const initialState = getElement("initial-state");
    const resultState = getElement("result-state");
    const resultSection = getElement("result-section");
    const resultSegment = getElement("result-segment");
    const resultStrategy = getElement("result-strategy");
    const distancesList = getElement("distances-list");

    const result = clusterMapping[predictedCluster];

    if (!resultSegment || !resultStrategy || !distancesList) {
        console.error(
            "Prediction calculated, but result elements are missing. Check result-segment, result-strategy, and distances-list in index.html."
        );
        showError("The prediction was calculated, but the results panel could not be updated. Please check the HTML element IDs.");
        return;
    }

    if (initialState) {
        initialState.classList.add("hidden");
    }

    if (resultState) {
        resultState.classList.remove("hidden");
    }

    if (resultSection) {
        resultSection.classList.remove("hidden");
    }

    resultSegment.textContent = result.segment;
    resultSegment.style.backgroundColor = result.color;
    resultSegment.style.color = "#ffffff";

    resultStrategy.textContent = result.strategy;

    // Display all five centroid distances.
    distancesList.replaceChildren();

    distances.forEach((item) => {
        const listItem = document.createElement("li");
        const distanceText = document.createElement("span");

        listItem.appendChild(
            document.createTextNode(`Cluster ${item.label}: `)
        );

        distanceText.textContent = item.distance.toFixed(4);
        distanceText.style.color =
            item.index === predictedCluster ? "#38bdf8" : "#cbd5e1";

        if (item.index === predictedCluster) {
            distanceText.style.fontWeight = "bold";
        }

        listItem.appendChild(distanceText);
        distancesList.appendChild(listItem);
    });

    console.log("Customer segmentation result:", {
        annualIncome: rawIncome,
        incomeInThousands: incomeK,
        spendingScore: rawSpending,
        scaledIncome: scaledIncome,
        scaledSpending: scaledSpending,
        predictedCluster: predictedCluster + 1,
        segment: result.segment,
        centroidDistances: distances
    });
}

// ==========================================
// 5. CLEAR THE INPUTS AND RESULTS
// ==========================================

function clearFields(event) {
    if (event) {
        event.preventDefault();
    }

    const incomeInput = getElement("income");
    const spendingInput = getElement("spending-score");
    const initialState = getElement("initial-state");
    const resultState = getElement("result-state");
    const resultSection = getElement("result-section");
    const distancesList = getElement("distances-list");

    if (incomeInput) {
        incomeInput.value = "";
    }

    if (spendingInput) {
        spendingInput.value = 50;
    }

    updateScoreValue();

    if (initialState) {
        initialState.classList.remove("hidden");
    }

    if (resultState) {
        resultState.classList.add("hidden");
    }

    if (resultSection) {
        resultSection.classList.add("hidden");
    }

    if (distancesList) {
        distancesList.replaceChildren();
    }
}

// ==========================================
// 6. CONNECT THE BUTTONS AND FORM
// ==========================================

function initializeDashboard() {
    const scoreInput = getElement("spending-score");
    const form = getElement("predictor-form");
    const predictButton = getElement("predict-btn");
    const clearButton = getElement("clear-btn");

    if (scoreInput) {
        scoreInput.addEventListener("input", updateScoreValue);
        updateScoreValue();
    }

    // Handle form submission.
    if (form) {
        form.addEventListener("submit", predictSegment);
    }

    // Also support a prediction button outside the form,
    // or a button whose type is "button" rather than "submit".
    if (
        predictButton &&
        (!form || predictButton.type !== "submit" ||
            !form.contains(predictButton))
    ) {
        predictButton.addEventListener("click", predictSegment);
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearFields);
    }

    console.log("Customer Segmentation dashboard initialized.");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDashboard);
} else {
    initializeDashboard();
}
