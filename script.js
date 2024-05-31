import {generateCards} from "./generate-cards.js";

// --- Elements
const board = document.getElementById('board');
const cardCharacterSelect = document.getElementById('cardCharacter');
const foundPairsElement = document.getElementById('foundPairs');

// --- Inputs
let boardSize = document.getElementById('boardSize').value;
let cardCharacter = document.getElementById('cardCharacter').value;

// --- Variables
let cards = generateCards(boardSize);
let openCards = [];
let foundPairs = 0;
foundPairsElement.textContent = foundPairs.toString();

// check open cards for a pair
const checkForPair = () => {
  if (openCards.length === 2) {
    let card1 = openCards[0];
    let card2 = openCards[1];

    if (card1.letter === card2.letter) {
      card1.changeState('found');
      card2.changeState('found');
      foundPairs++;
      foundPairsElement.textContent = foundPairs.toString();
      openCards = [];
    }
  }
}

// Handle a card being clicked
const cardClicked = (card) => {
  if (card.state === 'closed' && openCards.length < 2) {
    card.changeState('open');
    openCards.push(card);
    checkForPair();
  } else if (card.state === 'closed' && openCards.length === 2) {
    openCards.forEach(card => {
      card.changeState('closed');
      card.element.innerText = cardCharacter;
    });
    openCards = [];

    card.changeState('open');
    openCards.push(card);
    checkForPair();
  }
}

// Add cards to the board
const addCardsToBoard = () => {
  for (let key in cards) {
    let card = cards[key];
    let div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('card-closed');
    div.innerText = cardCharacter;
    card.element = div;

    div.addEventListener('click', function () {
      cardClicked(card);
    });

    board.appendChild(div);
  }
}

addCardsToBoard();

// --- Event Listeners --- //
cardCharacterSelect.addEventListener('change', function () {
  let cardCharacter = this.value;

  // Update the UI
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.innerText = cardCharacter;
  });
});