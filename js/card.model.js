class CardModel {
  constructor(x, y, content, state, element, imgCard) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.state = state;
    this.element = element;
    this.imgCard = imgCard;
  }

  changeState(newState) {
    this.state = newState;
    this.updateUI();
  }

  updateUI() {
    if (this.state === 'open') {
      this.element.classList.add('card-open');
      this.element.classList.remove('card-closed');
      if (this.imgCard) {
        this.element.style.backgroundImage = `url(${this.content})`;
        this.element.innerText = '';
      }
      else this.element.innerText = this.content;
    } else if (this.state === 'closed') {
      this.element.classList.add('card-closed');
      this.element.classList.remove('card-open');
      if (this.imgCard) this.element.style.backgroundImage = `url()`;
    } else if (this.state === 'found') {
      this.element.classList.add('card-found');
      this.element.classList.remove('card-open');
      this.element.classList.remove('card-closed');
    }
  }
}

export default CardModel;