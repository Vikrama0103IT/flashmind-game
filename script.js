
/* ================= COLORS ================= */

const colors=[

"green",
"red",
"yellow",
"blue",
"purple",
"orange",
"pink",
"cyan"

];

let gamePattern=[];
let userPattern=[];
let level=0;
let clickCount=0;


/* ================= SCREENS ================= */

const homeScreen=document.getElementById("home-screen");

const gameScreen=document.getElementById("game-screen");


/* ================= BUTTONS ================= */

const playBtn=document.getElementById("play-btn");

const helpBtn=document.getElementById("help-btn");

const helpPopup=document.getElementById("help-popup");

const closeHelp=document.getElementById("close-help");


/* ================= GAME ELEMENTS ================= */

const statusText=document.getElementById("status-text");

const clickDisplay=document.getElementById("click-count");

const sequenceDisplay=document.getElementById("sequence-display");

const levelMessage=document.getElementById("level-message");


/* ================= PLAY GAME ================= */

playBtn.onclick=()=>{

homeScreen.style.display="none";

gameScreen.style.display="block";

startGame();

};


/* ================= HELP ================= */

helpBtn.onclick=()=>{

helpPopup.style.display="flex";

};

closeHelp.onclick=()=>{

helpPopup.style.display="none";

};

helpPopup.onclick=(e)=>{

if(e.target===helpPopup){

helpPopup.style.display="none";

}

};



/* ================= START GAME ================= */

function startGame(){

level=0;

gamePattern=[];

userPattern=[];

clickCount=0;

clickDisplay.textContent=0;

sequenceDisplay.textContent="-";

statusText.textContent="Level 0";

nextSequence();

}



/* ================= NEXT LEVEL ================= */

function nextSequence(){

userPattern=[];

clickCount=0;

clickDisplay.textContent=0;

level++;

statusText.textContent=`Level ${level}`;

const randomColor=

colors[Math.floor(Math.random()*colors.length)];

gamePattern.push(randomColor);

animateSequence();

}



/* ================= SHOW PATTERN ================= */

function animateSequence(){

disableUserInput();

let i=0;

const interval=setInterval(()=>{

flashButton(gamePattern[i]);

i++;

if(i>=gamePattern.length){

clearInterval(interval);

enableUserInput();

}

},600);

}



/* ================= FLASH BUTTON ================= */

function flashButton(color){

const btn=document.getElementById(color);

btn.classList.add("active");

setTimeout(()=>{

btn.classList.remove("active");

},300);

}



/* ================= ENABLE INPUT ================= */

function enableUserInput(){

colors.forEach(color=>{

const btn=document.getElementById(color);

/* pointerdown = mobile + desktop */

btn.addEventListener(

"pointerdown",

handleClick

);

});

}



/* ================= DISABLE INPUT ================= */

function disableUserInput(){

colors.forEach(color=>{

const btn=document.getElementById(color);

btn.removeEventListener(

"pointerdown",

handleClick

);

});

}



/* ================= USER CLICK ================= */

function handleClick(e){

// prevent double firing

e.preventDefault();

const clicked=e.currentTarget.id;

userPattern.push(clicked);

flashButton(clicked);

clickCount++;

clickDisplay.textContent=clickCount;

updateSequence();

checkAnswer(userPattern.length-1);

}



/* ================= SHOW USER SEQUENCE ================= */

function updateSequence(){

sequenceDisplay.innerHTML="";

userPattern.forEach(color=>{

const span=document.createElement("span");

span.style.color=color;

span.textContent=color.toUpperCase()+" ";

sequenceDisplay.appendChild(span);

});

}



/* ================= CHECK ANSWER ================= */

function checkAnswer(index){

if(userPattern[index]===gamePattern[index]){

// LEVEL COMPLETE

if(userPattern.length===gamePattern.length){

disableUserInput();

showMessage(

`Level ${level} Cleared!`,

"green"

);

setTimeout(()=>{

hideMessage();

nextSequence();

},1500);

}

}

else{

disableUserInput();

showMessage(

`Game Over!`,

"red"

);

statusText.textContent="Game Over";

setTimeout(()=>{

gameScreen.style.display="none";

homeScreen.style.display="flex";

},2000);

}

}



/* ================= MESSAGE ================= */

function showMessage(text,color){

levelMessage.textContent=text;

levelMessage.style.color=color;

levelMessage.classList.add("show");

}


function hideMessage(){

levelMessage.classList.remove("show");

}
