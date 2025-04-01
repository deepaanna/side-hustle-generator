document.getElementById('workout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const time = parseInt(this.time.value);
    const focus = this.focus.value;
    const equipment = this.equipment.value;
    const intensity = this.intensity.value;

    // Exercise database
    const exercises = {
        full: {
            none: [
                { name: 'Squats', low: '10 reps', high: '20 reps', desc: 'Stand, lower hips, up.' },
                { name: 'Push-Ups', low: '5 reps', high: '15 reps', desc: 'Plank, lower chest.' },
                { name: 'Plank', low: '15 sec', high: '30 sec', desc: 'Hold on forearms.' },
                { name: 'Jumping Jacks', low: '20 reps', high: '40 reps', desc: 'Jump, spread arms/legs.' }
            ],
            basic: [
                { name: 'Dumbbell Squats', low: '10 reps', high: '20 reps', desc: 'Hold weights, squat.' },
                { name: 'Dumbbell Rows', low: '8 reps/side', high: '15 reps/side', desc: 'Bend, pull weight up.' },
                { name: 'Band Pull-Aparts', low: '15 reps', high: '25 reps', desc: 'Pull band apart.' },
                { name: 'Mountain Climbers', low: '20 sec', high: '40 sec', desc: 'Plank, knees to chest.' }
            ]
        },
        core: {
            none: [
                { name: 'Crunches', low: '15 reps', high: '30 reps', desc: 'Lie back, lift shoulders.' },
                { name: 'Plank', low: '20 sec', high: '45 sec', desc: 'Hold steady.' },
                { name: 'Leg Raises', low: '10 reps', high: '20 reps', desc: 'Lie flat, lift legs.' },
                { name: 'Bicycle Crunches', low: '10/side', high: '20/side', desc: 'Twist elbow to knee.' }
            ],
            basic: [
                { name: 'Weighted Crunches', low: '12 reps', high: '25 reps', desc: 'Hold dumbbell, crunch.' },
                { name: 'Band Twists', low: '15 reps', high: '30 reps', desc: 'Rotate with band.' },
                { name: 'Plank with Band Pull', low: '20 sec', high: '40 sec', desc: 'Plank, pull band.' },
                { name: 'Russian Twists', low: '15/side', high: '25/side', desc: 'Twist with weight.' }
            ]
        },
        upper: {
            none: [
                { name: 'Push-Ups', low: '5 reps', high: '15 reps', desc: 'Plank, lower chest.' },
                { name: 'Tricep Dips', low: '8 reps', high: '20 reps', desc: 'Use chair, lower body.' },
                { name: 'Arm Circles', low: '20 sec', high: '40 sec', desc: 'Extend arms, circle.' },
                { name: 'Plank Shoulder Taps', low: '10/side', high: '20/side', desc: 'Plank, tap opposite shoulder.' }
            ],
            basic: [
                { name: 'Dumbbell Shoulder Press', low: '8 reps', high: '15 reps', desc: 'Push weights up.' },
                { name: 'Dumbbell Curls', low: '10 reps', high: '20 reps', desc: 'Curl weights to shoulders.' },
                { name: 'Band Tricep Pushdowns', low: '12 reps', high: '25 reps', desc: 'Push band down.' },
                { name: 'Dumbbell Flys', low: '8 reps', high: '15 reps', desc: 'Open arms with weights.' }
            ]
        },
        lower: {
            none: [
                { name: 'Squats', low: '10 reps', high: '20 reps', desc: 'Lower hips, up.' },
                { name: 'Lunges', low: '8/side', high: '15/side', desc: 'Step forward, lower.' },
                { name: 'Calf Raises', low: '15 reps', high: '30 reps', desc: 'Lift heels up.' },
                { name: 'Wall Sit', low: '20 sec', high: '45 sec', desc: 'Lean against wall, hold.' }
            ],
            basic: [
                { name: 'Dumbbell Deadlifts', low: '8 reps', high: '15 reps', desc: 'Bend, lift weights.' },
                { name: 'Weighted Lunges', low: '8/side', high: '15/side', desc: 'Step with weights.' },
                { name: 'Band Side Steps', low: '12/side', high: '20/side', desc: 'Step sideways with band.' },
                { name: 'Dumbbell Step-Ups', low: '10/side', high: '20/side', desc: 'Step up with weights.' }
            ]
        }
    };

    // Warm-up and cool-down
    const warmUp = [{ name: 'Arm Swings', duration: '20 sec', desc: 'Swing arms loosely.' }];
    const coolDown = [{ name: 'Hamstring Stretch', duration: '20 sec/side', desc: 'Reach for toes.' }];

    // Build workout
    let pool = [...exercises[focus][equipment]];
    pool.sort(() => Math.random() - 0.5);
    const maxExercises = time === 3 ? 1 : time === 5 ? 2 : time === 10 ? 3 : 4;
    const mainWorkout = pool.slice(0, maxExercises);

    // Adjust reps/time by intensity
    const workoutList = mainWorkout.map(ex => ({
        name: ex.name,
        effort: ex[intensity],
        desc: ex.desc
    }));

    // Tips
    const tips = [
        'Stay hydrated—sip water between sets.',
        'Focus on form over speed to avoid injury.',
        'Add 1 min daily to build stamina.',
        'Pair with a healthy snack post-workout.',
        'Consistency beats intensity—keep it up!'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Output
    const warmUpOutput = warmUp.map(ex => `<li><strong>${ex.name}</strong> (${ex.duration})<br>${ex.desc}</li>`).join('');
    const mainOutput = workoutList.map(ex => `<li><strong>${ex.name}</strong> (${ex.effort})<br>${ex.desc}</li>`).join('');
    const coolDownOutput = coolDown.map(ex => `<li><strong>${ex.name}</strong> (${ex.duration})<br>${ex.desc}</li>`).join('');

    const output = `
        <h3>Your ${time}-Minute ${focus.charAt(0).toUpperCase() + focus.slice(1)} Workout</h3>
        <h4>Warm-Up</h4><ul>${warmUpOutput}</ul>
        <h4>Main Workout</h4><ul>${mainOutput}</ul>
        <h4>Cool-Down</h4><ul>${coolDownOutput}</ul>
        <p><strong>Fitness Tip:</strong> ${randomTip}</p>
        <p><em>${intensity.charAt(0).toUpperCase() + intensity.slice(1)} intensity with ${equipment === 'none' ? 'no' : 'basic'} equipment!</em></p>
        <button onclick="saveWorkout()">Save Workout</button>
        <div id="saved-workout"></div>
    `;

    document.getElementById('workout-result').innerHTML = output;
});

// Save workout to local storage
function saveWorkout() {
    const result = document.getElementById('workout-result').innerHTML;
    localStorage.setItem('savedWorkout', result);
    displaySavedWorkout();
}

// Display saved workout
function displaySavedWorkout() {
    const saved = localStorage.getItem('savedWorkout');
    document.getElementById('saved-workout').innerHTML = saved ? `<h4>Saved Workout:</h4>${saved}` : '';
}

// Load saved workout on page load
window.onload = displaySavedWorkout;