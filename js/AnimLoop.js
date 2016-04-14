export default class AnimLoop
{
    constructor() {
        this.interval;
    }


    run() {
        this.interval = setInterval(this.loop.bind(this), 1);
    }

    stop() {
        clearInterval(this.interval);
    }

    loop() {}
}
