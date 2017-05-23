function generateBoard() {
	//creates inital board. this is the board the logic is done on. a 2d array
	var mainBoard = [];
		for (var i=0; i < 20; i++) {
			mainBoard[i] = [];
			for (var j=0; j<10; j++) {
				mainBoard[i][j] = '';
			}
		}
	return mainBoard;
}

function setUpHTMLBoard() {
	//creates inital HTML board. This is a bunch of html elements that are updated using the mainbBoard
	var board = $('#main');
	for (var i = 0; i < 20; i++) {
		var row = $('<ul>').attr('id', 'row-' + i);
		board.append(row);
		for (var j = 0; j < 10; j++) {
			row.append($('<li>'));
		}
	}
	return board;
}

function init() {

	var mainBoard = generateBoard();
	var HTMLBoard = setUpHTMLBoard();
	currentBlock = generateBlock();

	//first frame
	running = tick(mainBoard, HTMLBoard);

	$(document).keypress(function(event) {
		handleKeypress(event, running, currentBlock, mainBoard);
		clearBoard(mainBoard);
		drawBlock(currentBlock, mainBoard);
		showBoard(mainBoard, HTMLBoard);
	});
}