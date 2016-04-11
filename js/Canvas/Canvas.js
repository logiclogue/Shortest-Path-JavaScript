export default class Canvas
{
	constructor(elementId) {
		this.c = document.getElementById(elementId);
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.width = this.c.width;
		this.height = this.c.height;

		this._zoom = 4;
		this.scaleFactor = Math.pow(2, this.zoom);
		this.posX = 0;
		this.posY = 0;

		this.colours = {
			start: '#00FF00',
			end: '#FF0000',
			theDefault: '#DDDDDD',
			wall: '#000000'
		}
	}


	set zoom(value) {
		this._zoom = value;
		this.scaleFactor = Math.round(Math.pow(2, value));
	}

	get zoom() {
		return this._zoom;
	}


	drawSquare(x, y, colour) {
		let posX = this.posX * this.scaleFactor;
		let posY = this.posY * this.scaleFactor;
		x *= this.scaleFactor;
		y *= this.scaleFactor;
		let startX = Math.round(x + posX) + (this.width / 2);
		let startY = Math.round(y + posY) + (this.height / 2);
		let width = this.scaleFactor;
		let height = this.scaleFactor;

		this.ctx.fillStyle = colour || this.colours.theDefault;
		this.ctx.fillRect(startX, startY, width, height);
	}

	drawLine(x1, y1, x2, y2) {
		let posX = this.posX * this.scaleFactor;
		let posY = this.posY * this.scaleFactor;
		x1 = (x1 * this.scaleFactor) + (this.scaleFactor / 2);
		x2 = (x2 * this.scaleFactor) + (this.scaleFactor / 2);
		y1 = (y1 * this.scaleFactor) + (this.scaleFactor / 2);
		y2 = (y2 * this.scaleFactor) + (this.scaleFactor / 2);
		let startX = x1 + posX + (this.width / 2);
		let startY = y1 + posY + (this.height / 2);
		let endX = x2 + posX + (this.width / 2);
		let endY = y2 + posY + (this.height / 2);

		this.ctx.beginPath();
		this.ctx.moveTo(startX, startY);
		this.ctx.lineTo(endX, endY);
		this.ctx.lineWidth = this.scaleFactor / 5;
		this.ctx.lineCap = 'round';
		this.ctx.stroke();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}
}
