
"use strict";

// ============================================
// 1. SCALER PARAMETERS FROM THE MODEL
// ============================================

const scalerParameters = {
    mean: [56.421017, 50.032588],
    scale: [28.75903412296232, 29.060527972186875]
};

// Feature order:
// 1. Annual Income (in thousands of dollars)
// 2. Spending Score (1-100)

const centroids = [
    [1.0193671404184244, 1.0846926029079549],
    [-1.0367069737269508, -0.9776087296380439],
    [1.0898081373335349, -1.088057719534682],
    [-0.01771182937007604, -0.00368834556282791],
    [-1.0030081283343428, 0.9817873103481094]
];

// ============================================
// 2. CUSTOMER SEGMENT DESCRIPTIONS
// Inferred from the supplied centroids
// ============================================

const clusterMapping = {
    0: {
        segment: "⭐ Cluster 1: High-Income, High-Spending Customer",
        strategy: "Offer VIP rewards, personalized recommendations, exclusive product access, and loyalty benefits.",
        color: "#ca8a04"
    },

    1: {
        segment: "🟡 Cluster 2: Low-Income, Low-Spending Customer",
        strategy: "Recommend affordable products, budget bundles, and value-for-money promotions.",
        color: "#9333ea"
    },

    2: {
        segment: "🔵 Cluster 3: High-Income, Low-Spending Customer",
        strategy: "Build customer confidence with quality information, warranties, testimonials, and relevant offers.",
        color: "#2563eb"
    },

    3: {
        segment: "🟢 Cluster 4: Average-Income, Average-Spending Customer",
        strategy: "Use seasonal promotions, regular updates, and loyalty rewards to encourage repeat purchases.",
        color: "#059669"
    },

    4: {
        segment: "🔴 Cluster 5: Low-Income, High-Spending Customer",
        strategy: "Offer relevant discounts, affordable alternatives, and budget-friendly promotions.",
        color: "#dc2626"
    }
};

// ============================================
// 3. HELPER FUNCTIONS
// ============================================

function getElement(id) {
    return document.getElementById(id);
}

function updateScoreValue() {
    const slider = getElement("spending-score");
    const scoreValue = getElement("score-value");

    if (slider && scoreValue) {
        scoreValue.textContent = slider.value;
    }
}

// ============================================
// 4. PREDICT CUSTOMER SEGMENT
// ============================================

function predictSegment(event) {
    event.preventDefault();

    const incomeInput = getElement("income");
    const spendingInput = getElement("spending-score");

    if (!incomeInput || !spendingInput) {
        alert("Error: Required input fields were not found.");
        return;
    }

    const incomeText = incomeInput.value.trim();
    const income = Number(incomeText);
    const spending = Number(spendingInput.value);

    // Validate annual income.
    if (
        incomeText === "" ||
        !Number.isFinite(income) ||
        income < 0
    ) {
        alert("Please enter a valid, non-negative annual income.");
        incomeInput.focus();
        return;
    }

    // Validate spending score.
    if (
        !Number.isFinite(spending) ||
        spending < 1 ||
        spending > 100
    ) {
        alert("Spending Score must be between 1 and 100.");
        return;
    }

    // Convert dollars to thousands of dollars.
    const incomeK = income / 1000;

    // Apply StandardScaler transformation.
    const scaledIncome =
        (incomeK - scalerParameters.mean[0]) /
        scalerParameters.scale[0];

    const scaledSpending =
        (spending - scalerParameters.mean[1]) /
        scalerParameters.scale[1];

    // ========================================
    // 5. CALCULATE DISTANCE TO EACH CENTROID
    // ========================================

    const distances = centroids.map((centroid, index) => {
        const dx = scaledIncome - centroid[0];
        const dy = scaledSpending - centroid[1];

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        return {
            index: index,
            distance: distance
        };
    });

    // Select the nearest centroid.
    let predictedCluster = 0;

    for (let i = 1; i < distances.length; i++) {
        if (
            distances[i].distance <
            distances[predictedCluster].distance
        ) {
            predictedCluster = i;
        }
    }

    const result = clusterMapping[predictedCluster];

    // ========================================
    // 6. DISPLAY PREDICTION RESULTS
    // ========================================

    const initialState = getElement("initial-state");
    const resultState = getElement("result-state");
    const resultSegment = getElement("result-segment");
    const resultStrategy = getElement("result-strategy");
    const distancesList = getElement("distances-list");

    if (
        !resultSegment ||
        !resultStrategy ||
        !distancesList ||
        !initialState ||
        !resultState
    ) {
        console.error("One or more result elements are missing.");
        alert("Error displaying results. Please check index.html.");
        return;
    }

    initialState.classList.add("hidden");
    resultState.classList.remove("hidden");

    // Display the predicted customer segment.
    resultSegment.textContent = result.segment;
    resultSegment.style.backgroundColor = result.color;
    resultSegment.style.color = "#ffffff";

    // Display the recommended business strategy.
    resultStrategy.textContent = result.strategy;

    // Display the Euclidean distance for every cluster.
    distancesList.replaceChildren();

    distances.forEach((item, index) => {
        const li = document.createElement("li");
        const value = document.createElement("span");

        li.appendChild(
            document.createTextNode(`Cluster ${index + 1}: `)
        );

        value.textContent = item.distance.toFixed(4);

        if (index === predictedCluster) {
            value.style.color = "#38bdf8";
            value.style.fontWeight = "700";
        } else {
            value.style.color = "#cbd5e1";
        }

        li.appendChild(value);
        distancesList.appendChild(li);
    });

    // Log prediction details for debugging.
    console.log("Prediction completed:", {
        annualIncome: income,
        incomeInThousands: incomeK,
        spendingScore: spending,
        scaledIncome: scaledIncome,
        scaledSpending: scaledSpending,
        predictedCluster: predictedCluster + 1,
        segment: result.segment,
        distances: distances.map((item, index) => ({
            cluster: index + 1,
            distance: item.distance.toFixed(4)
        }))
    });
}

// ============================================
// 7. CLEAR INPUTS AND RESULTS
// ============================================

function clearFields(event) {
    if (event) {
        event.preventDefault();
    }

    const incomeInput = getElement("income");
    const spendingInput = getElement("spending-score");
    const initialState = getElement("initial-state");
    const resultState = getElement("result-state");
    const resultSegment = getElement("result-segment");
    const resultStrategy = getElement("result-strategy");
    const distancesList = getElement("distances-list");

    if (incomeInput) {
        incomeInput.value = "";
    }

    if (spendingInput) {
        spendingInput.value = "50";
    }

    updateScoreValue();

    if (initialState) {
        initialState.classList.remove("hidden");
    }

    if (resultState) {
        resultState.classList.add("hidden");
    }

    if (resultSegment) {
        resultSegment.textContent = "Customer Segment";
        resultSegment.style.backgroundColor = "";
    }

    if (resultStrategy) {
        resultStrategy.textContent = "";
    }

    if (distancesList) {
        distancesList.replaceChildren();
    }
}

// ============================================
// 8. INITIALIZE EVENT LISTENERS
// ============================================

function initializeDashboard() {
    const form = getElement("predictor-form");
    const clearButton = getElement("clear-btn");
    const slider = getElement("spending-score");

    if (form) {
        form.addEventListener("submit", predictSegment);
    } else {
        console.error("Form with ID predictor-form was not found.");
    }

    if (clearButton) {
        clearButton.addEventListener("click", clearFields);
    }

    if (slider) {
        slider.addEventListener("input", updateScoreValue);
        updateScoreValue();
    }

    console.log(
        "Customer Segmentation dashboard loaded successfully."
    );
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeDashboard
    );
} else {
    initializeDashboard();
}
