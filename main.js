$(initOOP)
var game;
function initOOP() {
	var height = 20;
	game = new Game(new Board(10, height + 5), new Display(10, height, '#main-game'));
	
	$(document).keypress(function(event) {
		onKeyPress(event, game);
		game.draw();
	});

	var window = setUpNextWindow();
	window.watch(game);
	game.start();
	game.onStop = setUpNewGame;
}

function setUpNewGame() {
	if (prompt('Play Again?') === 'y') {
		$('#main-game').html('')
		var height = 20;
		game = new Game(new Board(10, height + 5), new Display(10, height, '#main-game'));
		var window = setUpNextWindow();
		window.watch(game);
		game.start();
		game.onStop = setUpNewGame;
	}
}

function setUpNextWindow () {
	var display = new Display(5, 5, '#next-window');
	var board = new Board(5, 10);
	display.drawToScreen(board);
	return new Window(board, display);
}

function onKeyPress(event, game) {
	switch(event.which) {
		case 113: 
			game.stop();
			break;
		case 108:
			game.currentBlock.moveRight(game.mainBoard);
			break;
		case 106: 
			game.currentBlock.moveLeft(game.mainBoard);
			break;
		case 111:
			game.currentBlock.rotateClockwise(game.mainBoard);
			break;
		case 117:
			game.currentBlock.rotateAntiClockwise(game.mainBoard);
			break;
		case 32:
			game.toggleSpeed();
			break;
		case 107:
			game.currentBlock.reflect(game.mainBoard);
			break;
		default: 
			console.log(event.which);
	}
}