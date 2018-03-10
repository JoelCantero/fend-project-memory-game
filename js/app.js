/*
 * Create a list that holds all of your cards
 */
let selectedCard = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCard() {
 	this.add('show', 'open');
 }

// Shuffle function from http://stackoverflow.com/a/2450976
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


let deck = document.querySelector('.deck');
deck.addEventListener ('click', function cardClick(event) {
	if (event.target.nodeName === 'LI') {
	if (selectedCard.length == 0) {
		selectedCard.push(event.target);
		selectedCard[0].classList.toggle('show');
		selectedCard[0].classList.toggle('open');
		console.log(selectedCard[0].firstElementChild.className);
		
	}
	else {
		selectedCard.push(event.target);
		selectedCard[1].displayCard();
		selectedCard[1].displayCard();
		if (selectedCard[0].firstElementChild.className == selectedCard[1].firstElementChild.className) {
		selectedCard[0].classList.add('match');
		selectedCard[1].classList.add('match');
		selectedCard = [];
		}
		else {
		selectedCard[0].classList.toggle('show');
		selectedCard[0].classList.toggle('open');
		selectedCard[1].classList.toggle('show');
		selectedCard[1].classList.toggle('open');

		}
	}
	}	
	console.log('Card clicked');
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
