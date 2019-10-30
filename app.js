/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// define variables
var scores, roundScore, activePlayer, gamePlaying;


// STARTING GAME
// all scores are 0, player 1 is the active player, dice is not displayed,
init();


// WHEN USER CLICKS ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // generate a random number between 1 and 6
        var dice = Math.floor((Math.random() * 6) + 1);

        // show this number on the dice
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        document.querySelector('.dice').style.display = 'block';

        // update ROUND score, if the rolled number is not 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // go to next player
            nextPlayer();
        }
    }
});


// WHEN USER CLICKS HOLD
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // transfer ROUND score to the OVERALL score and update the UI
        scores[activePlayer] += roundScore;
        document.querySelector('#current-' + activePlayer).textContent = '0';
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // clear dice image
        document.querySelector('.dice').style.display = 'none';

        // check if player won game
        if (scores[activePlayer] >= 100) {
            // remove dice image & replace Player name with Winner!
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // remove active player 'red dot' and change Player font to red
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            gamePlaying = false;
        } else {
            // switch to next player
            nextPlayer();
        }
    }
});


// WHEN USER CLICKS NEW GAME
document.querySelector('.btn-new').addEventListener('click', function() {
    // reset game
    init();
});


// REPEATING FUNCTIONS
// starting and resetting game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    // remove winner references from any previous games
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


//next player
function nextPlayer() {
    // reset scores and switch visual focus to active player
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // change the visual focus to the next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
