class Dijkstra
{
	_lowestVertex() {
		var lowest;

		this.testing.forEach(function (node) {
			lowest = lowest || node;

			if (node.working.shortestDistance < lowest.working.shortestDistance) {
				lowest = node;
			}
		});

		this.testing.splice(this.testing.indexOf(lowest), 1);
		this.complete.push(lowest);
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

	_addWorkingObj(nodes) {
		var self = this;

		nodes.forEach(function (node) {
			node.working = new self.NodeObj();
			node.working.shortestDistance = 0;
		});
	}

	_findAdjacentNodes() {
		var self = this;

		this.complete.forEach(function (node) {
			node.edges.forEach(function (edge) {
				var nodeObj = self._convertStringToNode(edge.endNode);
				var newDistance = node.working.shortestDistance + edge.val;

				// Is not in testing array and not in complete array.
				// In other words, if the node hasn't been seen by the algorithm yet.
				if (self.testing.indexOf(nodeObj) === -1 && self.complete.indexOf(nodeObj) === -1) {
					nodeObj.working = new self.NodeObj();
					nodeObj.working.shortestDistance = newDistance;
					nodeObj.working.previousNode = node;

					self.testing.push(nodeObj);
				}
				// Found shorter distance
				else if (nodeObj.working.shortestDistance > newDistance) {
					nodeObj.working.shortestDistance = newDistance;
					nodeObj.working.previousNode = node;
				}
			});
		});
	}

	_drawNode(node, colour) {
		var coords = node.theName.split(',');

		Canvas.drawSquare(coords[0], coords[1], colour);
	}

	_draw() {
		var self = this;

		this.testing.forEach(function (node) {
			self._drawNode(node, '#00FFFF');
		});

		this.complete.forEach(function (node) {
			self._drawNode(node, '#0000FF');
		});
	}


	selectGraph(graph) {
		this.graph = graph;
	}

	run() {
		var self = this;
		this.complete = this.graph.startNodes.slice();

		this._addWorkingObj(this.complete);

		setInterval(function () {
			self._findAdjacentNodes();
			self._lowestVertex();
			self._draw();
		}, 100);
	}


	constructor(graph) {
		this.complete = [];
		this.testing = [];
		this.graph = {};

		this.NodeObj = function () {
			this.shortestDistance;
			this.previousNode;
		};

		this.selectGraph(graph);
	}
}