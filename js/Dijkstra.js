class Dijkstra
{
	_lowestVertex() {
		var lowest;

		this.testing.forEach(function (node) {
			node.edges.forEach(function (edge) {
				
			});
		});
	}

	_convertStringToNode(string) {
		return this.graph.nodes[string];
	}

	_convertAllToNodes(nodes) {
		var self = this;

		nodes.forEach(function (node) {
			node = self._convertStringToNode(node);
		});
	}

	_findAdjacentNodes() {
		var self = this;

		this.complete.forEach(function (node) {
			node.edges.forEach(function (edge) {
				var nodeObj = self._convertStringToNode(edge.endNode);

				if (self.testing.indexOf(nodeObj) === -1) {
					self.testing.push(nodeObj);
				}
			});
		});
	}


	selectGraph(graph) {
		this.graph = graph;
	}

	run() {
		this.complete = this.graph.startNodes.slice();

		this._lowestVertex();
		this._findAdjacentNodes();

		console.log(this.testing);
	}


	constructor(graph) {
		this.complete = [];
		this.testing = [];
		this.graph = {};

		this.obj = function () {
			this.permanentLabel;
			this.temporaryLabel;
			this.smallestValue;
		};

		this.selectGraph(graph);
	}
}