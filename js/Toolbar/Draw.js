import Event from '../Canvas/Event'
import Elements from '../Elements'
import { canvas } from '../Main'


export default class Draw extends Event
{
    constructor() {
        super();

        let elements = new Elements();

        this.canvas = canvas.c;
        this.element = elements.get('tool-draw');

        this.element.addEventListener('mousedown', this.setEvents.bind(this));
    }


    setEvents() {
        Event.removeAllEvents();

        this.canvas.addEventListener('click', this._drawWall);
    }

    removeEvents() {
        this.canvas.removeEventListener('click', this._drawWall);
    }


    _drawWall(e) {
        let coords = canvas .convertPointToCoord(e.pageX, e.pageY);

        console.log(coords.x, coords.y);
    }
}
