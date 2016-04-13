import DijkstraDraw from './PathFinder/DijkstraDraw'
import Canvas from './Canvas/Canvas'
import Scroll from './Canvas/Scroll'
import Graph from './Graph/Graph'
import Map from './Map'
import { Random } from'./Generator/Generator'

export default class Main
{
	constructor() {
		let canvas = new Canvas('main-canvas');
		let graph = new Graph();
		let map = new Map(canvas);
		let dijkstra = new DijkstraDraw(undefined, canvas);
		let scroll = new Scroll(canvas);
		let randomGen = new Random(map);

		randomGen.run();

		map.convertToGraph(graph);
		dijkstra.selectGraph(graph);

		let index = 0;
		let speed = 1 / 0.2;

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
