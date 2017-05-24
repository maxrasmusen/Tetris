$(initOOP)

function initOOP() {
	var height = 20;
	var game = new Game(new Board(10, height + 5), new Display(10, height));
	game.start();
	
	$(document).keypress(function(event) {
		onKeyPress(event, game);
		game.draw();
	});
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