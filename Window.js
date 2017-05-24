class Window {
	constructor(board, display) {
		this.mainBoard = board;
		this.display = display;
		this.currentBlock;
	}

	draw() {
		console.log('drawing');
		this.mainBoard.clear();
		this.currentBlock.draw(this.mainBoard);
		this.display.drawToScreen(this.mainBoard);
	}

	watch(game) {
		this.game = game;
		game.addWindow(this);
	}

	setBlock(block) {
		var wBlockArray = [];

		for (var i = 0; i < block.array.length; i++) {
				wBlockArray[i] = [];
				for (var j = 0; j < block.array[0].length; j++) {
				wBlockArray[i][j] = block.array[i][j];
			}
		}	

		var wBlock = new Block(1, 6, wBlockArray);
		this.currentBlock = wBlock;
	}

}