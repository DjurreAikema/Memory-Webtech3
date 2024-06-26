import {generateLetterCards} from "./generate-letter-cards.js";
import {resetTimer, startTimer, stopTimer} from "./timer.js";
import {generateImageCards} from "./generate-image-cards.js";
import {getTopFive} from "./top-five.js";

// --- Elements
const board = document.getElementById('board');
const cardCharacterSelect = document.getElementById('cardCharacter');
const cardContentSelect = document.getElementById('cardContent');
const foundPairsElement = document.getElementById('foundPairs');

const cardColorClosedPicker = document.getElementById('cardColorClosed');
const cardColorOpenPicker = document.getElementById('cardColorOpen');
const cardColorFoundPicker = document.getElementById('cardColorFound');

const startGameButton = document.getElementById('startGame');

// --- Inputs
let boardSize = document.getElementById('boardSize').value;
let cardCharacter = document.getElementById('cardCharacter').value;

// --- Variables
const pairs = boardSize * boardSize / 2;
let cards = generateLetterCards(boardSize, pairs);
let openCards = [];
let foundPairs = 0;
let gameStarted = false;

foundPairsElement.textContent = foundPairs.toString();

// check open cards for a pair
const checkForPair = () => {
  if (openCards.length !== 2) return;
  const card1 = openCards[0];
  const card2 = openCards[1];

  if (card1.content !== card2.content) return;
  card1.changeState('found');
  card2.changeState('found');
  foundPairs++;
  foundPairsElement.textContent = foundPairs.toString();
  openCards = [];

  if (foundPairs === pairs) endGame();
};

const openCardAndCheckPair = (card) => {
  card.changeState('open');
  openCards.push(card);
  checkForPair();
};

// Handle a card being clicked
const cardClicked = (card) => {
  if (!gameStarted) {
    startTimer();
    gameStarted = true;
  }

  if (card.state !== 'closed') return;
  if (openCards.length < 2) {
    openCardAndCheckPair(card);
  } else {
    openCards.forEach(card => {
      card.changeState('closed');
      card.element.innerText = cardCharacter;
    });
    openCards = [];
    openCardAndCheckPair(card);
  }
};

// Add cards to the board
const addCardsToBoard = () => {
  for (let key in cards) {
    let card = cards[key];
    let div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('card-closed');
    div.style.backgroundSize = 'cover';
    div.innerText = cardCharacter;

    card.element = div;

    div.addEventListener('click', function () {
      cardClicked(card);
    });

    board.appendChild(div);
  }
};

const fillHighscoreList = async () => {
  const highscoreList = document.querySelector('.high-score ol');
  highscoreList.innerHTML = '';

  try {
    const scores = await getTopFive();
    scores.forEach(score => {
      const listItem = document.createElement('li');
      listItem.textContent = `${score.username}: ${score.score}`;
      highscoreList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error filling highscore list', error);
  }
};

await fillHighscoreList();
addCardsToBoard();

const endGame = () => {
  stopTimer();
  gameStarted = false;
  alert('You won! The game took ' + document.getElementById('currentPlayTime').textContent + 'econds.');
};

const resetGame = () => {
  resetTimer();
  gameStarted = false;
  board.innerHTML = '';
  // cards = generateCards(boardSize, pairs); TODO
  foundPairs = 0;
  foundPairsElement.textContent = foundPairs.toString();
  addCardsToBoard();
};

// --- Event Listeners --- //
startGameButton.addEventListener('click', resetGame);

cardCharacterSelect.addEventListener('change', function () {
  let cardCharacter = this.value;

  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.innerText = cardCharacter;
  });
});

cardContentSelect.addEventListener('change', async function () {
  let cardContent = this.value;

  if (cardContent === 'letterCards') {
    cards = generateLetterCards(boardSize, pairs);
  } else if (cardContent === 'randomImageCards') {
    cards = await generateImageCards(boardSize, pairs);
  }

  board.innerHTML = '';
  addCardsToBoard();
});

cardColorClosedPicker.addEventListener('change', function () {
  document.documentElement.style.setProperty('--card-color-closed', this.value);
});

cardColorOpenPicker.addEventListener('change', function () {
  document.documentElement.style.setProperty('--card-color-open', this.value);
});

cardColorFoundPicker.addEventListener('change', function () {
  document.documentElement.style.setProperty('--card-color-found', this.value);
});