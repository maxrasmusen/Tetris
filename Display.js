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

}