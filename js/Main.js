class Main
{
	constructor() {
		var graph = new Graph();
		var map = new Map();

		map.convertToGraph(graph);

		Canvas.init();
		Canvas.drawSquare(0, 0);

		graph.addStartNode('0,0');
		graph.addEndNode('9,9');
		graph.drawOnCanvas();
	}
}


window.onload = function () {
	var main = new Main();
};
