class Main
{
	constructor() {
		var graph = new Graph();
		var map = new Map();

		map.convertToGraph(graph);

		Canvas.init();
		Canvas.drawSquare(0, 0)
	}
}


window.onload = function () {
	var main = new Main();
};
