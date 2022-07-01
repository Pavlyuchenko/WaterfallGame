function startGame() {
	document.getElementById("start-button").style.display = "none";
	document.getElementById("non-clickable-bg").style.display = "none";
	//document.getElementById("next").style.display = "block";

	turnFirstCard();
}

function restart() {
	instantiateDeck();

	setupFirstCard();

	document.getElementById("restart").style.display = "none";
	//document.getElementById("next").style.display = "block";

	setTimeout(() => {
		turnFirstCard();
	}, 100);
}
