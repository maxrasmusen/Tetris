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
		var wBlockArray = block.array.slice();
		var wBlock = new Block(1, 6, wBlockArray);
		wBlock.color = block.color;
		this.currentBlock = wBlock;
	}

}