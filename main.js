$(initOOP)
var game;
function initOOP() {
	// var height = 20;
	// game = new Game(new Board(10, height + 5), new Display(10, height, '#main-game'));
	
	$(document).keypress(function(event) {
		onKeyPress(event, game);
		game.draw();
	});

	$('#reset-button').click(function() {
		if (game) {
			console.log('stopping game')
			game.stop();
			setUpNewGame();

		}
	});

	// var window = setUpNextWindow();
	// window.watch(game);
	// game.start();
	// game.onStop = setUpNewGame;
	setUpNewGame();
}

function showDeathScreen() {
	$('#death-screen').css('display', 'inline');
}

function setUpNewGame() {
	$('#death-screen').css('display', 'none');
	var score = parseInt($('#score').html());
	$('#score').html(0);
	//if (prompt('Play Again?') === 'y') {
		$('#main-game').html('')
		var height = 20;
		width = 10;
		game = new Game(new Board(width, height + 5), new Display(width, height, '#main-game'));
		var window = setUpNextWindow();
		window.watch(game);
		game.start();
		game.onStop = showDeathScreen;
	//}
	if (parseInt($('#highscore').html()) < score) {
		$(highscore).html(score);
	}
}

function setUpNextWindow () {
	var display = new Display(5, 6, '#next-window');
	var board = new Board(5, 11);
	display.drawToScreen(board);
	return new Window(board, display);
}

function onKeyPress(event, game) {
	switch(event.which) {
		case 113: 
			game.stop();
			setUpNewGame();
			break;
		case 119:
			game.togglePause();
			break;
		case 108:
			if (game.currentFrame) {
				game.currentBlock.moveRight(game.mainBoard);
			}
			break;
		case 106: 
			if (game.currentFrame) {
				game.currentBlock.moveLeft(game.mainBoard);
			}
			break;
		case 111:
			if (game.currentFrame) {
				game.currentBlock.rotateClockwise(game.mainBoard);
			}
			break;
		case 117:	
			if (game.currentFrame) {
				game.currentBlock.rotateAntiClockwise(game.mainBoard);
			}
			break;
		case 32:
			event.preventDefault();
			game.toggleSpeed();
			break;
		case 107:
			if (game.currentFrame) {
				game.currentBlock.reflect(game.mainBoard);
			}	
			break;
		case 101:
			game.display.wobble(game.mainBoard);
			break;
		default: 
			console.log(event.which);
	}
}