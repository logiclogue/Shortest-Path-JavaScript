export default class Event
{
    static events = [];


    constructor() {
        Event.events.push(this);
    }


    setEvents() {}

    removeEvents() {}


    static setAllEvents() {

    }

    static removeAllEvents() {

    }
}
