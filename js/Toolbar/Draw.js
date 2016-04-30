import Event from '../Canvas/Event'
import Elements from '../Elements'
import { canvas, map, animLoop } from '../Main'


export default class Draw extends Event
{
    constructor(elementId, colour) {
        super();

        let elements = new Elements();

        this.canvas = canvas.c;
        this.element = elements.get(elementId);
        this.mousedown = false;
        this.colour = colour;
        this._drawBind = this._draw.bind(this);

        this.element.addEventListener('mousedown', this.setEvents.bind(this));
    }


    setEvents() {
        Event.removeAllEvents();

        this.canvas.addEventListener('mousedown', this._drawBind);
        this.canvas.addEventListener('mousemove', this._drawBind);
        this.canvas.addEventListener('mouseup', this._drawBind);

        this.element.className = 'down';
    }

    removeEvents() {
        this.canvas.removeEventListener('mousedown', this._drawBind);
        this.canvas.removeEventListener('mousemove', this._drawBind);
        this.canvas.removeEventListener('mouseup', this._drawBind);

        this.element.className = '';
    }


    _draw(e) {
        if (e.type === 'mousedown') {
            this.mousedown = true;
        }
        else if (e.type === 'mousemove' && !this.mousedown) {
            return;
        }
        else if (e.type === 'mouseup') {
            this.mousedown = false;

            return;
        }

        let coords = canvas.convertPointToCoord(e.pageX, e.pageY);

        animLoop.pause = true;

        map.world.set(coords.x, coords.y, this.colour);
        canvas.drawSquare(coords.x, coords.y, map.colourIndex[this.colour]);
    }
}
