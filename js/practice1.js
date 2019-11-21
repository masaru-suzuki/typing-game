'use strict';
{

  const words = ['red','blue','gray','gold','silver'];
  //words[Math.floor(Math.random()) * words.length];これだと、ランダムにならない。なぜ？
  let word = words[Math.floor(Math.random() * words.length)];

  let loc;
  const target = document.getElementById('target');
  const scoreLavel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  let miss;
  let score;
  
  const timelimit = 3*1000;
  let startTime;

  let isPlaying = false;

  function countDown() {
    
    const leftTime = startTime + timelimit - Date.now();
    timerLabel.textContent = (leftTime / 1000).toFixed(2);
    const timerId = setTimeout(() => {
      countDown();
    }, 10);

    if (leftTime < 0) {
      isPlaying = false;
      clearTimeout(timerId);
      timerLabel.textContent = '0.00';
      setTimeout(() => {

        let accuracy;
        if (score + miss === 0){
          accuracy = 0
        }else{
          accuracy = score / (score + miss) * 100;
        }
        alert(`${score}letters,${miss}miss,${accuracy.toFixed(0)}%accuracy`)
      }, 100);
      target.textContent = 'click to replay'
    }
  }

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++){
      placeholder += '_';

    }

    target.textContent = placeholder + word.substring(loc);
  }
/*-----------------click--------------------*/
  window.addEventListener('click', () => {
    if(isPlaying === true){
      return;
    }
    score = 0;
    miss = 0;
    loc = 0;
    isPlaying = true;
    target.textContent = word;
    //countDown
    startTime = Date.now();
    countDown();
  });
/*------------keydown-----------------------*/
  window.addEventListener('keydown', e => {
    if(isPlaying === false){
      return;
    }
    console.log(e.key);
    if(e.key === word[loc]){
      loc++
      if(loc === word.length){

        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLavel.textContent = score;
    }else{
      miss++;
      missLabel.textContent = miss;
    }
  });
}