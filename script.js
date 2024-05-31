import {generateCards} from "./generate-cards.js";

// Elements
const board = document.getElementById('board');
const cardCharacterSelect = document.getElementById('cardCharacter');

// Inputs
let boardSize = document.getElementById('boardSize').value;
let cardCharacter = document.getElementById('cardCharacter').value;

// Dictionary of cards
let cards = generateCards(boardSize);

// Add cards to the board
const addCardsToBoard = () => {
  for (let key in cards) {
    let card = cards[key];
    let div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('card-closed');
    div.innerText = cardCharacter;
    div.addEventListener('click', function () {
      console.log(`Card at x: ${card.x}, y: ${card.y} was clicked.`);
    });
    board.appendChild(div);
  }
}

generateCards();
addCardsToBoard();
console.log(cards);


// Card character select event listener
cardCharacterSelect.addEventListener('change', function () {
  let cardCharacter = this.value;

  // Update the UI
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.innerText = cardCharacter;
  });
});