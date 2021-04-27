// cards.js
// ========

/* ================== Constants ================== */
var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function cardNumberEvaluation(cardNumber1, cardNumber2) {
	/* 
		This function checks to see if cardNumber1 is greater in value than cardNumber2.
		If it is, the function returns true. If it isn't, the function returns false.

		The inputs are strings that can be any of these values:
		"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
	*/
	var i;
	var evaluater = {
		"2": ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
		"3": ["4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
		"4": ["5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
		"5": ["6", "7", "8", "9", "10", "J", "Q", "K", "A"],
		"6": ["7", "8", "9", "10", "J", "Q", "K", "A"],
		"7": ["8", "9", "10", "J", "Q", "K", "A"],
		"8": ["9", "10", "J", "Q", "K", "A"],
		"9": ["10", "J", "Q", "K", "A"],
		"10": ["J", "Q", "K", "A"],
		"J": ["Q", "K", "A"],
		"Q": ["K", "A"],
		"K": ["A"],
		"A": []
	};

	var losingCards = evaluater[cardNumber1];

	for (i = 0; i < losingCards.length; i++) {
		if (cardNumber2 === losingCards[i]) {
			return false;
		}
	}

	return true;

}

module.exports = {
  getDeck: function () {
    var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {value: values[x], suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
  },
  shuffleDeck: function (deck) {
    /*
		This function shuffles a deck. The deck object looks like the following:
		var deck = [{value: 'A', suit: 'spades'}, {value: 'A', suit: 'diamonds'}, {value: 'A', suit: 'clubs'}...]
	*/
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
  },
  dealHand: function(deck, numberOfPlayers, numberOfCardsPerHand) {
	/*
		This function deals a specified number of cards to a specified number of players.
	*/
	var i, j;
	var playerHands = [];

	// Making sure there are enough cards in the deck
	if ( (numberOfPlayers * numberOfCardsPerHand) >= deck.length ) {
		return false;
	}

	// Initializing player hands
	for (i = 0; i < numberOfPlayers; i++) {
		playerHands.push([]);
	}

	// Dealing cards
	for (i = 0; i < numberOfCardsPerHand; i++) {
		for (j = 0; j < numberOfPlayers; j++) {
			// Dealing card that is on top
			playerHands[j].push(deck[0]);
			// Removing that card from the deck
			deck.splice(0, 1);
		}
	}

	return [deck, playerHands];

  },
  evaluateBicycleHand: function(trumpSuit, listOfCards) {
	/*
		trumpSuit is one of the following:
			"hearts"
			"diamonds"
			"clubs"
			"spades"

		listOfCards will look like this
		[
			{
				order: 1,
				suit: "spades",
				value: "4"
			},
			{
				order: 2,
				suit: "hearts",
				value: "6"
			},
			...
		]
	*/
	var i;
	var winningCard = null;

	var trumpCards = [];

	for (i = 0; i < listOfCards.length; i++) {
		if (listOfCards[i]['suit'] === trumpSuit) {
			trumpCards.push(listOfCards[i]);
		}
	}

	if (trumpCards.length > 0) {
		// There is 1 or more trump cards that were played
		for (i = 0; i < trumpCards.length; i++) {
			if (winningCard != null) {
				// Check if current card beats winning card
				if (cardNumberEvaluation(trumpCards[i]['value'], winningCard)) {
					winningCard = trumpCards[i];
				}
			} else {
				winningCard = trumpCards[i];
			}
		}

	} else {
		// No trump cards were played, the suit that has precedence is the first suit played
		console.log("No trump");

		var precedenceSuit = null;
		var precedenceCards = [];

		for (i = 0; i < listOfCards.length; i++) {
			if (listOfCards[i]['order'] === 1) {
				precedenceSuit = listOfCards[i]['suit'];
			}
		}

		for (i = 0; i < listOfCards.length; i++) {
			if (listOfCards[i]['suit'] === precedenceSuit) {
				precedenceCards.push(listOfCards[i]);
			}
		}

		for (i = 0; i < precedenceCards.length; i++) {
			if (winningCard != null) {
				// Check if current card beats winning card
				if (cardNumberEvaluation(precedenceCards[i]['value'], winningCard)) {
					winningCard = precedenceCards[i];
				}
			} else {
				winningCard = precedenceCards[i];
			}
		}

	}

	return winningCard;
  }
};
