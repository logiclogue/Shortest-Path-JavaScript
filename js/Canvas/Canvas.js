import Elements from '../Elements.js'

export default class Canvas
{
	constructor(elementId) {
		let elements = new Elements();

		this.c = elements.get(elementId);
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
			wall: '#303030'
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
		let start = this.convertCoordToPoint(x, y);
		let width = this.scaleFactor;
		let height = this.scaleFactor;

		this.ctx.fillStyle = colour || this.colours.theDefault;
		this.ctx.fillRect(start.x, start.y, width, height);
	}

	drawLine(x1, y1, x2, y2) {
		let start = this.convertCoordToPoint(x1, y1);
		let end = this.convertCoordToPoint(x2, y2);
		let halfScaleFactor = this.scaleFactor / 2;

		start.x += halfScaleFactor;
		start.y += halfScaleFactor;
		end.x += halfScaleFactor;
		end.y += halfScaleFactor;

		this.ctx.beginPath();
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.lineWidth = this.scaleFactor / 5;
		this.ctx.lineCap = 'round';
		this.ctx.stroke();
	}

	clear() {
		this.ctx.fillStyle = this.colours.wall;

		this.ctx.fillRect(0, 0, this.c.width, this.c.height);
	}


	convertCoordToPoint(x, y) {
		let pos = this._getPos();

		x *= this.scaleFactor;
		y *= this.scaleFactor;

		return {
			x: Math.round(x + pos.x) + (this.width / 2),
			y: Math.round(y + pos.y) + (this.height / 2)
		}
	}

	convertPointToCoord(x, y) {
		let pos = this._getPos();

		return {
			x: Math.floor((x - pos.x - (this.width / 2)) / this.scaleFactor),
			y: Math.floor((y - pos.y - (this.height / 2)) / this.scaleFactor)
		}
	}

	_getPos() {
		return {
			x: this.posX * this.scaleFactor,
			y: this.posY * this.scaleFactor
		}
	}
}
