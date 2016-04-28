export default class Event
{
    static events = [];


    constructor() {
        Event.events.push(this);
    }


    setEvents() {}

    removeEvents() {}


    static setAllEvents() {
        Event.events.forEach((event) => {
            event.setEvents();
        });
    }

    static removeAllEvents() {
        Event.events.forEach((event) => {
            event.removeEvents();
        });
    }
}
