function reflectBlock(block, mainBoard) {
	// NOTE reflect array overrides the existing array, so that needs to change
	if (checkBlock(block, mainBoard, function(placeHolder) {
		// console.log('getting here');
		placeHolder.array = reflectArray(placeHolder.array);
		return placeHolder;
	})) {
		// console.log('returning true')
		// console.log(block.array);
		block.array = reflectArray(block.array);
		// console.log(block.array);
	}
	return block;
}

function reflectArray(array) {
	var newArray = []
	for (var i = 0; i < array.length; i++) {
		newArray[i] = array[i].reverse();
	}
	return newArray;
}

function rotateBlockClockwise(block, mainBoard) {
	if (checkBlock(block, mainBoard, function(placeHolder) {
		placeHolder.array = rotateArrayClockwise(placeHolder.array);
		return placeHolder;
	})) {
		block.array = rotateArrayClockwise(block.array);
	}
	return block;
}

function rotateBlockAntiClockwise(block, mainBoard) {
	//TODO: FIX THIS SO MUCH
	block = rotateBlockClockwise(block, mainBoard);
	block = rotateBlockClockwise(block, mainBoard);
	block = rotateBlockClockwise(block, mainBoard);
	return block;
}

function rotateArrayClockwise(array) {
	// DO NOT PASS IN 1D ARRAY NO CHECKS YET
	// TODO: SORT OUT THIS WHOLE FUNCTION AT SOME POINT

	// create new array to use
	var newArray = [];
	// console.log(array.length);
	// console.log(array[0].length);
	for (var i = 0; i < array[0].length; i ++) {
		newArray[i] = [];
		for (var j = 0; j < array.length; j++) {
			// console.log(i + ', ' + j)
			newArray[i][j] = 0;
		}
	}
	// console.log(newArray);
	// console.log('---');
	for (var i=0; i < array.length; i++) {
		for (var j=0; j < array[0].length; j++) {
			newArray[j][newArray[0].length-1-i] = array[i][j];
		}
	}

	return newArray;
}