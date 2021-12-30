"use strict";

const typingDiv = document.getElementById("quoteDisplay");

const randomKayneQuote = "https://api.kanye.rest/";

//API text needs to go here
const text = `Some random text here`;

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
let endDate = null;

document.addEventListener("keydown", ({ key }) => {
  console.log(key);
  if (!startTime) {
    startTime = new Date();
  }

  if (key === cursorCharacter.innerText) {
    //We typed correct key
    cursorCharacter.classList.remove("cursor");
    cursorCharacter.classList.add("done");
    cursorCharacter = characters[++cursorIndex];
    cursorCharacter.classList.add("cursor");
  }
  if (cursorIndex >= characters.length) {
    endTime = new Date();

    // display the wpm, cpm
  }
});

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

  //console.log(quote);
}
