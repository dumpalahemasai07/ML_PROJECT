// ExactScaler and K-Means Centroids mapped directly from model parameters
const scalerParameters = {
    mean: [56.421017, 50.032588],
    scale: [28.75903412296232, 29.060527972186875]
};

const centroids = [[1.0193671404184244, 1.0846926029079549], [-1.0367069737269508, -0.9776087296380439], [1.0898081373335349, -1.088057719534682], [-0.01771182937007604, -0.00368834556282791], [-1.0030081283343428, 0.9817873103481094]];

const clusterMapping = {
    0: {
        segment: "🟢 Cluster 1: Average Customer (Average Income, Average Spend)",
        strategy: "Strategy: Send standard weekly updates, seasonal promotions, and introduce a loyalty point system.",
        color: "#10b981"
    },
    1: {
        segment: "⭐ Cluster 2: Target/VIP Customer (High Income, High Spend)",
        strategy: "Strategy: Primary asset! Provide early product access, custom curated recommendations, and exclusive VIP status events.",
        color: "#eab308"
    },
    2: {
        segment: "🔴 Cluster 3: Careless Spender (Low Income, High Spend)",
        strategy: "Strategy: Retarget with flash promotions, impulse-buy items, and limited-time discounts.",
        color: "#ef4444"
    },
    3: {
        segment: "🔵 Cluster 4: Careful Spender (High Income, Low Spend)",
        strategy: "Strategy: Build confidence through high-value loyalty perks, warranty options, and high-quality testimonials.",
        color: "#3b82f6"
    },
    4: {
        segment: "🟡 Cluster 5: Sensible Spender (Low Income, Low Spend)",
        strategy: "Strategy: Focus on budget offerings, clearance items, and cost-efficient marketing channels.",
        color: "#a855f7"
    }
};

document.getElementById('spending-score').addEventListener('input', (e) => {
    document.getElementById('score-value').innerText = e.target.value;
});

document.getElementById('predictor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const rawIncome = parseFloat(document.getElementById('income').value);
    const rawSpending = parseFloat(document.getElementById('spending-score').value);
    
    if (isNaN(rawIncome) || rawIncome < 0) {
        alert('Please enter a valid non-negative income value.');
        return;
    }

    // 1. Transform Raw Income in Dollars to matching scaled k$
    const incomeK = rawIncome / 1000.0;
    
    // 2. Preprocess / Scale input metrics
    const scaledIncome = (incomeK - scalerParameters.mean[0]) / scalerParameters.scale[0];
    const scaledSpending = (rawSpending - scalerParameters.mean[1]) / scalerParameters.scale[1];
    
    // 3. Perform nearest centroid distance calculation matching Python fit_predict()
    let minDistance = Infinity;
    let predictedCluster = 0;
    let distances = [];

    centroids.forEach((centroid, idx) => {
        const dInc = scaledIncome - centroid[0];
        const dSpd = scaledSpending - centroid[1];
        const distance = Math.sqrt(dInc * dInc + dSpd * dSpd);
        
        distances.push({ index: idx + 1, dist: distance.toFixed(4) });
        
        if (distance < minDistance) {
            minDistance = distance;
            predictedCluster = idx;
        }
    });

    // Update UI details
    const resultSection = document.getElementById('result-section');
    const initialState = document.getElementById('initial-state');
    const resultState = document.getElementById('result-state');
    
    initialState.classList.add('hidden');
    resultState.classList.remove('hidden');

    const info = clusterMapping[predictedCluster];
    const badge = document.getElementById('result-segment');
    badge.innerText = info.segment;
    badge.style.backgroundColor = info.color;
    
    document.getElementById('result-strategy').innerText = info.strategy;
    
    // Render mathematical trace analysis
    const list = document.getElementById('distances-list');
    list.innerHTML = '';
    distances.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `Cluster ${item.index}: <span style="color: ${item.index - 1 === predictedCluster ? '#38bdf8' : '#cbd5e1'}">${item.dist}</span>`;
        list.appendChild(li);
    });
});

document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('income').value = '';
    document.getElementById('spending-score').value = 50;
    document.getElementById('score-value').innerText = '50';
    document.getElementById('initial-state').classList.remove('hidden');
    document.getElementById('result-state').classList.add('hidden');
});
