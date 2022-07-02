var cardTypes = [
	{
		value: "A",
		title: "Waterfall",
		rule: "Once an ace is drawn, everyone starts to drink. The player who picked the card can stop whenever he/she wants, but others have to keep drinking. Once he/she decides to stop, the player on his/her right can stop and so on. The last player in the ring has to finish last.",
	},
	{
		value: "2",
		title: "Give 2",
		rule: "The player can make another player take two sips.",
	},
	{
		value: "3",
		title: "Drink 3",
		rule: "The player who picks this card has to drink 3 sips.",
	},
	{
		value: "4",
		title: "Girls drink",
		rule: "All the girls in the game have to drink!",
	},
	{
		value: "5",
		title: "Bust a jive",
		rule: "The person who picks the card has to come up with a dance move. The next person has to do that dance move and add to it. This continues until someone makes a mistake and has to drink.",
	},
	{
		value: "6",
		title: "Guys drink",
		rule: "All the guys in the game have to drink!",
	},
	{
		value: "7",
		title: "Heaven",
		rule: "All players reach for the sky. The last person to do so has to drink.",
	},
	{
		value: "8",
		title: "Mate",
		rule: "The player who picks the card chooses another player to be their mate. This means when one of them drinks they both drink.",
	},
	{
		value: "9",
		title: "Bust a Rhyme",
		rule: "The player who picks this card says a word and all the players after him/her has to say a word that rhymes with this word. First one to not come up with a word has to drink.",
	},
	{
		value: "10",
		title: "Categories",
		rule: "The player who picked the card chooses a category. Then everyone goes around and says something that fits in the chosen category. Whoever cannot think of anything in the category has to drink. Good categories to use include types of liquor, car companies, and types of cereal.",
	},
	{
		value: "J",
		title: "Thumb",
		rule: "Drawing a Jack makes you the Thumb Master. Whenever you choose you can put your thumb on the table causing all players to race to do the same. Last player to do so has to drink. You remain Thumb Master until a new Jack is drawn.",
	},
	{
		value: "Q",
		title: "Question",
		rule: "Ask a question from any other player, who must in turn ask a different player a question. Whoever doesn’t answer with a question has to drink, and you can’t ask a question back to the person who last asked you.",
	},
	{
		value: "K",
		title: "New rule",
		rule: "The player who picks a King gets to create a new rule for the game. If the rule is not followed the person who broke the rule has to drink. A good rule is to for example only be allowed to hold the drink in your left hand.",
	},
];
var suits = ["spades", "hearts", "diamonds", "clubs"];

// Used can discard some of the cards.
var discard = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
];
var deck, DOMDeck, wait;

window.addEventListener("load", () => {
	instantiateDeck();
	setupFirstCard();

	document.getElementById("start-button").style.display = "block";
	document.getElementById("title").style.display = "block";
	document.getElementById("rules-button").style.display = "block";

	preload(deck.deck);
});

function instantiateDeck() {
	deck = createCards();
	deck.shuffle();
}

function setupFirstCard() {
	document.getElementById("container0").addEventListener("click", () => {
		if (!wait) {
			showNextCard();
			wait = true;
			setTimeout(() => {
				wait = false;
			}, 500);
		}
	});
	createCardTop(0);

	createCardTop(1);
}

function turnFirstCard() {
	flipCard(0);
}

function createCards() {
	/* 
		Creates all combinations of suits and values.
	*/

	let deckOfCards = new Deck();
	for (const suit of suits) {
		for (let i = 0; i < cardTypes.length; i++) {
			if (discard[i]) continue;
			deckOfCards.addCard(
				new Card(
					cardTypes[i].value,
					suit,
					cardTypes[i].title,
					cardTypes[i].rule
				)
			);
		}
	}
	return deckOfCards;
}

function createCardTop(index) {
	/*
		Creates the front side of the card. 
		Everything is explained in classes.js, class Deck, createHTMLCard()
	*/

	let nextContainer = document.getElementById("container" + index);

	let card = document.createElement("img");
	card.id = "cardFront" + index;
	card.className = "card front";
	card.src = "assets/" + deck.deck[index].image;
	card.style =
		"transform: rotateZ(" +
		Math.floor(Math.random() * 11) * (Math.round(Math.random()) ? 1 : -1) +
		"deg) translateX(-50%) translateY(-50%) rotateY(180deg); z-index: " +
		(deck.length - index) +
		";";

	nextContainer.appendChild(card);
}

var images = [];
function preload() {
	let img = new Image();
	img.src = "/assets/CardBack.png";
	images.push(img);
	for (const crd of deck.deck) {
		let img = new Image();
		img.src = "/assets/" + crd.image;
		images.push(img);
	}
}
