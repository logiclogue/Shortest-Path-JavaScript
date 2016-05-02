import Elements from '../Elements'
import DrawWall from './DrawWall'
import Scroll from '../Canvas/Scroll'
import Erase from './Erase'
import { canvas } from '../Main'


export default class Toolbar
{
    constructor() {
        this.toolDraw = new DrawWall();
        this.toolErase = new Erase();
        this.toolScroll = new Scroll(canvas);
    }
}
