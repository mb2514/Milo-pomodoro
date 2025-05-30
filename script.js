let timeLeft;
let timerId = null;
let isWorkTime = true;
let storedWorkTime = null;
let storedBreakTime = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    // Store current time before switching
    if (isWorkTime) {
        storedWorkTime = timeLeft;
    } else {
        storedBreakTime = timeLeft;
    }
    
    isWorkTime = !isWorkTime;
    
    // Use stored time if available, otherwise use default
    if (isWorkTime && storedWorkTime !== null) {
        timeLeft = storedWorkTime;
    } else if (!isWorkTime && storedBreakTime !== null) {
        timeLeft = storedBreakTime;
    } else {
        timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    }
    
    modeText.textContent = isWorkTime ? "It's time to work 🧑‍💼" : "It's time for a break 🧘";
    toggleButton.innerHTML = isWorkTime ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
        }
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    pauseTimer();
    isWorkTime = true;
    timeLeft = WORK_TIME;
    storedWorkTime = null;
    storedBreakTime = null;
    modeText.textContent = "It's time to work 🧑‍💼";
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', () => {
    pauseTimer();
    switchMode();
    startTimer();
});

// Initialize the display
resetTimer(); 