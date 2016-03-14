class Main
{
	constructor() {
		var graph = new Graph();
		var map = new Map();

		map.convertToGraph(graph);

		Canvas.init();
	}
}


window.onload = function () {
	var main = new Main();
};