export default class AnimLoop
{
    constructor() {

    }


    run() {
        this.loop();
    }

    stop() {
        clearInterval(this.interval);
    }

    loop(timestamp) {
        requestAnimationFrame(this.loop.bind(this));

        this.drawFunction();
        this.updateFunction();
    }

    updateFunction () {}

    drawFunction () {}
}
