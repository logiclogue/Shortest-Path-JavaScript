class Dijkstra
{
	_forEachNode(callback) {
		this.graph.nodes.forEach(callback);
	}

	_lowestVertex() {
		var lowest;

		this.testing.forEach(function (node) {
			node.edges.forEach(function (edge) {
				
			});
		});
	}


	selectGraph(graph) {
		this.graph = graph;

		this.forEachNode(function (node) {
			node.dijkstra = this.obj;
		});
	}

	run() {
		this._lowestVertex();
	}


	constructor() {
		this.complete = [];
		this.testing = [];
		this.graph = {};

		this.obj = function () {
			this.permanentLabel;
			this.temporaryLabel;
			this.smallestValue;
		};
	}
}