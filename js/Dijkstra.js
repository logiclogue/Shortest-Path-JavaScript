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
		this.complete = this.graph.startNodes.slice();

		this._addWorkingObj(this.complete);
		setInterval(() => {
			this.step();
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
		this.testing.forEach((node) => {
			this._drawNode(node, '#00FFFF');
		});

		this.complete.forEach((node) => {
			this._drawNode(node, '#0000FF');
		});
	}

	_drawNode(node, colour) {
		let coords = node.theName.split(',');

		Canvas.drawSquare(coords[0], coords[1], colour);
	}

	_backTrack() {
		let coordsA = this.endNode.theName.split(',');
		let coordsB;

		this.endNode = this.endNode.working.previousNode;
		coordsB = this.endNode.theName.split(',');

		Canvas.drawLine(coordsA[0], coordsA[1], coordsB[0], coordsB[1]);
	}

	_foundEndNode() {
		let hasFound = false;

		this.complete.forEach((node) => {
			if (this.graph.endNodes.indexOf(node) !== -1) {
				this.endNode = this.endNode || node;
				hasFound = true;
			}
		});

		return hasFound;
	}

	_findAdjacentNodes() {
		this.complete.forEach((node) => {
			node.edges.forEach((edge) => {
				let nodeObj = this._convertStringToNode(edge.endNode);
				let newDistance = node.working.shortestDistance + edge.val;

				// Is not in testing array and not in complete array.
				// In other words, if the node hasn't been seen by the algorithm yet.
				if (this.testing.indexOf(nodeObj) === -1 && this.complete.indexOf(nodeObj) === -1) {
					nodeObj.working = new this.NodeObj();
					nodeObj.working.shortestDistance = newDistance;
					nodeObj.working.previousNode = node;

					this.testing.push(nodeObj);
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
		let lowest;

		this.testing.forEach((node) => {
			lowest = lowest || node;

			if (node.working.shortestDistance < lowest.working.shortestDistance) {
				lowest = node;
			}
		});

		this.testing.splice(this.testing.indexOf(lowest), 1);
		this.complete.push(lowest);
	}

	_addWorkingObj(nodes) {
		nodes.forEach((node) => {
			node.working = new this.NodeObj();
			node.working.shortestDistance = 0;
		});
	}

	_convertAllToNodes(nodes) {
		nodes.forEach((node) => {
			node = this._convertStringToNode(node);
		});
	}

	_convertStringToNode(string) {
		return this.graph.nodes[string];
	}
}
