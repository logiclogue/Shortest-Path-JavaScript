import PathAlgorithm from './PathAlgorithm'
import Canvas from './Canvas'

export default class Dijkstra extends PathAlgorithm
{
	constructor(graph) {
		super(graph);

		this.algorithmName = 'Dijkstra';
		this.complete = [];
		this.testing = [];
		this.endNode;
		this.NodeObj = function () {
			this.shortestDistance;
			this.previousNode;
		};
	}


	run() {
		var self = this;
		this.complete = this.graph.startNodes.slice();

		this._addWorkingObj(this.complete);
		setInterval(function () {
			self.step();
		}, 1);
	}

	step() {
		if (!this._foundEndNode()) {
			this._findAdjacentNodes();
			this._draw();
			this._lowestVertex();
		}
		else {
			this._backTrack();
		}
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

	_drawNode(node, colour) {
		var coords = node.theName.split(',');

		Canvas.drawSquare(coords[0], coords[1], colour);
	}

	_backTrack() {
		var coordsA = this.endNode.theName.split(',');
		var coordsB;

		this.endNode = this.endNode.working.previousNode;
		coordsB = this.endNode.theName.split(',');

		Canvas.drawLine(coordsA[0], coordsA[1], coordsB[0], coordsB[1]);
	}

	_foundEndNode() {
		var self = this;
		var hasFound = false;

		this.complete.forEach(function (node) {
			if (self.graph.endNodes.indexOf(node) !== -1) {
				self.endNode = self.endNode || node;
				hasFound = true;
			}
		});

		return hasFound;
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

	_addWorkingObj(nodes) {
		var self = this;

		nodes.forEach(function (node) {
			node.working = new self.NodeObj();
			node.working.shortestDistance = 0;
		});
	}

	_convertAllToNodes(nodes) {
		var self = this;

		nodes.forEach(function (node) {
			node = self._convertStringToNode(node);
		});
	}

	_convertStringToNode(string) {
		return this.graph.nodes[string];
	}
}
