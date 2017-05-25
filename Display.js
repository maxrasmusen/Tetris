class Display {
	constructor(width, height, elementName) {
		this.elementName = elementName;
		this.width = width;
		this.height = height;
		this.board = this.setUpHTMLBoard();

	}

	setUpHTMLBoard() {
	//creates inital HTML board. This is a bunch of html elements that are updated using the mainbBoard
		var board = $(this.elementName).html('');
		for (var i = 0; i < this.height; i++) {
			var row = $('<ul>').attr('id', 'row-' + i);
			board.append(row);
			for (var j = 0; j < this.width; j++) {
				row.append($('<li>'));
			}
		}
		return board;
	}

	drawToScreen(gameBoard) {
		for (var i=0; i < this.board.children().toArray().length; i++) {
			var row = this.board.children().toArray()[i];
			for (var j=0; j < $(row).children().toArray().length; j++) {
				var square = $(row).children().toArray()[j];
				var gameSquare = gameBoard.board[i + 5][j];
				$(square).attr('class', gameSquare.getType());
				if (gameSquare.getType() !== 'background') {
					$(square).css( {
						'background-color': gameSquare.getColor(),
						'border-color': gameSquare.getColor(),
						'box-shadow': '0px 0px 10px 0px ' + gameSquare.getColor()
					});
				}
			}
		}
	}

	wobble (gameBoard, clearIndex) {
		console.log(clearIndex);
		for (var i=0; i < clearIndex-4; i++) {
			var row = this.board.children().toArray()[i];
			for (var j=0; j < $(row).children().toArray().length; j++) {
				var square = $(row).children().toArray()[j];
				var gameSquare = gameBoard.board[i + 5][j];
				if (gameSquare.getType() === 'terrain') {
					var rand = Math.floor(Math.random() * 9)+6;
					var dist = Math.floor(Math.random()*3) + 3;
					wobbleDiv(square, rand, dist);
				}
			}
		}
	}
}

function wobbleDiv(square, count, dist) {
		// console.log('Wobble: ' + count + ', ' + dist);
		if (count <= 0) {
			$(square).css('transform', 'rotate(0deg)');
		} else if (count % 2 === 0) {
			$(square).css('transform', 'rotate(' + dist + 'deg)');
			setTimeout(wobbleDiv, 100, square, count - 1, dist);
		} else {
			$(square).css('transform', 'rotate(-' + dist + 'deg)');
			setTimeout(wobbleDiv, 100, square, count - 1, dist);
	}
}