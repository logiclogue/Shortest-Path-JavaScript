export default class AnimLoop
{
    constructor() {
        this.now;
        this.last;
        this.dt;
        this.step = 1 / 60;
        this.pause = false;
    }


    run() {
        this._loop();
    }

    drawFunction() {}

    updateFunction() {}


    _loop() {
        requestAnimationFrame(this._loop.bind(this));

        if (this.pause) {
            return;
        }

        this.now = this._timestamp();
        this.dt = Math.min(1, (this.now - this.last) / 1000);

        while (this.dt > this.step) {
            this.dt = this.dt - this.step;

            this.updateFunction();
        }

        this.drawFunction();

        this.last = this.now;
    }

    _timestamp() {
        return Date.now();
    }
}
