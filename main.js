$(init)

var grid;

function init() {
	console.log('here');
	var mainBoard = generateBoard();
	console.log(mainBoard)
	var HTMLBoard = setUpHTMLBoard();
	grid = HTMLBoard;
	showBoard(mainBoard, HTMLBoard)
	mainBoard[3][5] = '0';
	showBoard(mainBoard, HTMLBoard);
}

function generateBoard() {
	var mainBoard = [];
		for (var i=0; i < 20; i++) {
			mainBoard[i] = [];
			for (var j=0; j<10; j++) {
				mainBoard[i][j] = 'x';
			}
		}
	return mainBoard;
}

function setUpHTMLBoard() {
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

function showBoard(board, HTMLBoard) {
	HTMLBoard.children().toArray().forEach(function (row, rowIndex) {
		console.log(row);
		$(row).children().toArray().forEach (function (square, squareIndex) {
			$(square).html(board[rowIndex][squareIndex]);
		});
	});
}