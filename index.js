"use strict";

// Selecting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  // hide dice
  diceEl.classList.add("hidden");
  // reset styles
  document.querySelector(".section-players").style.backgroundColor = "#ffec99";
  document.querySelector(".section-description").style.backgroundColor =
    "#fff9db";
  document.querySelector(".footer").style.backgroundColor = "#fff9db";
};
init();

const switchPlayer = function () {
  // reset score before change players
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing === true) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for roll is 1: if true
    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      // Select the player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch to next player
    else switchPlayer();
  }
});

// Hold Dice Functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score >= 100 player wins
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      // add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // remove player--active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // change styles
      document.querySelector(".section-players").style.backgroundColor =
        "#f06595";
      document.querySelector(".section-description").style.backgroundColor =
        "#ffec99";
      document.querySelector(".footer").style.backgroundColor = "#ffec99";
    }
    // switch to next player
    else switchPlayer();
  }
});

// New Game Functionality
btnNew.addEventListener("click", init);
