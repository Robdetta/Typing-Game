"use strict";

const typingDiv = document.getElementById("quoteDisplay");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");

var kayne = document.getElementById("kayne");
var jaden = document.getElementById("jaden");

let currentLevel = 1;
let score = 0;

// let level = document.getElementById("level").innerText;

//const randomKayneQuote = "https://api.kanye.rest/";

// let radioBtns = document.querySelectorAll("input[name='database']");

// let findSelected = () => {
//   let selected = document.querySelector("input[name='database']:checked").value;
//   // console.log(selected);
// };

// radioBtns.forEach((radioBtn) => {
//   radioBtn.addEventListener("change", findSelected);
// });

let pharagraphs = [];

function fn1() {
  // var kayne = document.getElementById("kayne");
  // var jaden = document.getElementById("jaden");
  if (kayne.checked === true)
    fetch("kayne.json").then((res) => {
      return res.json().then((loadedQuote) => {
        pharagraphs = loadedQuote;
      });
    });
  else if (jaden.checked === true)
    fetch("jaden.json").then((res) => {
      return res.json().then((loadedQuote) => {
        pharagraphs = loadedQuote;
      });
    });
}

fn1();
// Radio buttons or checkbox buttons ??

if (currentLevel === 10) {
  startGameBtn.classList.add("hidden");
}

const startGame = () => {
  startGameBtn.classList.add("hidden");
  kayne.classList.add("hidden");
  kayneLabel.classList.add("hidden");
  jaden.classList.add("hidden");
  jadenLabel.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

  //Display Current Level
  document.getElementById("level").innerText = `level = ${currentLevel}`;

  //Display Score
  document.getElementById("score").innerText = `score = ${score}`;

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
