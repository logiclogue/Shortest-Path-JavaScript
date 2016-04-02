class Main
{
	constructor() {
		Canvas.init();

		var graph = new Graph();
		var map = new Map();
		var dijkstra = new Dijkstra(graph);

		map.world[0][0] = 2;
		map.world[Math.floor(Math.random() * 100)][Math.floor(Math.random() * 100)] = 3;

		for (var x = 0; x < map.maxLength; x += 1) {
			for (var y = 0; y < map.maxLength; y += 1) {
				if (Math.random() < 0.3) {
					map.world[x][y] = 1;
				}
			}
		}

		map.convertToGraph(graph);
		map.drawOnCanvas();

		dijkstra.run();
	}
}


window.onload = function () {
	var main = new Main();
};
