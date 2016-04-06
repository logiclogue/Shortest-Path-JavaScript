export default class Path
{
    constructor() {
        this.route = [];
    }

    addLine(x1, y1, x2, y2) {
        this.route.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        })
    }
}
