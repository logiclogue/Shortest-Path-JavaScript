import DijkstraDraw from './PathFinder/DijkstraDraw'
import Canvas from './Canvas/Canvas'
import Toolbar from './Toolbar/Toolbar'
import Graph from './Graph/Graph'
import Map from './Map'
import AnimLoop from './AnimLoop'
import { Random } from'./Generator/Generators'


export let canvas;
export let map;
export let animLoop;

export default class Main
{
	constructor() {
		canvas = new Canvas('main-canvas');
		let graph = new Graph();
		map = new Map(canvas);
		let dijkstra = new DijkstraDraw(undefined, canvas);
		let randomGen = new Random(map);
		animLoop = new AnimLoop();
		let toolbar = new Toolbar();

		randomGen.run();

		map.convertToGraph(graph);
		dijkstra.selectGraph(graph);

		let index = 0;
		let speed = 1;

		animLoop.updateFunction = () => {
			index += 1;

			if (index % speed === 0) {
				dijkstra.step();
			}
		};

		animLoop.drawFunction = () => {
			map.draw();
			dijkstra.draw();
		};

		animLoop.run();
	}
}


window.onload = function () {
	let main = new Main();
};
