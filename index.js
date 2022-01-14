"use strict";

const typingDiv = document.getElementById("quoteDisplay");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");
const whoSays = document.getElementById("whoSays");

var kayne = document.getElementById("kayne");
var jaden = document.getElementById("jaden");

let currentLevel = 1;
let score = 0;

//animation for startbutton
startGameBtn.classList.add("pound");

let pharagraphs = [];

function fn1() {
  //when radio checked for kayne
  if (kayne.checked === true)
    fetch("kayne.json").then((res) => {
      return res.json().then((loadedQuote) => {
        pharagraphs = loadedQuote;
        document.getElementById("whoSays").innerText = `Kayne Says type this`;
      });
    });
  //when radio checked for jaden
  else if (jaden.checked === true)
    fetch("jaden.json").then((res) => {
      return res.json().then((loadedQuote) => {
        pharagraphs = loadedQuote;
        document.getElementById("whoSays").innerText = `Jaden Says type this`;
      });
    });
}

fn1();
// Radio buttons or checkbox buttons ??

if (currentLevel === 10) {
  startGameBtn.classList.add("hidden");
}

const startGame = () => {
  //remove elements before starting game and add one
  startGameBtn.classList.add("hidden");
  kayne.classList.add("hidden");
  kayneLabel.classList.add("hidden");
  jaden.classList.add("hidden");
  jadenLabel.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";
  whoSays.classList.remove("hidden");
  whoSays.classList.add("pulse");

  //Display Current Level
  document.getElementById("level").innerText = `level = ${currentLevel}`;

  //Display Score
  document.getElementById("score").innerText = `score = ${score}`;

  //grab random quote from file
  const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
  });

  let cursorIndex = 0;
  let cursorCharacter = characters[0];
  cursorCharacter.classList.add("cursor");

  let startTime = null;

  const keydown = ({ key }) => {
    console.log(key);
    if (!startTime) {
      startTime = new Date();
    }

    if (key === cursorCharacter.innerText) {
      //We typed correct key
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorIndex];
    }
    if (cursorIndex >= characters.length) {
      //Game ended
      const endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const numberOfWords = text.split(" ").length;
      const wps = numberOfWords / seconds;
      const wpm = wps * 60.0;
      let wpmRound = Math.floor(wpm);
      document.getElementById("stats").innerText = `wpm = ${wpmRound}`;
      score = score + wpmRound;
      document.getElementById("score").innerText = `score = ${score}`;
      currentLevel = ++currentLevel;

      //Animation of Object responding to text will go here, maybe use progress bar tied to the quote and set breakpoints to 4 levels of animation
      console.log(currentLevel);
      // display the wpm, cpm
      document.removeEventListener("keydown", keydown);

      //startGame();
      if (currentLevel <= 10) {
        startGameBtn.classList.remove("hidden");
      } else {
        //startGameBtn.classList.add("hidden");
        typingDiv.classList.add("hidden");
      }
      return;
    }
    cursorCharacter.classList.add("cursor");
  };
  document.addEventListener("keydown", keydown);
};
