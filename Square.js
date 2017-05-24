class Square {

	constructor(content) {
		this.content = content;
		this.color;
	}

	setContent(str) {
		this.content = str;
	}

	getContent() {
		return this.content;
	}

	getType() {
		if (this.content === '#') {
			return 'block';
		} else if (this.content === 'X') {
			return 'terrain';
		} else {
			return 'background';
		}
	}

	setColor(color) {
		this.color = color;
	}

	getColor() {
		return this.color;
	}
}