import CardStateEnum from "./card-state.enum.js";
import CardModel from "./card.model.js";

// Elements
const board = document.getElementById('board');
const cardCharacterSelect = document.getElementById('cardCharacter');

// Inputs
let boardSize = document.getElementById('boardSize').value;
let cardCharacter = document.getElementById('cardCharacter').value;


// Dictionary of cards
let cards = {};

// Generate cards
const generateCards = () => {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      cards[`${x}, ${y}`] = new CardModel(x, y, '', CardStateEnum.CLOSED);
    }
  }
}

// Add cards to the board
const addCardsToBoard = () => {
  for (let card in cards) {
    let div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('card-closed');
    div.innerText = cardCharacter;
    board.appendChild(div);
  }
}

generateCards();
addCardsToBoard();
console.log(cards);


// Add event listener
cardCharacterSelect.addEventListener('change', function() {
  // Get the new value
  let cardCharacter = this.value;

  // Update the UI
  // For example, if you want to update all cards on the board:
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.innerText = cardCharacter;
  });
});