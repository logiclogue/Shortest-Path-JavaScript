export default class Array2D
{
    constructor(defaultValue) {
        this.world = [];
        this.defaultValue = defaultValue || false;
    }


    get(x, y) {
        this._updateElement(x, y);

        return this.world[x][y];
    }

    set(x, y, value) {
        this._updateElement(x, y);

        this.world[x][y] = value;
    }


    _updateElement(x, y) {
        if (!this.world[x]) {
            this.world[x] = [];

            if (!this.world[x][y]) {
                this.world[x][y] = this.defaultValue;
            }
        }
    }
}
