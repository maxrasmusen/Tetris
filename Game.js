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
		rand = Math.floor(Math.random() * 5);
		this.nextBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
		this.currentBlock.color = getColor();
		this.nextBlock.color = getColor();
		this.onStop = function() {
						console.log('stop');
						return this.score
					}
	}

	togglePause() {
			if (!this.toStop) {
			console.log('togglePause');
			if (this.currentFrame === false) {
				this.currentFrame = setTimeout(frame, this.currentSpeed, this);
			} else {
				clearInterval(this.currentFrame);
				this.currentFrame = false;
			}
		}
	}

	start() {
		if (this.window) {
			this.updateWindow();
		}
		frame(this);
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
		this.currentFrame = false;
		this.onStop();
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
		// if (this.speed > 300) {
		// 	this.speed -= 20;
		// }
		return score.html();
	}

	checkForLoss() {
		if (this.currentBlock.y <= 5) {
			//alert('You lost with a score of: ' + $('#score').html());
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
			//change block
			this.mainBoard.place(this.currentBlock);
			this.checkForLoss();
			
			var nArray = this.nextBlock.array.slice();
			this.currentBlock = this.nextBlock;
			var rand = Math.floor(Math.random() * pieces.length);
			this.nextBlock = new Block(3, 5 - pieces[rand].length, pieces[rand]);
			this.nextBlock.color = getColor();
			this.currentSpeed = this.speed;
			if (this.window) {
				this.updateWindow();
			}
			// console.log(this.currentSpeed);
		}
		var clearIndex = this.mainBoard.checkRowsForClear(this);
		if (clearIndex >= 0) {
			this.display.wobble(this.mainBoard,clearIndex);
		}
		this.draw();
		
		//need this to prevent the 
		if (!this.toStop) {
			this.currentFrame = setTimeout(frame, this.currentSpeed, this);
		}
	}
}

function frame(game) {
	game.frame();
}