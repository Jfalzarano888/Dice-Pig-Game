/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice, currentOne, currentTwo, playerOnePanel, playerTwoPanel, player1Score, player2Score, gamePlaying, gamePointLimit, lastDice;

globalScores = [0, 0];
roundScore = 0;
activePlayer = 0;
currentOne = document.getElementById('current-0');
currentTwo = document.getElementById('current-1');
player1Score = document.getElementById('score-0');
player2Score = document.getElementById('score-1');
playerOnePanel = document.querySelector('.player-0-panel');
playerTwoPanel = document.querySelector('.player-1-panel');
gamePlaying = true; //  this is our game state variable. This lets the code know when to allow when to execute certain functions.
gamePointLimit = 20;



 // make sure that Math.floor and Math.random is capitlized! otherwise it will not work. Also Math.floor rounds down to the nearest interger. So if we just multiplied it by JUST 6 there would be a chance we would get the number 0 (and there isnt a number zero for dice.) So, we add the number 1 to ensure we NEVER get zero. This also helps because the Math.random will only do numbers BETWEEN 6 and 0 (cuz without the specification it always does numbers between 0 and 1). So there would be the potential to never get 6 either (5.95 would always get rounded down to 5!) So the plus 1 really helps.

function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternery operator.
  roundScore = 0;
  currentOne.textContent = '0';
  currentTwo.textContent = '0';
  playerOnePanel.classList.toggle('active');
  playerTwoPanel.classList.toggle('active');
}

function diceDisplayDelay () {
  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}

function init (){
  roundScore = 0;
  globalScores = [0, 0];
  activePlayer = 0;
  currentOne.textContent = '0';
  currentTwo.textContent = '0';
  player1Score.textContent = '0';
  player2Score.textContent = '0';
  playerOnePanel.classList.add('active');
  playerTwoPanel.classList.remove('active');
  gamePlaying = true;
}

document.getElementById('add-value').addEventListener('click', function(){
  if(gamePlaying) {
     gamePointLimit = document.querySelector('.point-form').value;
  }
});


document.querySelector('.btn-roll').addEventListener('click', function (){
  if(gamePlaying) {
    //1. random numbers for each die
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. display the results of each die
    let diceDom1 = document.querySelector('.dice-1');
    diceDom1.style.display = 'block';
    diceDom1.src = 'dice-' + dice1 + ".png";
    let diceDom2 = document.querySelector('.dice-2');
    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + dice2 + ".png";
    // add score of each die
    roundScore += dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // 3. Some rules for certain dice rolls.
      if (dice1 === 1 || dice2 === 1) {
        setTimeout(nextPlayer, 750);
        setTimeout(diceDisplayDelay, 750);
      } else if (dice1 + dice2 === 10) {
        setTimeout(nextPlayer, 1000);
        setTimeout(diceDisplayDelay, 1000);
      } else if (dice === 6 && lastDice === 6) {
        globalScores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = globalScores[activePlayer];
        // this checks if the first dice roll and the second dice roll were six to go to next player.
        setTimeout(nextPlayer, 1000);
        setTimeout(diceDisplayDelay, 1000);
      }

      lastDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){
      // add current score
      globalScores[activePlayer] += roundScore;
      // update the UI
      document.getElementById('score-' + activePlayer).textContent = globalScores[activePlayer];
      //check if player won game.
      if (globalScores[activePlayer] >= gamePointLimit) {
        alert("Player " + (activePlayer + 1) + ' wins the game!');
        gamePlaying = false;
      } else {
        nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);




/*
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +  '</em>' with this method --- innerHTML -- we want it to parse the HTML and use it. IF we used textContent, it would just output the actual written HTML tags.
*/
