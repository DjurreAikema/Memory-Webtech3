class CardModel {
  constructor(x, y, content, state, element) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.state = state;
    this.element = element;
  }

  changeState(newState) {
    this.state = newState;
    this.updateUI();
  }

  updateUI() {
    const img = this.element.querySelector('img');

    if (this.state === 'open') {
      this.element.classList.add('card-open');
      this.element.classList.remove('card-closed');

      if (img) img.style.display = 'block';
      else this.element.innerText = this.content;
    } else if (this.state === 'closed') {
      this.element.classList.add('card-closed');
      this.element.classList.remove('card-open');

      if (img) img.style.display = 'none';
    } else if (this.state === 'found') {
      this.element.classList.add('card-found');
      this.element.classList.remove('card-open');
      this.element.classList.remove('card-closed');

      if (img) img.style.display = 'block';
    }
  }
}

export default CardModel;