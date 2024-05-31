class CardModel {
  constructor(content, state, element, imgCard) {
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
    let backgroundImage = `url(${this.content})`;
    let innerText = ' ';

    switch (this.state) {
      case 'open':
        this.element.classList.add('card-open');
        this.element.classList.remove('card-closed');
        if (!this.imgCard) innerText = this.content;
        break;
      case 'closed':
        this.element.classList.add('card-closed');
        this.element.classList.remove('card-open');
        if (this.imgCard) backgroundImage = '';
        break;
      case 'found':
        this.element.classList.add('card-found');
        this.element.classList.remove('card-open', 'card-closed');
        if (!this.imgCard) innerText = this.content;
        break;
    }

    if (this.imgCard) this.element.style.backgroundImage = backgroundImage;
    this.element.innerText = innerText;
  }
}

export default CardModel;