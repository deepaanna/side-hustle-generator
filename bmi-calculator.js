document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const weight = parseFloat(this.weight.value);
    const height = parseFloat(this.height.value) / 100; // Convert cm to m

    // Calculate BMI: weight (kg) / height (m)²
    const bmi = weight / (height * height);
    const formattedBMI = bmi.toFixed(1);

    // Determine category
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    // Tips for retention
    const tips = [
        'Pair this with our Micro-Workout Generator for progress!',
        'Check BMI weekly to track trends.',
        'Consult a doctor for personalized advice.',
        'Combine with a balanced diet for best results.',
        'Small changes add up—start today!'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Output
    const output = `
        <h3>Your BMI</h3>
        <p><strong>${formattedBMI}</strong> (${category})</p>
        <p><em>Based on ${weight} kg and ${height * 100} cm</em></p>
        <p><strong>Fitness Tip:</strong> ${randomTip}</p>
        <button onclick="saveBMI(${weight}, ${height * 100})">Save Result</button>
        <div id="saved-bmi"></div>
    `;

    document.getElementById('bmi-result').innerHTML = output;
});

// Save BMI to local storage
function saveBMI(weight, height) {
    const result = document.getElementById('bmi-result').innerHTML;
    localStorage.setItem('savedBMI', JSON.stringify({ weight, height, result }));
    displaySavedBMI();
}

// Display saved BMI
function displaySavedBMI() {
    const saved = JSON.parse(localStorage.getItem('savedBMI'));
    document.getElementById('saved-bmi').innerHTML = saved 
        ? `<h4>Saved: ${saved.weight} kg, ${saved.height} cm</h4>${saved.result}` 
        : '';
}

// Load saved BMI on page load
window.onload = displaySavedBMI;