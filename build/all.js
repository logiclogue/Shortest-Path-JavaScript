class Canvas {
	static drawSquare(x, y, colour) {
		var posX = this.posX * this.scaleFactor;
		var posY = this.posY * this.scaleFactor;
		x = Math.round(x * this.scaleFactor);
		y = Math.round(y * this.scaleFactor);

		this.ctx.fillStyle = colour || this.colours.theDefault;
		this.ctx.fillRect(x + posX, y + posY, this.scaleFactor, this.scaleFactor);
	}

	static drawLine(x1, y1, x2, y2) {
		var x1 = x1 * this.scaleFactor + this.scaleFactor / 2;
		var x2 = x2 * this.scaleFactor + this.scaleFactor / 2;
		var y1 = y1 * this.scaleFactor + this.scaleFactor / 2;
		var y2 = y2 * this.scaleFactor + this.scaleFactor / 2;

		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineWidth = this.scaleFactor / 5;
		this.ctx.lineCap = 'round';
		this.ctx.stroke();
	}

	static clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	static init() {
		this.c = document.getElementById('main-canvas');
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.width = this.c.width;
		this.height = this.c.height;

		this.scaleFactor = 40;
		this.posX = 0;
		this.posY = 0;

		this.colours = {
			start: '#00FF00',
			end: '#FF0000',
			theDefault: '#DDDDDD',
			wall: '#000000'
		};
	}
}
class Dijkstra {
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
class Edge {
    constructor(endNode, val) {
        this.endNode = endNode;
        this.val = val;
    }
}
class Graph {
	addNode(name, edges) {
		var node = new Node(name);

		node.edges = edges;
		this.nodes[name] = node;

		return node;
	}

	addStartNode(name) {
		this.startNodes.push(this.nodes[name]);
	}

	addEndNode(name) {
		this.endNodes.push(this.nodes[name]);
	}

	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}
}
class Main {
	constructor() {
		Canvas.init();

		var graph = new Graph();
		var map = new Map();
		var dijkstra = new Dijkstra(graph);

		map.world[3][3] = 1;

		map.convertToGraph(graph);

		graph.addStartNode('0,0');
		graph.addEndNode('9,9');

		map.drawOnCanvas();
		Canvas.drawLine(0, 0, 1, 1);

		dijkstra.run();
	}
}

window.onload = function () {
	var main = new Main();
};
class Map {
	_populateMap() {
		/*
   * 0 = Nothing
   * 1 = Wall
   * 2 = Start
   * 3 = End
   */

		for (var x = 0; x < this.maxLength; x += 1) {
			this.world[x] = [];

			for (var y = 0; y < this.maxLength; y += 1) {
				this.world[x][y] = 0;
			}
		}

		this.world[0][0] = 2;
		this.world[this.maxLength - 1][this.maxLength - 1] = 3;
	}

	_forEachCell(callback) {
		var max = this.maxLength;

		for (var x = 0; x < max; x += 1) {
			for (var y = 0; y < max; y += 1) {
				callback(x, y);
			}
		}
	}

	drawOnCanvas() {
		var colourIndex = this.colourIndex;

		Canvas.clear();

		this.world.forEach(function (row, x) {
			row.forEach(function (cell, y) {
				Canvas.drawSquare(x, y, colourIndex[cell]);
			});
		});
	}

	convertToGraph(graph) {
		var self = this;

		this._forEachCell(function (x, y) {
			var cell = self.world[x][y];
			var edges = [];

			for (var x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (var y1 = y - 1; y1 < y + 2; y1 += 1) {
					try {
						if ((x1 !== x || y1 !== y) && self.world[x1][y1] !== 1 && x1 >= 0 && y1 >= 0 && x1 < self.maxLength && y1 < self.maxLength) {
							var distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

							edges.push(new Edge(x1 + ',' + y1, distance));
						}
					} catch (e) {}
				}
			}

			// If not wall
			if (cell !== 1) {
				var node = graph.addNode(x + ',' + y, edges);
			}
		});
	}

	constructor() {
		this.world = [];
		this.maxLength = 10;
		this.colourIndex = [Canvas.colours.theDefault, Canvas.colours.wall, Canvas.colours.start, Canvas.colours.end];

		this._populateMap();
	}
}
class Node {
    addEdge(startNode, endNode, value) {
        this.edges.push(new Edge(endNode, value));
    }

    constructor(name) {
        this.theName = name;
        this.edges = {};
    }
}