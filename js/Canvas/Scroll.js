export default class Scroll
{
    constructor(canvas, element) {
        this.canvas = canvas;
        this.canvasElement = canvas.c || element;
        this.startX = 0;
        this.startY = 0;
        this.isMoving = false;

        this._mousedownBind = this._mousedown.bind(this);
        this._mouseupBind = this._mouseup.bind(this);
        this._mousemoveBind = this._mousemove.bind(this);
        this._zoomBind = this._zoom.bind(this);
    }


    setEvents() {
        this.canvasElement.addEventListener('mousedown', this._mousedownBind);
        this.canvasElement.addEventListener('mouseup', this._mouseupBind);
        this.canvasElement.addEventListener('mousemove', this._mousemoveBind);
        this.canvasElement.addEventListener('wheel', this._zoomBind);
    }

    removeEvents() {
        this.canvasElement.removeEventListener('mousedown', this._mousedownBind);
        this.canvasElement.removeEventListener('mouseup', this._mouseupBind);
        this.canvasElement.removeEventListener('mousemove', this._mousemoveBind);
        this.canvasElement.removeEventListener('wheel', this._zoomBind);
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
