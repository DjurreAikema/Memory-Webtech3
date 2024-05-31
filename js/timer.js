let timer;
let seconds = 0;

export const startTimer = () => {
  document.getElementById('currentPlayTime').textContent = `${seconds} s`;

  timer = setInterval(() => {
    seconds++;
    document.getElementById('currentPlayTime').textContent = `${seconds} s`;
  }, 1000);
}

const stopTimer = () => {
  clearInterval(timer);
}