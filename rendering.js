
function drawBlock(block, board) {
	// draws current falling block onto board
	overlayArray(block["array"], board, block.x, block.y);
}

function overlayArray(array, board, x, y) {
	// translates the block array onto the board. 

	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === '#') {
				board[y+i][x + j] = array[i][j];
			}
		}
	}
}

function showBoard(board, HTMLBoard) {
	// takes the mainBoard and updates the html elements so we can see what's happening.

	HTMLBoard.children().toArray().forEach(function (row, rowIndex) {
		$(row).children().toArray().forEach (function (square, squareIndex) {
			var squareContents = board[rowIndex][squareIndex];
			if (squareContents === 'X') {
				$(square).attr('class', 'terrain');
			} else if (squareContents === '#') {
				$(square).attr('class', 'block');
			} else {
				$(square).attr('class', 'background');
			}
		});
	});
}

function clearBoard(board) {
	// clears the board of all temporary pieces each tick

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			// console.log(board[i][j]);
			if (board[i][j] !== 'X') {
				board[i][j] = ' ';
			}
		}
	}
}