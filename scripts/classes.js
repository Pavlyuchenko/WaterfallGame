class Card {
	constructor(value, suit, title, rule) {
		this.value = value;
		this.suit = suit;
		this.image = value + "_" + suit + ".svg";
		this.title = title;
		this.rule = rule;
	}
}

class Deck {
	constructor() {
		this.deck = [];
		this.DOMDeck = [];

		this.element = document.getElementById("deck");

		// How many cards are loaded in the DOM, don't make this too high
		this.loadedCards = 5;
		this.lastLoadedCard = this.loadedCards;

		// Which card is on the top
		this.currentCard = 0;
	}

	getCurrentCard() {
		return this.currentCard;
	}

	getLastCard() {
		return this.deck[this.currentCard + this.lastLoadedCard];
	}

	createHTMLCard(index) {
		/*
			The structure of each card looks like this:
				<div class='container' id='container#'>
					<img class='card front' id='card#' src='assets/cardBack.png' />
				</div>

			For performace concerns, only the back of the card is loaded.
			The front is loaded when setting up new card, which is right before this card (in function setupNewTopCard).
			Ex.: Right now, we see a card. Once the user clicks it, the next card is shown with animation, and the front of the next next card is inserted into the DOM.
			Now the structure is like this:
				<div class='container' id='container#'>
					<img class='card front' id='card#' src='assets/cardBack.png' />
					<img class='card back' id='cardFront#' src='assets/---.svg' />
				</div>

			Explanation of some things:
				z-index:
					The card, which is on index 0 in this.deck has z-index set to this.deck.length and so on.

				transform:
					Transform is the most important thing, and the messiest, too.
					rotateZ is used for the 'tilt', so that the deck looks what it looks like (each card has a different rotation).
					translateX and translateY are used for absolute positioning the center the cards.
					plus translateX is used to slide the card right, when used clicks it. DON'T USE 'left' FOR THIS, YOU WILL RUN INTO PERFORMANCE ISSUES!
					rotateY is used by the 'flip' animation.
					What's so messy about this is that you need to specify all these values anytime you want to change them, so it's not really my bad :(.
		*/
		let container = document.createElement("div");
		container.classList.add("container");
		container.id = "container" + index;

		let card = document.createElement("img");
		card.id = "card" + index;
		card.className = "card back";
		card.src = "assets/CardBack.png";
		card.alt = this.deck[index].title;
		card.style =
			"transform: rotateZ(" +
			Math.floor(Math.random() * 11) *
				(Math.round(Math.random()) ? 1 : -1) +
			"deg) translateX(-50%) translateY(-50%) rotateY(0deg); z-index: " +
			(this.deck.length - index) +
			"";

		container.appendChild(card);

		return container;
	}

	createHTMLCards() {
		/*
			For each of the card in this.deck, renders a card in the DOM.
			I don't exactly understand, what does DocumentFragment do differently, but it improves performace by a lot,
			because it somehow does not load the cards to DOM one by one, but at once or something.
		*/

		let cards = [];
		const fragment = new DocumentFragment();
		for (
			let i = Math.min(this.lastLoadedCard, this.deck.length - 1);
			i >= 0;
			i--
		) {
			let card = this.createHTMLCard(i);
			cards.push(card);
			fragment.appendChild(card);
		}
		this.element.appendChild(fragment);
		return cards;
	}

	addCard(card) {
		this.deck.push(card);
	}

	nextCard() {
		/*
			Keeps track of which card is at the top,
			and loads the next card into the DOM.

			If the counter is at the end of the deck,
			creates new deck.
		*/
		if (this.currentCard < this.deck.length) {
			this.currentCard += 1;
			this.lastLoadedCard += 1;
			if (this.lastLoadedCard < this.deck.length) {
				this.loadNewLastCard();
			}
		}

		if (this.currentCard === this.deck.length) {
			document.getElementById("restart").style.display = "block";
			//document.getElementById("next").style.display = "none";

			/*instantiateDeck();

			setupFirstCard();*/
		}
	}

	loadNewLastCard() {
		/*
			Loads the next card into the DOM.
		*/

		let newCard = this.createHTMLCard(this.lastLoadedCard);
		const fragment = new DocumentFragment();
		fragment.appendChild(newCard);

		this.element.appendChild(fragment);
	}

	shuffle() {
		/*
			Shuffles the entire deck.
		*/

		let currentIndex = this.deck.length,
			randomIndex;

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.deck[currentIndex], this.deck[randomIndex]] = [
				this.deck[randomIndex],
				this.deck[currentIndex],
			];
		}

		this.DOMDeck = this.createHTMLCards(document.getElementById("deck"));
	}
}
