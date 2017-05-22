$(init)

var grid;

var testArray = [
	[' ','#',' ',' '],
	[' ','#','#',' '],
	[' ','#',' ',' '],
	[' ','#',' ',' ']
];

var currentBlock;

function init() {
	console.log('here');
	var mainBoard = generateBoard();
	console.log(mainBoard)
	var HTMLBoard = setUpHTMLBoard();
	grid = HTMLBoard;
	currentBlock = generateBlock();
	setInterval ( function() {
		tick(mainBoard, HTMLBoard);
	}, 1000);
	// tick(mainBoard, HTMLBoard);
}

function tick(mainBoard, HTMLBoard) {
	var drawing = true;
	clearBoard(mainBoard);	
	if (checkBlock(currentBlock, mainBoard)) {
		currentBlock.y += 1;
	} else {
		placeBlock(currentBlock, mainBoard);
		currentBlock = generateBlock();
	}
	if (drawing) {
		drawBlock(currentBlock, mainBoard);
	}
	showBoard(mainBoard, HTMLBoard);

}

function generateBlock () {
	return {
		x : 0,
		y : 13,
		array : testArray
	};
}

function placeBlock(block, board) {
	var array = block.array;
	var x = block.x;
	var y = block.y;
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === '#') {
				board[y+i][x + j] = 'X';
			}
		}
	}
}

function checkBlock(currentBlock, board) {
	currentBlock.y += 1;
	var array = currentBlock.array;
	if (currentBlock.y + array.length > board.length) {
		currentBlock.y -=1;
		return false;
	}
	// for (var i = 0; i < array.length; i++) {
	// 	for (var j = 0; j < array[i].length; j++) {
	// 		// // console.log(x + ', ' + y)
	// 		// board[x+i][y+j] = array[i][j];
	// 		// board[x][y] = 'X';
	// 	}
	// }
	currentBlock.y -= 1;
	return true;
}

function drawBlock(block, board) {
	overlayArray(block["array"], board, block.x, block.y);
}

function generateBoard() {
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

function clearBoard(board) {
	// board.forEach(function (row) {
	// 	row.forEach(function(square) {
	// 		console.log(square);
	// 		square = '';
	// 	});
	// });

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			// console.log(board[i][j]);
			if (board[i][j] !== 'X') {
				board[i][j] = ' ';
			}
		}
	}
}

function overlayArray(array, board, x, y) {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			// console.log(x + ', ' + y + ', ' + i + ', ' + j)
			if (array[i][j] === '#') {
				board[y+i][x + j] = array[i][j];
			}
			// board[y][x] = 'X';
		}
	}
}

function showBoard(board, HTMLBoard) {
	HTMLBoard.children().toArray().forEach(function (row, rowIndex) {
		// console.log(row);
		$(row).children().toArray().forEach (function (square, squareIndex) {
			$(square).html(board[rowIndex][squareIndex]);
		});
	});
}