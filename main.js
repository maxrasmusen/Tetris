$(init)

// var currentBlock;
var running;
var speed = 1000;

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
		case 32:
			toggleSpeed();
			break;
		case 107:
			reflectBlock(currentBlock, mainBoard);
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

function generateBlock () {
	//create a new block when old one hits the ground

	var rand = Math.floor(Math.random() * 5);
	console.log(rand);
	var arr = pieces[rand];
	var yStart = 5 - arr.length;
	var newBlock = {
		x : 0,
		y : yStart,
		array : arr
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

function checkBlock(currentBlock, board, movement) {
	// checks if there is space below the block for it to fall once
	var block = {};
	block.array = [];
	for (var i = 0; i < currentBlock.array.length; i++) {
		block.array[i] = [];
		for (var j = 0; j < currentBlock.array[0].length; j++) {
			block.array[i][j] = currentBlock.array[i][j];
		}
	}
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