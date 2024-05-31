import CardModel from "./card.model.js";
import CardStateEnum from "./card-state.enum.js";

export const generateCards = (boardSize) => {
  // Dictionary of cards
  let cards = {};

  // generate random letters
  let randomLetters = generateRandomLetters(boardSize);

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      cards[`${x}, ${y}`] = new CardModel(x, y, randomLetters.pop(), CardStateEnum.CLOSED, null);
    }
  }

  return cards;
}

const generateRandomLetters = (boardSize) => {
  let letters = [];
  let pairs = boardSize * boardSize / 2;
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < pairs; i++) {
    let letter = alphabet[i];
    letters.push(letter);
    letters.push(letter);
  }

  return shuffle(letters);
}

// Shuffle array
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}