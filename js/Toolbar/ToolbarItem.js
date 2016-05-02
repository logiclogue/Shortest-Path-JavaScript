import Event from '../Canvas/Event'
import Elements from '../Elements'


export default class ToolbarItem extends Event
{
    constructor(elementId) {
        super();

        let elements = new Elements();

        this.element = elements.get(elementId);

        this.element.addEventListener('mousedown', this._clickEvent.bind(this));
    }


    setEvents() {
        Event.removeAllEvents();

        this.element.className = 'down';
    }

    removeEvents() {
        this.element.className = '';
    }


    _clickEvent() {}
}
