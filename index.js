"use strict";

const typingDiv = document.getElementById("quoteDisplay");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");

const randomKayneQuote = "https://api.kanye.rest/";

// const pharagraphs = [`${renderNewQuote()}`];

const pharagraphs = [
  `Here with a dilemma A dip with an umbrella out my cellar Let her in quick, the medicine sip, whatever I'm clever on some accapella shit, that's my main strength`,
  `But never been too bad, as well, at this gettin brains thing I think the light's dim Not the type to fight gin`,
  `And bent like, psyched to hit the bed and strike skins Right then the phone ringin, but left it-Blowing in the night like the west`,
  `wind crescent My preference is a heavy snare Yes, instead of some soft shit, got a sweaty pair of breath mints`,
];

const startGame = () => {
  startGameBtn.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

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
      document.getElementById("stats").innerText = `wpm = ${wpm}`;
      // display the wpm, cpm
      document.removeEventListener("keydown", keydown);
      startGameBtn.classList.remove("hidden");
      return;
    }
    cursorCharacter.classList.add("cursor");
  };
  document.addEventListener("keydown", keydown);
};

function getRandomQuote() {
  return fetch(randomKayneQuote)
    .then((response) => response.json())
    .then((data) => data.quote);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  typingDiv.innerText = quote;

  // quote.split("").map((character) => {
  //   const characterSpan = document.createElement("span");
  //   characterSpan.innerText = character;
  //   typingDiv.appendChild(characterSpan);
  // });

  console.log(quote);
}
