class Game {
	constructor(mainBoard, display) {
		this.mainBoard = mainBoard;
		this.display = display;
		var rand = Math.floor(Math.random() * 5);
		this.currentBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
		this.toStop = false;
		var currentFrame;
		this.speed = 1000;
		this.score = 0;
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
		if (this.speed === 1000) {
			this.speed = 100
		} else {
			this.speed = 1000
		}
	}

	scoreInc() {
		var score = $('#score');
		score.html(parseInt(score.html())+1);
		return score.html();
	}

	checkForLoss(block) {
		if (block.y <= 5) {
			alert('You lost with a score of: ' + $('#score').html());
			this.stop();
		}
	}

	frame() {
		if (!this.currentBlock.updatePosition(this.mainBoard)) {
			this.mainBoard.place(this.currentBlock);
			this.checkForLoss(this.currentBlock);
			this.speed = 1000;
			var rand = Math.floor(Math.random() * 5);
			this.currentBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
		}
		this.mainBoard.checkRowsForClear(this);
		this.draw();
		if (!this.toStop) {
			this.currentFrame = setTimeout(frame, this.speed, this);
		}
	}
}

function frame(game) {
	game.frame();
}