let timer;
let isWorkPhase = true;
let timeLeft;

document.getElementById('pomodoro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    clearInterval(timer);
    
    const workTime = parseInt(this.work.value) * 60;
    const breakTime = parseInt(this.break.value) * 60;
    timeLeft = workTime;
    isWorkPhase = true;

    document.getElementById('timer-display').textContent = formatTime(timeLeft);
    document.getElementById('stop-btn').style.display = 'inline-block';
    startTimer(workTime, breakTime);
});

document.getElementById('stop-btn').addEventListener('click', function() {
    clearInterval(timer);
    document.getElementById('timer-display').textContent = '00:00';
    document.getElementById('stop-btn').style.display = 'none';
    document.getElementById('pomodoro-result').innerHTML = '<p>Timer stopped.</p>';
});

function startTimer(workTime, breakTime) {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            isWorkPhase = !isWorkPhase;
            timeLeft = isWorkPhase ? workTime : breakTime;
            document.getElementById('pomodoro-result').innerHTML = `
                <p>${isWorkPhase ? 'Work time started!' : 'Break time started!'}</p>
            `;
            // Optional: Add a beep sound (upload beep.mp3 to repo or use a data URL)
            // new Audio('beep.mp3').play();
        }
        document.getElementById('timer-display').textContent = formatTime(timeLeft);
        timeLeft--;
    }, 1000);

    // Tips for retention
    const tips = [
        'Stay hydrated during breaks!',
        'Stand up and stretch after each session.',
        'Use breaks to clear your mind.',
        'Set a small goal for each work block.',
        'Consistency is key—keep it up!'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('pomodoro-result').innerHTML = `
        <p><strong>Productivity Tip:</strong> ${randomTip}</p>
        <button onclick="saveSettings(${workTime / 60}, ${breakTime / 60})">Save Settings</button>
        <div id="saved-settings"></div>
    `;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Save settings to local storage
function saveSettings(workTime, breakTime) {
    localStorage.setItem('pomodoroSettings', JSON.stringify({ work: workTime, break: breakTime }));
    displaySavedSettings();
}

// Display saved settings
function displaySavedSettings() {
    const saved = JSON.parse(localStorage.getItem('pomodoroSettings'));
    document.getElementById('saved-settings').innerHTML = saved 
        ? `<p>Saved: ${saved.work} min work, ${saved.break} min break</p>` 
        : '';
}

// Load saved settings on page load
window.onload = function() {
    const saved = JSON.parse(localStorage.getItem('pomodoroSettings'));
    if (saved) {
        document.querySelector('input[name="work"]').value = saved.work;
        document.querySelector('input[name="break"]').value = saved.break;
        document.getElementById('timer-display').textContent = formatTime(saved.work * 60);
    }
    displaySavedSettings();
};