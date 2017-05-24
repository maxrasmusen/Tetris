class Game {
	constructor(mainBoard, display) {
		this.mainBoard = mainBoard;
		this.display = display;
		var rand = Math.floor(Math.random() * 5);
		this.currentBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
		this.toStop = false;
		var currentFrame;
		this.speed = 1000;
		this.currentSpeed = this.speed;
		this.score = 0;
		this.nextWindow;
		this.nextBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
	}

	start() {
		frame(this);
	}

	draw() {
		this.mainBoard.drawToScreen(this.HTMLBoard);
	}

	updateBlock() {
		this.currentBlock.draw(this.mainBoard);
	}

	draw() {
		this.mainBoard.clear();
		this.currentBlock.draw(this.mainBoard);
		this.display.drawToScreen(this.mainBoard);
	}

	stop() {
		console.log('Stop')
		this.toStop = true;
		clearInterval(this.currentFrame);
	}

	toggleSpeed() {
		if (this.currentSpeed === this.speed) {
			this.currentSpeed = 100;
		} else {
			this.currentSpeed = this.speed;
		}
	}

	scoreInc() {
		var score = $('#score');
		score.html(parseInt(score.html())+1);
		if (this.speed > 100) {
			this.speed -= 20;
		}
		return score.html();
	}

	checkForLoss(block) {
		if (block.y <= 5) {
			alert('You lost with a score of: ' + $('#score').html());
			this.stop();
		}
	}

	addWindow(window) {
		this.window = window;
	}

	updateWindow() {
			// this.window = currentBlock;
			// this.window.display.
		this.window.setBlock(this.nextBlock);
		this.window.draw();
	}

	frame() {
		// console.log(this.speed);
		if (!this.currentBlock.updatePosition(this.mainBoard)) {
			this.mainBoard.place(this.currentBlock);
			this.checkForLoss(this.currentBlock);
			var rand = Math.floor(Math.random() * 5);
			this.currentBlock = this.nextBlock;
			this.nextBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
			this.currentSpeed = this.speed;
			// console.log(this.currentSpeed);
		}
		this.mainBoard.checkRowsForClear(this);
		this.draw();
		if (this.window) {
			this.updateWindow();
		}
		if (!this.toStop) {
			this.currentFrame = setTimeout(frame, this.currentSpeed, this);
		}
	}
}

function frame(game) {
	game.frame();
}