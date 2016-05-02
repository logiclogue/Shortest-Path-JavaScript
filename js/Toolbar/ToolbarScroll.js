import Scroll from '../Canvas/Scroll'
import ToolbarItem from './ToolbarItem'
import { canvas } from '../Main'


export default class ToolbarScroll extends ToolbarItem
{
    constructor() {
        super('tool-move');

        this.scroll = new Scroll(canvas);
    }


    _clickEvent(e) {
        this.setEvents();
        this.scroll.setEvents();
    }
}
