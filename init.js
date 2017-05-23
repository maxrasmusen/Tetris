function generateBoard(height) {
	//creates inital board. this is the board the logic is done on. a 2d array
	var mainBoard = [];
		for (var i=0; i < height; i++) {
			mainBoard[i] = [];
			for (var j=0; j<10; j++) {
				mainBoard[i][j] = '';
			}
		}
	return mainBoard;
}

function setUpHTMLBoard(height) {
	//creates inital HTML board. This is a bunch of html elements that are updated using the mainbBoard
	var board = $('#main');
	for (var i = 0; i < height; i++) {
		var row = $('<ul>').attr('id', 'row-' + i);
		board.append(row);
		for (var j = 0; j < 10; j++) {
			row.append($('<li>'));
		}
	}
	return board;
}

function init() {
	var height = 10;
	var mainBoard = generateBoard(height + 5);
	var HTMLBoard = setUpHTMLBoard(height);
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