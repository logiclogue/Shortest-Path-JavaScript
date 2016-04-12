import DijkstraDraw from './PathFinder/DijkstraDraw'
import Canvas from './Canvas/Canvas'
import Scroll from './Canvas/Scroll'
import Graph from './Graph/Graph'
import Map from './Map'

export default class Main
{
	constructor() {
		let canvas = new Canvas('main-canvas');
		let graph = new Graph();
		let map = new Map(canvas);
		let dijkstra = new DijkstraDraw(undefined, canvas);
		let scroll = new Scroll(canvas);

		for (let x = 0; x < map.maxLength; x += 1) {
			for (let y = 0; y < map.maxLength; y += 1) {
				if (Math.random() < 0.5) {
					map.world[x][y] = 1;
				}
			}
		}

		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

		map.convertToGraph(graph);
		dijkstra.selectGraph(graph);

		let index = 0;
		let speed = 1 / 0.01;

		setInterval(() => {
			index += 1;

			if (index % speed === 0) {
				dijkstra.step();
			}

			map.draw();
			dijkstra.draw();
		}, 1);
	}
}


window.onload = function () {
	let main = new Main();
};
