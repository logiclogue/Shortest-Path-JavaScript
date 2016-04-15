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
        if (window.requestAnimationFrame) {
            requestAnimationFrame(this.loop.bind(this));
        }
        else {
            setTimeout(this.loop(Date.now()), 1);
        }

        this.drawFunction();
        this.updateFunction();
    }

    updateFunction () {}

    drawFunction () {}
}
