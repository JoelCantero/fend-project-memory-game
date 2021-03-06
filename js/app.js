
/* Variables */

let symbols = "fa-css3 fa-wifi fa-html5 fa-git fa-chrome fa-tablet fa-laptop fa-google".split(" "); // Make an array without having to type , and ' ' after every entry
symbols = symbols.map((word) => `fa ${word}`); // makes `fa-diamond` into `fa fa-diamond`
symbols = [...symbols, ...symbols]; // Doubles the array elements

let counterMatchCards = 0;

let openCards = [];

let timeIncrementor;

/* Selectors */

let cards = document.querySelectorAll('.card');

let deck = document.querySelector('.deck');

let modal = document.getElementById('myModal');

let moves = document.querySelector('.moves span');

let restartButton = document.querySelector('.restart');

let stars = document.querySelector('.stars');

let starArray = document.querySelectorAll('.fa-star');

let timer = document.querySelector('.timer span');

let resultMoves = document.querySelector('.resultMoves');

let resultStars = document.querySelector('.resultStars');

let resultTime = document.querySelector('.resultTime');

let startGame = document.querySelector('.start-game');

/* Functions */

/**
* @description Display a card. Adds show and open classes.
* @param {card} the card to display.
*/
function displayCard(card) {
	openCards.push(card);
 	card.classList.add('show', 'open');

 }

/**
* @description Displays a modal box with game results: time, star rating and moves.
*/
function gameWin() {
	clearInterval(timeIncrementor);
	resultTime.textContent = timer.textContent + ' seconds';
	resultStars.innerHTML = stars.innerHTML;
	resultMoves.textContent = moves.textContent;
 	modal.style.display = "block";

}

/**
* @description Hides a card. Removes show, open, wrong and match classes and adds hide class.
* @param {card} the card to hide.
*/
function hideCard(card) {
 	card.classList.remove('show', 'open', 'wrong', 'match');
 	card.classList.add('hide');

}

/**
* @description Hides a card array. Removes show, open, wrong and match classes and adds hide class to each card.
* @param {array} card array to hide.
*/
function hideAllCards(cards) {
	for (let card of cards) {
		hideCard(card);
	}

}

/**
* @description Increments 1 to move counter.
*/
function incrementMoves() {
 	++moves.textContent;
 	if (moves.textContent > 15) {
 		starArray[2].className = 'fa fa-star-o';
 		if (moves.textContent > 20) {
 			starArray[1].className = 'fa fa-star-o';
 		}
 	}

}

/**
* @description Adds match class to card1 and card2 and increments 2 to match cards counter.
* @param {card} card1
* @param {card} card2
*/
function matchCards(card1, card2) {
	card1.classList.add('match');
	card2.classList.add('match');
	counterMatchCards += 2;

}
/**
* @description Prepares desk to a new game. Resets all counters, shuffles card symbols, and hides all of them.
*/
function newGame() {
	clearInterval(timeIncrementor);
	openCards = [];
	firstMovement = true;
	counterMatchCards = 0;
	moves.textContent = 0;
	timer.textContent = 0;
	resetStars();
	hideAllCards(cards);
	/* Creates an document fragment to avoid 16 reflow and repaint */
	let virtualDOM = document.createDocumentFragment();
	virtualDOM = cards;
	/* Shuffle card's SYMBOLS with shuffle function */
	shuffle(symbols);
	/* Counter to iterate SYMBOLS array */
	let i = 0;
	for (let card of virtualDOM) {
		card.firstElementChild.className = '';
		card.firstElementChild.className = symbols[i];
		++i;
	}
	/* When we have shuffled all card's SYMBOLS, then we reflow and repaint once with virtualDOM */
	cards = virtualDOM;

}

function resetStars() {
	starArray[1].className = 'fa fa-star';
	starArray[2].className = 'fa fa-star';

}

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {array} array
* @returns {array} the original array with a random index.
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;

}


function updateTime() {
	++timer.textContent;
}

/* Listeners */
deck.addEventListener ('click', function cardClick(event) {
	if (event.target.nodeName === 'LI' && !event.target.classList.contains('match') && event.target != openCards[0]) {
		if (firstMovement) {
			timeIncrementor = setInterval(updateTime, 1000);
			firstMovement = false;
		}
		displayCard(event.target);
		if (openCards.length > 1) {
			incrementMoves();
			if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className && openCards[0] != openCards[1]) {
				matchCards(openCards[0], openCards[1]);
				openCards = [];
				if (counterMatchCards == 16) {
					gameWin();
				}
			}	else {
					openCards[0].classList.add('wrong');
					openCards[1].classList.add('wrong');
					setTimeout(hideAllCards, 1000, openCards);
					openCards = [];

				}
		
		}
	}	
});

restartButton.addEventListener('click', function restartClick(event) {
	newGame();

});

window.onclick = function(event) {
    if (event.target == modal || event.target == startGame) {
        modal.style.display = "none";
        newGame();
    }
}

newGame();

