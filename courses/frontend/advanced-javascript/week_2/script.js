const timeInput = document.getElementById('time-input');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer-display');
const sScoreDisplay = document.getElementById('s-score');
const lScoreDisplay = document.getElementById('l-score');
const resultMessage = document.getElementById('result-message');
const resetBtn = document.getElementById('reset-btn');
const actionOverlay = document.getElementById('action-overlay');
const leaderboardList = document.getElementById('leaderboard-list');
const clearBtn = document.getElementById('clear-btn');


const startSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
const clickSound = new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg');
const winSound = new Audio('https://actions.google.com/sounds/v1/human_voices/crowd_cheer.ogg');


let sCount = 0;
let lCount = 0;
let isGameRunning = false;
let countdownInterval;


const slowConfetti = { max: 80, size: 1.5, clock: 7 };
const confettiS = new ConfettiGenerator({ target: 'confetti-s', ...slowConfetti });
const confettiL = new ConfettiGenerator({ target: 'confetti-l', ...slowConfetti });

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function handleKeyPress(event) {
    if (!isGameRunning) return;
    const key = event.key.toLowerCase();
    if (key === 's' || key === 'l') {
        clickSound.currentTime = 0;
        clickSound.play();
        if (key === 's') { sCount++; sScoreDisplay.innerText = sCount; }
        else { lCount++; lScoreDisplay.innerText = lCount; }
    }
}

function saveScore(winner, score) {
    let history = JSON.parse(localStorage.getItem('presserMedals')) || [];
    history.push({ name: winner, score: score });
    history.sort((a, b) => b.score - a.score);
    localStorage.setItem('presserMedals', JSON.stringify(history.slice(0, 5)));
    renderLeaderboard();
}

function renderLeaderboard() {
    const history = JSON.parse(localStorage.getItem('presserMedals')) || [];
    leaderboardList.innerHTML = history.map((entry, idx) => {
        let icon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "👤";
        return `<li><span>${icon} ${entry.name}</span> <span>${entry.score}</span></li>`;
    }).join('');
}

function endGame() {
    isGameRunning = false;
    clearInterval(countdownInterval);
    timerDisplay.innerText = "00:00";
    winSound.play();

    if (sCount > lCount) {
        resultMessage.innerText = "🏆 PLAYER S WINS! 🥳✨";
        confettiS.render();
        saveScore("Player S", sCount);
    } else if (lCount > sCount) {
        resultMessage.innerText = "🏆 PLAYER L WINS! 🥳✨";
        confettiL.render();
        saveScore("Player L", lCount);
    } else {
        resultMessage.innerText = "IT'S A DRAW! 🤝😊";
    }

    actionOverlay.classList.add('active');
}

startBtn.addEventListener('click', () => {
    const seconds = parseInt(timeInput.value);
    if (!seconds || seconds <= 0) return alert("Set a valid time!");

    sCount = 0; lCount = 0;
    sScoreDisplay.innerText = '0'; lScoreDisplay.innerText = '0';
    actionOverlay.classList.remove('active');
    confettiS.clear(); confettiL.clear();
    
    startSound.play();
    isGameRunning = true;
    let timeLeft = seconds;
    timerDisplay.innerText = formatTime(timeLeft);

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
        if (timeLeft <= 0) endGame();
    }, 1000);
});

resetBtn.addEventListener('click', () => {
    actionOverlay.classList.remove('active');
    sScoreDisplay.innerText = '0';
    lScoreDisplay.innerText = '0';
    confettiS.clear();
    confettiL.clear();
    timeInput.value = "";
    timerDisplay.innerText = "00:00";
});

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('presserMedals');
    renderLeaderboard();
});

window.addEventListener('keydown', handleKeyPress);
renderLeaderboard();
