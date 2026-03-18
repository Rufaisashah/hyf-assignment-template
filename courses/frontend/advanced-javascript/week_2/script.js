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

// 3. State
let sCount = 0;
let lCount = 0;
let isGameRunning = false;
let countdownInterval;

// 4. Slow-Motion Confetti Config
const slowConfetti = { max: 80, size: 1.5, clock: 7 };
const confettiS = new ConfettiGenerator({ target: 'confetti-s', ...slowConfetti });
const confettiL = new ConfettiGenerator({ target: 'confetti-l', ...slowConfetti });
