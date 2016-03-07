class Canvas {
	static init() {
		this.c = document.getElementById('main-canvas');
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.width = this.c.width;
		this.height = this.c.height;
	}
}
class Dijkstra {}
class Graph {
	addNode(name, edges) {
		this.nodes[name] = {
			val: 1,
			edges: edges || {}
		};
	}

	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}
}
class Main {
	constructor() {
		var graph = new Graph();

		graph.addNode('Jordan', [{ node: '1', distance: 10 }, { node: '2', distance: 10 }]);

		console.log(graph.nodes);

		Canvas.init();
	}
}

window.onload = function () {
	var main = new Main();
};
class Map {
	constructor() {}
}