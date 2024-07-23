const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const resetBtn = document.querySelector('.btn-reset');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes'); 
let ispaused = true;
let myInterval; 
let state = true;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent)

  if(state) {
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');
    
      totalSeconds--;
    
      let minutesLeft = Math.floor(totalSeconds/60);
      let secondsLeft = totalSeconds % 60;
    
      if(secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`
    
      if(minutesLeft === 0 && secondsLeft === 0) {
        bells.play()
        clearInterval(myInterval);
      }
    }
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
}

const reset = () => {
  clearInterval(myInterval);
  state=true;
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  minuteDiv.textContent = "25"
  secondDiv.textContent = "00"

}

const pause = () => {
  if (ispaused===true) {
    clearInterval(myInterval)
    state=true;
    ispaused=false;
  } else if (ispaused===false) {
    ispaused=true;
    
    appTimer()
  }
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);