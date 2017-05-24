function reflectArray(array) {
	var newArray = []
	for (var i = 0; i < array.length; i++) {
		newArray[i] = array[i].reverse();
	}
	return newArray;
}

function rotateArrayClockwise(array) {
	// DO NOT PASS IN 1D ARRAY NO CHECKS YET
	// TODO: SORT OUT THIS WHOLE FUNCTION AT SOME POINT

	// create new array to use
	var newArray = [];
	for (var i = 0; i < array[0].length; i ++) {
		newArray[i] = [];
		for (var j = 0; j < array.length; j++) {
			// console.log(i + ', ' + j)
			newArray[i][j] = '';
		}
	}

	//fill new array 
	for (var i=0; i < array.length; i++) {
		for (var j=0; j < array[0].length; j++) {
			newArray[j][newArray[0].length-1-i] = array[i][j];
		}
	}

	return newArray;
}

function overlayArray(block, board) {
	// translates the block array onto the board. 
	// console.log(x + ', ' + y)
	for (var i = 0; i < block.array.length; i++) {
		for (var j = 0; j < block.array[i].length; j++) {
			if (block.array[i][j] === '#') {
				board[block.y+i][block.x + j].setContent('#');
				board[block.y+i][block.x+j].setColor(block.color);
			}
		}
	}
}