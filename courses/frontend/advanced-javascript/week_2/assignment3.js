// Functions in an Array (The "Game Sequence")

//// An array of 3 game-related functions

const gameStartTasks = [
  function () {
    console.log("Sound On");
  },
  function () {
    console.log("Timer Ready");
  },
  function () {
    console.log("Game Start");
  },
];

console.log("--- Executing Game Start Sequence ---");
gameStartTasks.forEach(function (task) {
  task();
});

//2. Function Declaration vs. Expression (Game Logic)
function formatTimeNormal(seconds) {
  console.log("Formatting time the standard way...");
  return seconds + "s";
}

// A Function as a Const: Not hoisted, safer for fixed game logic.
const formatTimeConst = function (seconds) {
  console.log("Formatting time using a constant expression...");
  return seconds + "s";
};

formatTimeNormal(10);
formatTimeConst(10);

// 3. Function as an Object Key (The Game 'Engine')
// I created a 'gameManager' object where the keys are game actions.
const gameManager = {
  title: "The Fastest Presser",
  difficulty: "Hard",
  triggerWin: function () {
    console.log("🏆 winner! Pop-up active and confetti falling!");
  },
};
