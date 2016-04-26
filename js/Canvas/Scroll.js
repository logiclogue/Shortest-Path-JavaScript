import Event from './Event'

export default class Scroll extends Event
{
    constructor(canvas, element) {
        super();

        this.canvas = canvas;
        this.element = canvas.c || element;
        this.startX = 0;
        this.startY = 0;
        this.isMoving = false;

        this.setEvents();
    }


    setEvents() {
        this.element.addEventListener('mousedown', this._mousedown.bind(this));
        this.element.addEventListener('mouseup', this._mouseup.bind(this));
        this.element.addEventListener('mousemove', this._mousemove.bind(this));
        this.element.addEventListener('wheel', this._zoom.bind(this));
    }

    removeEvents() {
        this.element.removeEventListener('mousedown', this._mousedown.bind(this));
        this.element.removeEventListener('mouseup', this._mouseup.bind(this));
        this.element.removeEventListener('mouseMove', this._mousemove.bind(this));
        this.element.removeEventListener('wheel', this._zoom.bind(this));
    }


    _mousedown(e) {
        console.log(e.clientX);

        this.isMoving = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
    }

    _mouseup(e) {
        this.isMoving = false;
    }

    _mousemove(e) {
        if (this.isMoving) {
            this.canvas.posX -= (this.startX - e.pageX) / this.canvas.scaleFactor;
            this.canvas.posY -= (this.startY - e.pageY) / this.canvas.scaleFactor;
        }

        this.startX = e.pageX;
        this.startY = e.pageY;
    }

    _zoom(e) {
        e.preventDefault();

        this.canvas.zoom = this.canvas.zoom + (e.wheelDelta / 1000);
    }
}
