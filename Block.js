class Block {
	constructor (x, y, array) {
		this.array = array;
		this.x = x;
		this.y = y;
		var rand = Math.floor(Math.random()*4);
		this.color = 'grey';
	}

	draw(board) {
		overlayArray(this, board.board);
	}
	
	updatePosition(board) {
		if (this.checkMovement(board.board, function(block) {
			block.y += 1;
			return block;
		})) {
			this.y += 1;
			return 1;
		} 
		return 0;
	}

	checkMovement(board, movement) {
		var placeHolderArray = this.array.slice();
		var placeHolder = new Block(this.x, this.y, placeHolderArray);	

		placeHolder = movement(placeHolder);
		return placeHolder.checkCollisions(board);
	}

	checkCollisions(board) {
		// console.log(board.length + ', ' + this.array.length + ', ' + this.y)
		// check block against boundaries of game window
		var array = this.array;
		if (this.y + this.array.length > board.length ||
			this.y < 0 ||
			this.x + this.array[0].length > board[0].length ||
			this.x < 0) {
			return false;
		}

		//check block against previous blocks
		for (var i = 0; i < this.array.length; i++) {
			for (var j = 0; j < this.array[i].length; j++) {
				if (this.array[i][j] === '#' && board[this.y + i][this.x + j].getContent() === 'X') {
					console.log('here');
					return false;
				}
			}
		}
		return true;
	}

	moveRight(board) {
		if (this.checkMovement(board.board, function(block) {
			block.x += 1;
			return block;
		})) {
			this.x += 1;	
		}
	}

	moveLeft(board) {
		if (this.checkMovement(board.board, function(block) {
			block.x -= 1;
			return block;
		})) {
			this.x -= 1;	
		}
	}

	rotateClockwise(board) {
		if (this.checkMovement(board.board, function(block) {
			block.array = rotateArrayClockwise(block.array);
			return block;
		})) {
			this.array = rotateArrayClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.x -= 1;
			block.array = rotateArrayClockwise(block.array);
			return block;
		})) {
			this.x -= 1;
			this.array = rotateArrayClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.x -= 2;
			block.array = rotateArrayClockwise(block.array);
			return block;
		})) {
			this.x -= 2;
			this.array = rotateArrayClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.x -= 3;
			block.array = rotateArrayClockwise(block.array);
			return block;
		})) {
			this.x -= 3;
			this.array = rotateArrayClockwise(this.array);
		}
	}

	rotateAntiClockwise(board) {
		if (this.checkMovement(board.board, function(block) {
			block.array = rotateArrayAntiClockwise(block.array);
			return block;
		})) {
			this.array = rotateArrayAntiClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.x -=1;
			block.array = rotateArrayAntiClockwise(block.array);
			return block;
		})) {
			this.x -=1;
			this.array = rotateArrayAntiClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.array = rotateArrayAntiClockwise(block.array);
			block.x -=2;
			return block;
		})) {
			this.x -=2;
			this.array = rotateArrayAntiClockwise(this.array);
		} else if (this.checkMovement(board.board, function(block) {
			block.array = rotateArrayAntiClockwise(block.array);
			block.x -=3;
			return block;
		})) {
			this.x -=3;
			this.array = rotateArrayAntiClockwise(this.array);
		}
	}

	reflect(board) {
		if (this.checkMovement(board.board, function(block) {
			block.array = reflectArray(block.array, 0);
			return block;
		})) {
			this.array = reflectArray(this.array, 1);
		}
	}
}