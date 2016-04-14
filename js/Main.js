import DijkstraDraw from './PathFinder/DijkstraDraw'
import Canvas from './Canvas/Canvas'
import Scroll from './Canvas/Scroll'
import Graph from './Graph/Graph'
import Map from './Map'
import AnimLoop from './AnimLoop'
import { Random } from'./Generator/Generators'

export default class Main
{
	constructor() {
		let canvas = new Canvas('main-canvas');
		let graph = new Graph();
		let map = new Map(canvas);
		let dijkstra = new DijkstraDraw(undefined, canvas);
		let scroll = new Scroll(canvas);
		let randomGen = new Random(map);
		let animLoop = new AnimLoop();

		randomGen.run();

		map.convertToGraph(graph);
		dijkstra.selectGraph(graph);

		let index = 0;
		let speed = 1 / 0.2;

		animLoop.loop = () => {
			index += 1;

			if (index % speed === 0) {
				dijkstra.step();
			}

			map.draw();
			dijkstra.draw();
		};

		animLoop.run();
	}
}


window.onload = function () {
	let main = new Main();
};
