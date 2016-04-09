export default class Scroll
{
    constructor(canvas) {
        this.canvas = canvas;
        this.element = canvas.c;
        this.startX = 0;
        this.startY = 0;
        this.isMoving = false;

        this.setEvents();
    }


    setEvents() {
        this.element.addEventListener('mousedown', this._mousedown.bind(this));
        this.element.addEventListener('mouseup', this._mouseup.bind(this));
        this.element.addEventListener('mousemove', this._mousemove.bind(this));
    }

    removeEvents() {
        this.element.removeEventListener('mousedown', this._mousedown);
        this.element.removeEventListener('mouseup', this._mouseup);
        this.element.removeEventListener('mouseMove', this._mousemove);
    }


    _mousedown(e) {
        this.isMoving = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
    }

    _mouseup(e) {
        this.isMoving = false;
    }

    _mousemove(e) {
        console.log(this.canvas.posX);
        if (this.isMoving) {
            this.canvas.posX -= (this.startX - e.pageX) / this.canvas.scaleFactor;
            this.canvas.posY -= (this.startY - e.pageY) / this.canvas.scaleFactor;
        }

        this.startX = e.pageX;
        this.startY = e.pageY;
    }
}
