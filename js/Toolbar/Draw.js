import Event from '../Canvas/Event'
import ToolbarItem from './ToolbarItem'
import { canvas, map, animLoop, graph } from '../Main'


export default class Draw extends ToolbarItem
{
    constructor(elementId, colour) {
        super(elementId);

        this.canvas = canvas.c;
        this.mousedown = false;
        this.colour = colour;
        this._drawBind = this._draw.bind(this);
    }


    setEvents() {
        super.setEvents();

        this.canvas.addEventListener('mousedown', this._drawBind);
        this.canvas.addEventListener('mousemove', this._drawBind);
        this.canvas.addEventListener('mouseup', this._drawBind);
    }

    removeEvents() {
        super.removeEvents();

        animLoop.pause = false;
        map.convertToGraph(graph);

        this.canvas.removeEventListener('mousedown', this._drawBind);
        this.canvas.removeEventListener('mousemove', this._drawBind);
        this.canvas.removeEventListener('mouseup', this._drawBind);
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

    _clickEvent(e) {
        this.setEvents();
    }
}
