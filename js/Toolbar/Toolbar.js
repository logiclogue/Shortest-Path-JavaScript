import Elements from '../Elements'
import DrawWall from './DrawWall'
import Erase from './Erase'
import ToolbarScroll from './ToolbarScroll'
import { canvas } from '../Main'


export default class Toolbar
{
    constructor() {
        this.toolDraw = new DrawWall();
        this.toolErase = new Erase();
        this.toolScroll = new ToolbarScroll();

        this.toolScroll._clickEvent();
    }
}
