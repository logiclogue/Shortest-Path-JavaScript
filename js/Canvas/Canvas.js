export default class Canvas
{
	static init() {
		this.c = document.getElementById('main-canvas');
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.width = this.c.width;
		this.height = this.c.height;

		this.scaleFactor = 40;
		this.posX = 0;
		this.posY = 0;

		this.colours = {
			start: '#00FF00',
			end: '#FF0000',
			theDefault: '#DDDDDD',
			wall: '#000000'
		}
	}


	static drawSquare(x, y, colour) {
		let posX = this.posX * this.scaleFactor;
		let posY = this.posY * this.scaleFactor;
		x = x * this.scaleFactor;
		y = y * this.scaleFactor;

		this.ctx.fillStyle = colour || this.colours.theDefault;
		this.ctx.fillRect(Math.round(x + posX), Math.round(y + posY), Math.round(this.scaleFactor), Math.round(this.scaleFactor));
	}

	static drawLine(x1, y1, x2, y2) {
		let posX = this.posX * this.scaleFactor;
		let posY = this.posY * this.scaleFactor;
		x1 = (x1 * this.scaleFactor) + (this.scaleFactor / 2);
		x2 = (x2 * this.scaleFactor) + (this.scaleFactor / 2);
		y1 = (y1 * this.scaleFactor) + (this.scaleFactor / 2);
		y2 = (y2 * this.scaleFactor) + (this.scaleFactor / 2);

		this.ctx.beginPath();
		this.ctx.moveTo(x1 + posX, y1 + posY);
		this.ctx.lineTo(x2 + posX, y2 + posY);
		this.ctx.lineWidth = this.scaleFactor / 5;
		this.ctx.lineCap = 'round';
		this.ctx.stroke();
	}

	static clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}
}
