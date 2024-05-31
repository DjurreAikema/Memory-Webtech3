class CardModel {
  constructor(x, y, letter, state, element) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.state = state;
    this.element = element;
  }

  changeState(newState) {
    this.state = newState;
    this.updateUI();
  }

  updateUI() {
    if (this.state === 'open') {
      this.element.classList.add('card-open');
      this.element.classList.remove('card-closed');
      this.element.innerText = this.letter;
    } else if (this.state === 'closed') {
      this.element.classList.add('card-closed');
      this.element.classList.remove('card-open');
    } else if (this.state === 'found') {
      this.element.classList.add('card-found');
      this.element.classList.remove('card-open');
      this.element.classList.remove('card-closed');
    }
  }
}

export default CardModel;