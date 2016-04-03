import Dijkstra from 'Dijkstra'
import Canvas from 'Canvas'
import Edge from 'Edge'
import Graph from 'Graph'
import Map from 'Map'
import Node from 'Node'

export default class Main
{
	constructor() {
		Canvas.init();

		var graph = new Graph();
		var map = new Map();
		var dijkstra = new Dijkstra(graph);

		for (var x = 0; x < map.maxLength; x += 1) {
			for (var y = 0; y < map.maxLength; y += 1) {
				if (Math.random() < 0.5) {
					map.world[x][y] = 1;
				}
			}
		}

		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

		map.convertToGraph(graph);
		map.drawOnCanvas();

		dijkstra.run();
	}
}


window.onload = function () {
	var main = new Main();
};
