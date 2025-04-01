document.getElementById('pros-cons-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const decision = this.decision.value.trim();
    const category = this.category.value;
    const userPros = this['user-pros'].value.split(',').map(p => p.trim()).filter(p => p);
    const userCons = this['user-cons'].value.split(',').map(c => c.trim()).filter(c => c);

    // Pre-defined pros and cons by category
    const prosConsData = {
        career: {
            pros: ['Career growth', 'Skill development', 'Networking opportunities'],
            cons: ['Time commitment', 'Work-life balance strain', 'Uncertainty'],
            consOfPros: {
                'Career growth': 'Increased pressure',
                'Skill development': 'Learning curve',
                'Networking opportunities': 'Time to maintain contacts'
            },
            prosOfCons: {
                'Time commitment': 'Builds discipline',
                'Work-life balance strain': 'Teaches prioritization',
                'Uncertainty': 'Fosters adaptability'
            }
        },
        lifestyle: {
            pros: ['Improved well-being', 'More free time', 'Personal fulfillment'],
            cons: ['Adjustment period', 'Potential costs', 'Discomfort initially'],
            consOfPros: {
                'Improved well-being': 'Effort to maintain',
                'More free time': 'Risk of boredom',
                'Personal fulfillment': 'May require sacrifice'
            },
            prosOfCons: {
                'Adjustment period': 'Builds resilience',
                'Potential costs': 'Encourages budgeting',
                'Discomfort initially': 'Growth through challenge'
            }
        },
        finance: {
            pros: ['Extra income', 'Financial security', 'Investment potential'],
            cons: ['Initial costs', 'Risk of loss', 'Time to manage'],
            consOfPros: {
                'Extra income': 'Tax implications',
                'Financial security': 'Ongoing effort',
                'Investment potential': 'Market volatility'
            },
            prosOfCons: {
                'Initial costs': 'Motivates planning',
                'Risk of loss': 'Teaches risk management',
                'Time to manage': 'Improves financial literacy'
            }
        },
        other: {
            pros: ['Flexibility', 'New experiences', 'Personal growth'],
            cons: ['Uncertainty', 'Effort required', 'Possible setbacks'],
            consOfPros: {
                'Flexibility': 'Lack of structure',
                'New experiences': 'Steep learning curve',
                'Personal growth': 'Emotional challenges'
            },
            prosOfCons: {
                'Uncertainty': 'Builds adaptability',
                'Effort required': 'Strengthens work ethic',
                'Possible setbacks': 'Encourages problem-solving'
            }
        }
    };

    // Combine user and pre-defined pros/cons
    const data = prosConsData[category];
    const pros = [...new Set([...data.pros, ...userPros])];
    const cons = [...new Set([...data.cons, ...userCons])];

    // Generate cons of pros and pros of cons
    const consOfPros = pros.map(p => ({
        pro: p,
        con: data.consOfPros[p] || 'Possible downside not specified'
    }));
    const prosOfCons = cons.map(c => ({
        con: c,
        pro: data.prosOfCons[c] || 'Potential upside not specified'
    }));

    // Decision aid: Simple scoring
    const score = pros.length - cons.length;
    const recommendation = score > 0 ? 'Lean Yes' : score < 0 ? 'Lean No' : 'Needs More Thought';

    // Tips for retention
    const tips = [
        'Sleep on it before deciding.',
        'Talk it over with a friend for perspective.',
        'Write down your gut feeling first.',
        'Consider the worst-case scenario.',
        'Focus on long-term impact over short-term gain.'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Output
    const prosList = pros.map(p => `<li>${p}</li>`).join('');
    const consList = cons.map(c => `<li>${c}</li>`).join('');
    const consOfProsList = consOfPros.map(cp => `<li><strong>${cp.pro}</strong>: ${cp.con}</li>`).join('');
    const prosOfConsList = prosOfCons.map(pc => `<li><strong>${pc.con}</strong>: ${pc.pro}</li>`).join('');

    const output = `
        <h3>Analysis for: "${decision}"</h3>
        <h4>Pros</h4><ul>${prosList}</ul>
        <h4>Cons</h4><ul>${consList}</ul>
        <h4>Cons of Pros</h4><ul>${consOfProsList}</ul>
        <h4>Pros of Cons</h4><ul>${prosOfConsList}</ul>
        <p><strong>Score:</strong> ${pros.length} Pros vs. ${cons.length} Cons</p>
        <p><strong>Recommendation:</strong> ${recommendation}</p>
        <p><strong>Decision Tip:</strong> ${randomTip}</p>
        <button onclick="saveDecision('${decision}')">Save Analysis</button>
        <div id="saved-decision"></div>
    `;

    document.getElementById('pros-cons-result').innerHTML = output;
});

// Save decision to local storage
function saveDecision(decision) {
    const result = document.getElementById('pros-cons-result').innerHTML;
    localStorage.setItem('savedDecision', JSON.stringify({ decision, result }));
    displaySavedDecision();
}

// Display saved decision
function displaySavedDecision() {
    const saved = JSON.parse(localStorage.getItem('savedDecision'));
    document.getElementById('saved-decision').innerHTML = saved 
        ? `<h4>Saved Analysis for "${saved.decision}":</h4>${saved.result}` 
        : '';
}

// Load saved decision on page load
window.onload = displaySavedDecision;