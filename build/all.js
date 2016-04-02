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

		this.scaleFactor = 10;
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

	_backTrack() {
		var coordsA = this.endNode.theName.split(',');
		var coordsB;

		this.endNode = this.endNode.working.previousNode;
		coordsB = this.endNode.theName.split(',');

		Canvas.drawLine(coordsA[0], coordsA[1], coordsB[0], coordsB[1]);
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
			if (!self._foundEndNode()) {
				self._findAdjacentNodes();
				self._draw();
				self._lowestVertex();
			} else {
				self._backTrack();
			}
		}, 1);
	}

	constructor(graph) {
		this.complete = [];
		this.testing = [];
		this.graph = {};
		this.endNode;

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

		map.world[0][0] = 2;
		map.world[Math.floor(Math.random() * 100)][Math.floor(Math.random() * 100)] = 3;

		for (var x = 0; x < map.maxLength; x += 1) {
			for (var y = 0; y < map.maxLength; y += 1) {
				if (Math.random() < 0.3) {
					map.world[x][y] = 1;
				}
			}
		}

		map.convertToGraph(graph);
		map.drawOnCanvas();

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

			// Checks every square around the cell
			for (var x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (var y1 = y - 1; y1 < y + 2; y1 += 1) {
					try {
						var isNotCentre = x1 !== x || y1 !== y;
						var isNotWall = self.world[x1][y1] !== 1;
						var isInWorld = x1 >= 0 && y1 >= 0 && x1 < self.maxLength && y1 < self.maxLength;

						if (isNotCentre && isNotWall && isInWorld) {
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

			// If start node
			if (cell === 2) {
				graph.addStartNode(x + ',' + y);
			}
			// If end node
			else if (cell === 3) {
					graph.addEndNode(x + ',' + y);
				}
		});
	}

	constructor() {
		this.world = [];
		this.maxLength = 100;
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