const colors = ["green", "red", "yellow", "blue", "purple", "orange", "pink", "cyan"];

let gamePattern = [];
let userPattern = [];
let level = 0;
let score = 0;


// --- Audio Configuration ---

const bgMusic = new Audio('bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.2;

const sfx = {
    tap: new Audio('tap.mp3'),
    success: new Audio('success.mp3'),
    wrong: new Audio('wrong.mp3')
};

function playSound(audio) {
    audio.currentTime = 0;
    audio.play().catch(e => console.warn("Audio issue:", e));
}


// --- UI Elements ---

const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const playBtn = document.getElementById("play-btn");
const statusText = document.getElementById("status-text");
const sequenceDisplay = document.getElementById("sequence-display");
const levelMessage = document.getElementById("level-message");


// ✅ PLAY BUTTON STARTS GAME DIRECTLY

playBtn.onclick = () => {

    homeScreen.style.display = "none";
    gameScreen.style.display = "flex";

    bgMusic.play().catch(()=>{});

    startGame();
};


// --- Game Logic ---

function startGame() {

    level = 0;
    score = 0;

    gamePattern = [];

    nextSequence();
}


function nextSequence() {

    userPattern = [];

    level++;

    statusText.textContent = level;

    sequenceDisplay.textContent = "Watching...";

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    gamePattern.push(randomColor);

    setTimeout(animateSequence, 1000);
}


function animateSequence() {

    disableUserInput();

    let i = 0;

    const interval = setInterval(() => {

        if (i >= gamePattern.length) {

            clearInterval(interval);

            setTimeout(() => {

                enableUserInput();

                sequenceDisplay.textContent = "Your Turn!";

            }, 400);

            return;
        }

        flashButton(gamePattern[i]);

        i++;

    }, 700);
}


function flashButton(color) {

    const btn = document.getElementById(color);

    if (!btn) return;

    playSound(sfx.tap);

    btn.classList.remove("active");

    void btn.offsetWidth;

    requestAnimationFrame(() => {

        btn.classList.add("active");

        setTimeout(() => {

            btn.classList.remove("active");

        }, 250);

    });
}


function enableUserInput() {

    colors.forEach(color => {

        const el = document.getElementById(color);

        if (el) {

            el.style.pointerEvents = "auto";

            el.onclick = handleClick;

        }

    });
}


function disableUserInput() {

    colors.forEach(color => {

        const el = document.getElementById(color);

        if (el) {

            el.style.pointerEvents = "none";

            el.onclick = null;

        }

    });
}


function handleClick(e) {

    const clicked = e.currentTarget.id;

    userPattern.push(clicked);

    flashButton(clicked);

    checkAnswer(userPattern.length - 1);
}


function checkAnswer(index) {

    if (userPattern[index] === gamePattern[index]) {

        if (userPattern.length === gamePattern.length) {

            score += 10;

            disableUserInput();

            setTimeout(() => {

                playSound(sfx.success);

                showMessage("Level Cleared!", "#2ecc71");

            }, 200);

            setTimeout(nextSequence, 1400);

        }

    } else {

        handleMistake();

    }
}


function handleMistake() {

    disableUserInput();

    playSound(sfx.wrong);

    gameScreen.classList.add("shake");

    setTimeout(() => {

        gameScreen.classList.remove("shake");

    }, 400);

    showMessage("Try Again!", "#f1c40f");

    userPattern = [];

    // replay same level

    setTimeout(() => {

        sequenceDisplay.textContent = "Watching...";

        animateSequence();

    }, 1600);
}


function showMessage(text, color) {

    levelMessage.textContent = text;

    levelMessage.style.color = color;

    levelMessage.style.opacity = "1";

    setTimeout(() => {

        levelMessage.style.opacity = "0";

    }, 800);
}
