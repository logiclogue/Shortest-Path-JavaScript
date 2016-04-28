export default class Elements
{
    static els = {};


    constructor() {

    }


    get(elementName) {
        Elements.els[elementName] = Elements.els[elementName] || document.getElementById(elementName);

        return Elements.els[elementName];
    }
}
