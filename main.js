$(init)

var grid;

var testArray = [
	['','#'],
	['','#'],
	['#',' '],
	['#',' ']
];

var currentBlock;

function init() {

	var mainBoard = generateBoard();
	console.log(mainBoard)
	var HTMLBoard = setUpHTMLBoard();
	grid = HTMLBoard;
	currentBlock = generateBlock();
	var running = setInterval ( function() {
		tick(mainBoard, HTMLBoard);
	}, 1000);
	$(document).keypress(function(event) {
		if (event.which === 113) {
			clearInterval(running);
			console.log('stopped');
		}
	});
	// tick(mainBoard, HTMLBoard);
}

function tick(mainBoard, HTMLBoard) {
	//every tick, the block falls by one
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
	//create a new block when old one hits the ground
	return {
		x : 0,
		y : 2,
		array : testArray
	};
}

function placeBlock(block, board) {
	// places the block on the ground
	// this is needed so this block stays where it is permanently, won't be refreshed each tick
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
	// checks if there is space below the block for it to fall once
	currentBlock.y += 1;

	// check block against boundaries of game window
	var array = currentBlock.array;
	if (currentBlock.y + array.length > board.length) {
		currentBlock.y -=1;
		return false;
	}

	//check block against previous blocks
	var x = currentBlock.x;
	var y = currentBlock.y;
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === '#' && board[y + i][x + j] === 'X') {
				console.log('here');
				currentBlock.y -= 1;
				return false;
			}
			// // console.log(x + ', ' + y)
			// board[x+i][y+j] = array[i][j];
			// board[x][y] = 'X';
		}
	}
	currentBlock.y -= 1;
	return true;
}

function drawBlock(block, board) {
	// draws current falling block onto board
	overlayArray(block["array"], board, block.x, block.y);
}

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

function clearBoard(board) {
	// clears the board of all temporary pieces each tick

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
	// translates the block array onto the board. 

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
	// takes the mainBoard and updates the html elements so we can see what's happening.

	HTMLBoard.children().toArray().forEach(function (row, rowIndex) {
		// console.log(row);
		$(row).children().toArray().forEach (function (square, squareIndex) {
			$(square).html(board[rowIndex][squareIndex]);
		});
	});
}