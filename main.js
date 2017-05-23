$(init)

var testArray = [
	['#','#'],
	['#',''],
	['#',' '],
	['#',' ']
];

// var currentBlock;
var running;
var speed = 1000;
function init() {

	var mainBoard = generateBoard();
	console.log(mainBoard)
	var HTMLBoard = setUpHTMLBoard();
	currentBlock = generateBlock();

	// var running = setInterval ( function() {
	// 	tick(mainBoard, HTMLBoard);
	// }, speed);
	running = tick(mainBoard, HTMLBoard);
	$(document).keypress(function(event) {
		handleKeypress(event, running, currentBlock, mainBoard);
		clearBoard(mainBoard);
		drawBlock(currentBlock, mainBoard);
		showBoard(mainBoard, HTMLBoard);
	});
	// tick(mainBoard, HTMLBoard);
}

function handleKeypress(event, running, currentBlock, mainBoard) {
	switch(event.which) {
		case 113: 
			clearInterval(running);
			console.log('stopped');
			break;
		case 108:
			moveRight(currentBlock, mainBoard);
			break;
		case 106: 
			moveLeft(currentBlock, mainBoard);
			break;
		case 111:
			rotateBlockClockwise(currentBlock, mainBoard);
			break;
		case 117:
			rotateBlockAntiClockwise(currentBlock, mainBoard);
			break;
		case 107:
			toggleSpeed();
			break;
		default: 
			console.log(event.which);
	}
}

function tick(mainBoard, HTMLBoard) {
	//every tick, the block falls by one
	if (checkBlock(currentBlock, mainBoard, function(block) {
		// callback function allows us to pass any movement into checkBlock
		block.y += 1;
		return block;
	})) {
		currentBlock.y += 1;
	} else {
		placeBlock(currentBlock, mainBoard);
		currentBlock = generateBlock();
		speed = 1000;
	}
	checkRowsForClear(mainBoard);
	clearBoard(mainBoard);	
	drawBlock(currentBlock, mainBoard);
	showBoard(mainBoard, HTMLBoard);
	running = setTimeout ( function() {
		tick(mainBoard, HTMLBoard);
	}, speed);
}

function toggleSpeed() {
	if(speed === 1000) {
		speed = 200;
	} else {
		speed = 1000;
	}
}

function checkRowsForClear(board) {
	for (var i=0; i < board.length; i++) {
		var row = board[i];
		if (row.every(function(element) {
			return element === 'X';
		})) {
			clearRow(i, board);
		}
	}
}

function clearRow(index, board) {
	for (var i = index; i > 0; i--) {
		board[i] = board[i-1];
	}
	board[0] = [];
	for (var i=0; i < 10; i++) {
		board[0][i] = '';
	}
	registerScore();
	return board;
}

function registerScore() {
	var score = $('#score');
	score.html(parseInt(score.html())+1);
	return score.html();
}

function rotateBlockClockwise(block, mainBoard) {
	if (checkBlock(block, mainBoard, function(placeHolder) {
		placeHolder.array = rotateArrayClockwise(placeHolder.array);
		return placeHolder;
	})) {
		block.array = rotateArrayClockwise(block.array);
	}
	return block;
}

function rotateBlockAntiClockwise(block, mainBoard) {
	//TODO: FIX THIS SO MUCH
	block = rotateBlockClockwise(block, mainBoard);
	block = rotateBlockClockwise(block, mainBoard);
	block = rotateBlockClockwise(block, mainBoard);
	return block;
}

function rotateArrayClockwise(array) {
	// DO NOT PASS IN 1D ARRAY NO CHECKS YET
	// TODO: SORT OUT THIS WHOLE FUNCTION AT SOME POINT

	// create new array to use
	var newArray = [];
	// console.log(array.length);
	// console.log(array[0].length);
	for (var i = 0; i < array[0].length; i ++) {
		newArray[i] = [];
		for (var j = 0; j < array.length; j++) {
			// console.log(i + ', ' + j)
			newArray[i][j] = 0;
		}
	}
	// console.log(newArray);
	// console.log('---');
	for (var i=0; i < array.length; i++) {
		for (var j=0; j < array[0].length; j++) {
			newArray[j][newArray[0].length-1-i] = array[i][j];
		}
	}

	return newArray;
}

function moveLeft(currentBlock, mainBoard) {
	if (checkBlock (currentBlock, mainBoard, function(block) {
		block.x -= 1;
		return block;
	})) {
		currentBlock.x -= 1;
	}
}

function moveRight(currentBlock, mainBoard) {
	if (checkBlock(currentBlock, mainBoard, function(block) {
		block.x += 1;
		return block;
	})) {
		currentBlock.x += 1;
	}
}

function generateBlock () {
	//create a new block when old one hits the ground
	var newBlock = {
		x : 0,
		y : 0,
		array : testArray
	};
	return newBlock;
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

function checkBlock(currentBlock, board, movement) {
	// checks if there is space below the block for it to fall once
	var block = {};
	block.array = currentBlock.array;
	block.x = currentBlock.x;
	block.y = currentBlock.y;
	block = movement(block);
	// console.log(block);
	// check block against boundaries of game window
	var array = block.array;
	if (block.y + array.length > board.length ||
		block.y < 0 ||
		block.x + array[0].length > board[0].length ||
		block.x < 0) {
		return false;
	}

	//check block against previous blocks
	var x = block.x;
	var y = block.y;
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === '#' && board[y + i][x + j] === 'X') {
				console.log('here');
				return false;
			}
			// // console.log(x + ', ' + y)
			// board[x+i][y+j] = array[i][j];
			// board[x][y] = 'X';
		}
	}
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