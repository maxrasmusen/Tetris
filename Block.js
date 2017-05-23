class Block {
	constructor (x, y, array) {
		this.array = array;
		this.x = x;
		this.y = y;
	}

	draw(board) {
		overlayArray(this.array, board.board, this.x, this.y);
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
		var placeHolderArray = [];

		for (var i = 0; i < this.array.length; i++) {
			placeHolderArray[i] = [];
			for (var j = 0; j < this.array[0].length; j++) {
			placeHolderArray[i][j] = this.array[i][j];
			}
		}	

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
				if (this.array[i][j] === '#' && board[this.y + i][this.x + j] === 'X') {
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
		}
	}

	rotateAntiClockwise(board) {
		this.rotateClockwise(board);
		this.rotateClockwise(board);
		this.rotateClockwise(board);
	}

	reflect(board) {
		if (this.checkMovement(board.board, function(placeHolder) {
			placeHolder.array = reflectArray(placeHolder.array);
			return placeHolder;
		})) {
			this.array = reflectArray(this.array);
		}
	}
}