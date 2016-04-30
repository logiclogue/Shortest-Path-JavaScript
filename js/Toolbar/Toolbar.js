import Elements from '../Elements'
import DrawWall from './DrawWall'
import Erase from './Erase'


export default class Toolbar
{
    constructor() {
        this.toolDraw = new DrawWall();
        this.toolErase = new Erase();
    }
}
