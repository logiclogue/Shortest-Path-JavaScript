export default class Array2D
{
    constructor(defaultValue) {
        this.world = [];
        this.defaultValue = defaultValue || false;
    }


    get(x, y, check) {
        this._updateElement(x, y);

        return this.world[x][y];
    }

    softGet(x, y) {
        if (!this.world[x]) {
            return this.defaultValue;
        }
        else if (typeof this.world[x][y] === 'undefined') {
            return this.defaultValue;
        }
        else  {
            return this.world[x][y];
        }
    }

    set(x, y, value) {
        this._updateElement(x, y);

        this.world[x][y] = value;
    }

    forEachCell(callback) {
        for (let x in this.world) {
            for (let y in this.world[x]) {
                callback(parseInt(x), parseInt(y), this.get(x, y));
            }
        }
    }


    _updateElement(x, y) {
        if (!this.world[x]) {
            this.world[x] = [];

            if (typeof this.world[x][y] === 'undefined') {
                this.world[x][y] = this.defaultValue;
            }
        }
    }
}
