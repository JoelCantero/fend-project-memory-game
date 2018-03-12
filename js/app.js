/*
 * Create a list that holds all of your cards
 */
let openCards = [];
let deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCard(card) {
 	openCards.push(card);
 	card.classList.add('show', 'open');
 }
 function hideCard(card) {
 	card.classList.remove('show', 'open');
 }
function matchCards(card1, card2) {
	card1.classList.add('match');
	card2.classList.add('match');
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


deck.addEventListener ('click', function cardClick(event) {
	if (event.target.nodeName === 'LI' && !event.target.classList.contains('match')) {
			displayCard(event.target);
			if (openCards.length > 1) {
				if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className && openCards[0] != openCards[1]) {
					matchCards(openCards[0], openCards[1]);
					openCards = [];
				}
				else {
					hideCard(openCards[0]);
					hideCard(openCards[1]);
					openCards = [];
				}
			}
	}	
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
