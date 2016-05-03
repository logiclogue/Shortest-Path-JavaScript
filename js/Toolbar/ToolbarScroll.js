import Scroll from '../Canvas/Scroll'
import ToolbarItem from './ToolbarItem'
import { canvas } from '../Main'


export default class ToolbarScroll extends ToolbarItem
{
    constructor() {
        super('tool-move');

        this.scroll = new Scroll(canvas);
    }

    setEvents() {
        super.setEvents();
        this.scroll.setEvents();
    }

    removeEvents() {
        super.removeEvents();
        this.scroll.removeEvents();
    }


    _clickEvent(e) {
        this.setEvents();
    }
}
