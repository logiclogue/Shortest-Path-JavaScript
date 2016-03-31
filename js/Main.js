class Main
{
	constructor() {
		Canvas.init();

		var graph = new Graph();
		var map = new Map();
		var dijkstra = new Dijkstra(graph);

		map.world[3][3] = 1;

		map.convertToGraph(graph);

		graph.addStartNode('0,0');
		graph.addEndNode('9,9');

		map.drawOnCanvas();
		Canvas.drawLine(0, 0, 1, 1);

		dijkstra.run();
	}
}


window.onload = function () {
	var main = new Main();
};
