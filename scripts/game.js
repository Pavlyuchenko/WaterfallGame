function hideCurrentCard() {
	function slideCardRight(index) {
		function calculateScreenEnd() {
			var browserWidth =
				window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth;

			return browserWidth / 2 + 50 + "px";
		}

		let rightSideOfScreen = calculateScreenEnd();

		let cardBack = document.getElementById("card" + index);

		cardBack.style.transform =
			"translateX(" + rightSideOfScreen + ") translateY(-50%)";

		let cardFront = document.getElementById("cardFront" + index);

		cardFront.style.transform =
			"translateX(" + rightSideOfScreen + ") translateY(-50%)";
	}
	function removeCardFromDOM(index) {
		let card = document.getElementById("card" + index);
		let container = document.getElementById("container" + index);

		card.removeEventListener("click", showNextCard);
		setTimeout(() => {
			container.remove();
		}, 500);
	}

	let currCardIndex = deck.getCurrentCard();

	slideCardRight(currCardIndex);

	removeCardFromDOM(currCardIndex);
}

function flipCard(index) {
	let back = document.getElementById("card" + index);
	let front = document.getElementById("cardFront" + index);

	back.style =
		"transform: translateX(-50%) translateY(-50%) rotateY(-180deg); z-index: 51; transform-origin: center 0px;";
	front.style =
		"transform: translateX(-50%) translateY(-50%) rotateY(0deg); z-index: 51; transform-origin: center 0px;";
}
function setupNewTopCard() {
	function setupEventListener(index) {
		let container = document.getElementById("container" + index);

		setTimeout(() => {
			// Wait a bit to avoid some nasty bugs.
			container.addEventListener("click", showNextCard);
		}, 500);
	}
	function setupAnimationOfNextCard(currCard) {
		if (currCard + 1 >= deck.deck.length) return;

		createCardTop(currCard + 1);
	}

	deck.nextCard();
	let currCardIndex = deck.getCurrentCard();

	if (currCardIndex >= deck.deck.length) return;

	setTimeout(() => {
		flipCard(currCardIndex);
	}, 110);

	setupEventListener(currCardIndex);

	setupAnimationOfNextCard(currCardIndex);
}

function showNextCard() {
	// Is invoked using addEventListener on the current top card.

	hideCurrentCard();

	setupNewTopCard();
}
