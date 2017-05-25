class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.board = this.generateBoard();
	}

	clear() {
		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board[i].length; j++) {
				// console.log(board[i][j]);
				if (this.board[i][j].getContent() !== 'X') {
					this.board[i][j] = new Square('-');
				}
			}
		}
	}	

	place(block) {
		// checkForLoss(block); 
		// console.log('here')
		var array = block.array;
		var x = block.x;
		var y = block.y;
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (array[i][j] === '#') {
					this.board[y+i][x + j].setContent('X');
				}
			}
		}
	}

	checkRowsForClear(game) {
		var clearedAnyRows = false;
		for (var i=0; i < this.board.length; i++) {
			var row = this.board[i];
			if (row.every(function(element) {
				return element.getContent() === 'X';
			})) {
				this.clearRow(i, game);
				clearedAnyRows = true;
			}
		}
		return clearedAnyRows;
	}

	clearRow(index, game) {
		for (var i = index; i > 0; i--) {
			this.board[i] = this.board[i-1];
		}
		this.board[0] = [];
		for (var i=0; i < 10; i++) {
			this.board[0][i] = new Square('');
		}
		game.scoreInc();
	}

	generateBoard() {
	//creates inital board. this is the board the logic is done on. a 2d array
	var mainBoard = [];
		for (var i=0; i < this.height; i++) {
			mainBoard[i] = [];
			for (var j=0; j < this.width; j++) {
				mainBoard[i][j] = new Square('');
			}
		}
		return mainBoard;
	}
}