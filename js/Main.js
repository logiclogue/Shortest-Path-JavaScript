class Main
{
	constructor() {
		var graph = new Graph();
		var map = new Map();

		map.convertToGraph(graph);

		Canvas.init();

		graph.addStartNode('0,0');
		graph.addEndNode('9,9');
		graph.drawOnCanvas();

		Canvas.drawLine(0, 0, 1, 1);
	}
}


window.onload = function () {
	var main = new Main();
};
