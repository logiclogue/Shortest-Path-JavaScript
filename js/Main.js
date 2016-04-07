import Dijkstra from './PathFinder/Dijkstra'
import Canvas from './Canvas/Canvas'
import Graph from './Graph/Graph'
import Map from './Map'

export default class Main
{
	constructor() {
		Canvas.init();

		let graph = new Graph();
		let map = new Map();
		let dijkstra = new Dijkstra();

		for (let x = 0; x < map.maxLength; x += 1) {
			for (let y = 0; y < map.maxLength; y += 1) {
				if (Math.random() < 0.5) {
					map.world[x][y] = 1;
				}
			}
		}

		//for (let i = 0; i < Math.floor(Math.random() * 2); i += 1) {
			map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
		//}

		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

		map.convertToGraph(graph);
		dijkstra.selectGraph(graph);

		setInterval(() => {
			dijkstra.step();
			map.draw();
			dijkstra.draw();
		}, 1);
	}
}


window.onload = function () {
	let main = new Main();
};
