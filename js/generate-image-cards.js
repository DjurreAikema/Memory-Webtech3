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
      cards[`${x}, ${y}`] = new CardModel(randomImages.pop(), CardStateEnum.CLOSED, null, true);
    }
  }

  return cards;
};

const generateRandomImageUrls = async (boardSize, pairs) => {
  const imagePromises = Array.from({length: pairs}, () =>
    fetch('https://picsum.photos/200'));

  try {
    const responses = await Promise.all(imagePromises);
    const images = [];

    for (const response of responses) {
      const imgUrl = response.url;
      images.push(imgUrl);
      images.push(imgUrl);
    }

    return shuffle(images);
  } catch (error) {
    console.error('Error fetching images', error);
  }
};