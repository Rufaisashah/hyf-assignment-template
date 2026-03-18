
const display = document.getElementById('display-area');
let lastClickTime = 0;


function logToPage(message) {
    const p = document.createElement('p');
    p.innerText = message;
    display.appendChild(p);
}

// TASK 1 & 2

function logWithDelay(delay, stringToLog) {
    setTimeout(() => {
        logToPage(stringToLog);
    }, delay * 1000);
}

//  TASK 4
const earthLogger = () => logToPage("Earth");
const saturnLogger = () => logToPage("Saturn");

function planetLogFunction(callback) {
    callback(); 
}

//  TASK 7: runAfterDelay 
function runAfterDelay(delay, callback) {
    setTimeout(callback, delay * 1000);
}

//TASK 9
function jokeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
    if (shouldTellFunnyJoke) {
        logFunnyJoke();
    } else {
        logBadJoke();
    }
}

// The two joke functionsadd
const funny = () => logToPage("Funny Joke: Why did the web developer walk out of the restaurant? Because of the table layout.");
const bad = () => logToPage("Bad Joke: I'm reading a book on anti-gravity. It's impossible to put down.");


// EVENT LISTENERS 

// Task 3 5-second button
document.getElementById('delay-btn-5').addEventListener('click', () => {
    logWithDelay(5, "Called after 5 seconds");
});

// Task 5: Location button
// Task 5: Location button
document.getElementById('geo-btn').addEventListener('click', () => {
    
    // 1. Tell the user we are working on it
    logToPage("Checking your coordinates...");

    navigator.geolocation.getCurrentPosition((pos) => {
        // 2. Get the numbers from the "pos" object
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // 3. Create the exact message you want
        // .toFixed(4) makes the numbers shorter so they look better
        const message = `This is the latitude: ${lat.toFixed(4)} and this is the longitude: ${lon.toFixed(4)}`;
        
        // 4. Send it to the screen!
        logToPage(message);
    });
});
// Task 7: Custom Delay button
document.getElementById('run-delay-btn').addEventListener('click', () => {
    const seconds = document.getElementById('user-delay').value;
    runAfterDelay(seconds, () => {
        logToPage(`✅ Finished waiting ${seconds} seconds!`);
    });
});

// Task 9: Connecting Joke Buttons
document.getElementById('funny-btn').addEventListener('click', () => {
    jokeCreator(true, funny, bad);
});

document.getElementById('bad-btn').addEventListener('click', () => {
    jokeCreator(false, funny, bad);
});

// Task 8: Double Click (Global listener)
window.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
        logToPage("🖱️ Double click!");
    }
    lastClickTime = now;
});

// --- EXECUTION ON LOAD ---

// Task 1: Auto-log after 2.5s
logWithDelay(2.5, "Called after 2.5 seconds (Auto-load)");

// Task 2: Testing logWithDelay with different arguments
logWithDelay(1, "Testing delay logic: 1 second call");

// Task 4: Testing Planet Logger
planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);