import CardModel from "./card.model.js";
import CardStateEnum from "./card-state.enum.js";
import {shuffle} from "./generate-letter-cards.js";

export const generateImageCards = async (boardSize, pairs) => {
  // Dictionary of cards
  const cards = {};

  // generate random images
  const randomImages = await generateRandomImageUrls(boardSize, pairs);

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      cards[`${x}, ${y}`] = new CardModel(x, y, randomImages.pop(), CardStateEnum.CLOSED, null);
    }
  }

  return cards;
}

const generateRandomImageUrls = async (boardSize, pairs) => {
  let images = [];

  for (let i = 0; i < pairs; i++) {
    const response = await fetch('https://picsum.photos/200');
    const imgUrl = response.url;

    images.push(imgUrl);
    images.push(imgUrl);
  }

  return shuffle(images);
}