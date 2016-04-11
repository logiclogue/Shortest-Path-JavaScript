(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
	function Canvas(elementId) {
		_classCallCheck(this, Canvas);

		this.c = document.getElementById(elementId);
		this.c.width = window.innerWidth;
		this.c.height = window.innerHeight;
		this.ctx = this.c.getContext('2d');
		this.width = this.c.width;
		this.height = this.c.height;

		this.zoom = 32;
		this.scaleFactor = Math.pow(2, this.zoom);
		this.posX = 0;
		this.posY = 0;

		this.colours = {
			start: '#00FF00',
			end: '#FF0000',
			theDefault: '#DDDDDD',
			wall: '#000000'
		};
	}

	_createClass(Canvas, [{
		key: 'drawSquare',
		value: function drawSquare(x, y, colour) {
			var posX = this.posX * this.scaleFactor;
			var posY = this.posY * this.scaleFactor;
			x *= this.scaleFactor;
			y *= this.scaleFactor;
			var startX = Math.round(x + posX) + this.width / 2;
			var startY = Math.round(y + posY) + this.height / 2;
			var width = this.scaleFactor;
			var height = this.scaleFactor;

			this.ctx.fillStyle = colour || this.colours.theDefault;
			this.ctx.fillRect(startX, startY, width, height);
		}
	}, {
		key: 'drawLine',
		value: function drawLine(x1, y1, x2, y2) {
			var posX = this.posX * this.scaleFactor;
			var posY = this.posY * this.scaleFactor;
			x1 = x1 * this.scaleFactor + this.scaleFactor / 2;
			x2 = x2 * this.scaleFactor + this.scaleFactor / 2;
			y1 = y1 * this.scaleFactor + this.scaleFactor / 2;
			y2 = y2 * this.scaleFactor + this.scaleFactor / 2;
			var startX = x1 + posX + this.width / 2;
			var startY = y1 + posY + this.height / 2;
			var endX = x2 + posX + this.width / 2;
			var endY = y2 + posY + this.height / 2;

			this.ctx.beginPath();
			this.ctx.moveTo(startX, startY);
			this.ctx.lineTo(endX, endY);
			this.ctx.lineWidth = this.scaleFactor / 5;
			this.ctx.lineCap = 'round';
			this.ctx.stroke();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.clearRect(0, 0, this.c.width, this.c.height);
		}
	}, {
		key: 'zoom',
		set: function set(value) {
			debugger;
			this.scaleFactor = Math.pow(2, value);

			return value;
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function () {
    function Scroll(canvas, element) {
        _classCallCheck(this, Scroll);

        this.canvas = canvas;
        this.element = canvas.c || element;
        this.startX = 0;
        this.startY = 0;
        this.isMoving = false;

        this.setEvents();
    }

    _createClass(Scroll, [{
        key: 'setEvents',
        value: function setEvents() {
            this.element.addEventListener('mousedown', this._mousedown.bind(this));
            this.element.addEventListener('mouseup', this._mouseup.bind(this));
            this.element.addEventListener('mousemove', this._mousemove.bind(this));
            this.element.addEventListener('wheel', this._zoom.bind(this));
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents() {
            this.element.removeEventListener('mousedown', this._mousedown.bind(this));
            this.element.removeEventListener('mouseup', this._mouseup.bind(this));
            this.element.removeEventListener('mouseMove', this._mousemove.bind(this));
            this.element.removeEventListener('wheel', this._zoom.bind(this));
        }
    }, {
        key: '_mousedown',
        value: function _mousedown(e) {
            this.isMoving = true;
            this.startX = e.pageX;
            this.startY = e.pageY;
        }
    }, {
        key: '_mouseup',
        value: function _mouseup(e) {
            this.isMoving = false;
        }
    }, {
        key: '_mousemove',
        value: function _mousemove(e) {
            if (this.isMoving) {
                this.canvas.posX -= (this.startX - e.pageX) / this.canvas.zoom;
                this.canvas.posY -= (this.startY - e.pageY) / this.canvas.zoom;
            }

            this.startX = e.pageX;
            this.startY = e.pageY;
        }
    }, {
        key: '_zoom',
        value: function _zoom(e) {
            e.preventDefault();

            console.log(this.canvas.zoom);
            this.canvas.zoom = this.canvas.zoom + e.wheelDelta;
            this.canvas.zoom = Math.round(this.canvas.zoom);
        }
    }]);

    return Scroll;
}();

exports.default = Scroll;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = function Edge(endNode, val) {
    _classCallCheck(this, Edge);

    this.endNode = endNode;
    this.val = val;
};

exports.default = Edge;
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Edge = require('./Edge');

var _Edge2 = _interopRequireDefault(_Edge);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Graph = function () {
	function Graph() {
		_classCallCheck(this, Graph);

		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}

	_createClass(Graph, [{
		key: 'addNode',
		value: function addNode(name, edges) {
			var node = new _Node2.default(name);

			node.edges = edges;
			this.nodes[name] = node;

			return node;
		}
	}, {
		key: 'addStartNode',
		value: function addStartNode(name) {
			this.startNodes.push(this.nodes[name]);
		}
	}, {
		key: 'addEndNode',
		value: function addEndNode(name) {
			this.endNodes.push(this.nodes[name]);
		}
	}]);

	return Graph;
}();

exports.default = Graph;
},{"./Edge":3,"./Node":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node(name) {
        _classCallCheck(this, Node);

        this.theName = name;
        this.edges = {};
    }

    _createClass(Node, [{
        key: "addEdge",
        value: function addEdge(startNode, endNode, value) {
            this.edges.push(new Edge(endNode, value));
        }
    }]);

    return Node;
}();

exports.default = Node;
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _DijkstraDraw = require('./PathFinder/DijkstraDraw');

var _DijkstraDraw2 = _interopRequireDefault(_DijkstraDraw);

var _Canvas = require('./Canvas/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Scroll = require('./Canvas/Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _Graph = require('./Graph/Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
	_classCallCheck(this, Main);

	var canvas = new _Canvas2.default('main-canvas');
	var graph = new _Graph2.default();
	var map = new _Map2.default(canvas);
	var dijkstra = new _DijkstraDraw2.default(undefined, canvas);
	var scroll = new _Scroll2.default(canvas);

	for (var x = 0; x < map.maxLength; x += 1) {
		for (var y = 0; y < map.maxLength; y += 1) {
			if (Math.random() < 0.5) {
				map.world[x][y] = 1;
			}
		}
	}

	map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
	map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

	map.convertToGraph(graph);
	dijkstra.selectGraph(graph);

	setInterval(function () {
		dijkstra.step();
		map.draw();
		dijkstra.draw();
	}, 1);
};

exports.default = Main;


window.onload = function () {
	var main = new Main();
};
},{"./Canvas/Canvas":1,"./Canvas/Scroll":2,"./Graph/Graph":4,"./Map":7,"./PathFinder/DijkstraDraw":9}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Edge = require('./Graph/Edge');

var _Edge2 = _interopRequireDefault(_Edge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
	function Map(canvas) {
		_classCallCheck(this, Map);

		this.canvas = canvas;
		this.world = [];
		this.maxLength = 20;
		this.colourIndex = [this.canvas.colours.theDefault, this.canvas.colours.wall, this.canvas.colours.start, this.canvas.colours.end];

		this._populateMap();
	}

	_createClass(Map, [{
		key: 'convertToGraph',
		value: function convertToGraph(graph) {
			var _this = this;

			this._forEachCell(function (x, y) {
				var cell = _this.world[x][y];
				var edges = [];

				// Checks every square around the cell
				for (var x1 = x - 1; x1 < x + 2; x1 += 1) {
					for (var y1 = y - 1; y1 < y + 2; y1 += 1) {
						try {
							var isNotCentre = x1 !== x || y1 !== y;
							var isNotWall = _this.world[x1][y1] !== 1;
							var isInWorld = x1 >= 0 && y1 >= 0 && x1 < _this.maxLength && y1 < _this.maxLength;

							if (isNotCentre && isNotWall && isInWorld) {
								var distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

								edges.push(new _Edge2.default(x1 + ',' + y1, distance));
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
	}, {
		key: 'draw',
		value: function draw() {
			var _this2 = this;

			var colourIndex = this.colourIndex;

			this.canvas.clear();

			this.world.forEach(function (row, x) {
				row.forEach(function (cell, y) {
					_this2.canvas.drawSquare(x, y, colourIndex[cell]);
				});
			});
		}
	}, {
		key: '_forEachCell',
		value: function _forEachCell(callback) {
			var max = this.maxLength;

			for (var x = 0; x < max; x += 1) {
				for (var y = 0; y < max; y += 1) {
					callback(x, y);
				}
			}
		}
	}, {
		key: '_populateMap',
		value: function _populateMap() {
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
	}]);

	return Map;
}();

exports.default = Map;
},{"./Graph/Edge":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _PathAlgorithm2 = require('./PathAlgorithm');

var _PathAlgorithm3 = _interopRequireDefault(_PathAlgorithm2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dijkstra = function (_PathAlgorithm) {
	_inherits(Dijkstra, _PathAlgorithm);

	function Dijkstra(graph, canvas) {
		_classCallCheck(this, Dijkstra);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dijkstra).call(this, graph));

		_this.complete;
		_this.testing = [];
		_this.algorithmName = 'Dijkstra';
		_this.endNode;
		_this.NodeObj = function () {
			this.shortestDistance;
			this.previousNode;
		};
		return _this;
	}

	_createClass(Dijkstra, [{
		key: 'selectGraph',
		value: function selectGraph(graph) {
			if (typeof graph === 'undefined') {
				return;
			}

			this.complete = graph.startNodes.slice();

			this._addWorkingObj(this.complete);
			_get(Object.getPrototypeOf(Dijkstra.prototype), 'selectGraph', this).call(this, graph);
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this._foundEndNode() && !this.isComplete) {
				this._findAdjacentNodes();
				this._lowestVertex();
			} else if (!this.isComplete) {
				this._backTrack();
			}
		}
	}, {
		key: '_backTrack',
		value: function _backTrack() {
			var coordsA = this.endNode.theName.split(',');
			var coordsB = void 0;

			// Check to see if found an end node
			if (this.graph.startNodes.indexOf(this.endNode) !== -1) {
				this.isComplete = true;
				this.foundPath = true;

				return;
			}

			this.endNode = this.endNode.working.previousNode;
			coordsB = this.endNode.theName.split(',');

			this.path.addLine(coordsA[0], coordsA[1], coordsB[0], coordsB[1]);
		}
	}, {
		key: '_foundEndNode',
		value: function _foundEndNode() {
			var _this2 = this;

			var hasFound = false;

			this.complete.forEach(function (node) {
				if (_this2.graph.endNodes.indexOf(node) !== -1) {
					_this2.endNode = _this2.endNode || node;
					hasFound = true;
				}
			});

			return hasFound;
		}
	}, {
		key: '_findAdjacentNodes',
		value: function _findAdjacentNodes() {
			var _this3 = this;

			this.complete.forEach(function (node) {
				node.edges.forEach(function (edge) {
					var nodeObj = _this3._convertStringToNode(edge.endNode);
					var newDistance = node.working.shortestDistance + edge.val;

					// Is not in testing array and not in complete array.
					// In other words, if the node hasn't been seen by the algorithm yet.
					if (_this3.testing.indexOf(nodeObj) === -1 && _this3.complete.indexOf(nodeObj) === -1) {
						nodeObj.working = new _this3.NodeObj();
						nodeObj.working.shortestDistance = newDistance;
						nodeObj.working.previousNode = node;

						_this3.testing.push(nodeObj);
					}
					// Found shorter distance
					else if (nodeObj.working.shortestDistance > newDistance) {
							nodeObj.working.shortestDistance = newDistance;
							nodeObj.working.previousNode = node;
						}
				});
			});
		}
	}, {
		key: '_lowestVertex',
		value: function _lowestVertex() {
			var lowest = void 0;

			if (this.testing.length === 0) {
				this.isComplete = true;

				return;
			}

			this.testing.forEach(function (node) {
				lowest = lowest || node;

				if (node.working.shortestDistance < lowest.working.shortestDistance) {
					lowest = node;
				}
			});

			this.testing.splice(this.testing.indexOf(lowest), 1);
			this.complete.push(lowest);
		}
	}, {
		key: '_addWorkingObj',
		value: function _addWorkingObj(nodes) {
			var _this4 = this;

			nodes.forEach(function (node) {
				node.working = new _this4.NodeObj();
				node.working.shortestDistance = 0;
			});
		}
	}, {
		key: '_convertAllToNodes',
		value: function _convertAllToNodes(nodes) {
			var _this5 = this;

			nodes.forEach(function (node) {
				node = _this5._convertStringToNode(node);
			});
		}
	}, {
		key: '_convertStringToNode',
		value: function _convertStringToNode(string) {
			return this.graph.nodes[string];
		}
	}]);

	return Dijkstra;
}(_PathAlgorithm3.default);

exports.default = Dijkstra;
},{"./PathAlgorithm":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dijkstra2 = require('./Dijkstra');

var _Dijkstra3 = _interopRequireDefault(_Dijkstra2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DijkstraDraw = function (_Dijkstra) {
	_inherits(DijkstraDraw, _Dijkstra);

	function DijkstraDraw(graph, canvas) {
		_classCallCheck(this, DijkstraDraw);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DijkstraDraw).call(this, graph));

		_this.canvas = canvas || {};
		return _this;
	}

	_createClass(DijkstraDraw, [{
		key: 'draw',
		value: function draw() {
			var _this2 = this;

			this.testing.forEach(function (node) {
				_this2._drawNode(node, '#00FFFF');
			});

			this.complete.forEach(function (node) {
				_this2._drawNode(node, '#0000FF');
			});

			this.graph.startNodes.forEach(function (node) {
				_this2._drawNode(node, _this2.canvas.colours.start);
			});

			this.graph.endNodes.forEach(function (node) {
				_this2._drawNode(node, _this2.canvas.colours.end);
			});

			this.path.route.forEach(function (node) {
				_this2.canvas.drawLine(node.x1, node.y1, node.x2, node.y2);
			});
		}
	}, {
		key: '_drawNode',
		value: function _drawNode(node, colour) {
			var coords = node.theName.split(',');

			this.canvas.drawSquare(coords[0], coords[1], colour);
		}
	}]);

	return DijkstraDraw;
}(_Dijkstra3.default);

exports.default = DijkstraDraw;
},{"./Dijkstra":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
    function Path() {
        _classCallCheck(this, Path);

        this.route = [];
    }

    _createClass(Path, [{
        key: "addLine",
        value: function addLine(x1, y1, x2, y2) {
            this.route.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            });
        }
    }]);

    return Path;
}();

exports.default = Path;
},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Path = require('./Path');

var _Path2 = _interopRequireDefault(_Path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathAlgorithm = function () {
    function PathAlgorithm(graph) {
        _classCallCheck(this, PathAlgorithm);

        this.graph = {};
        this.algorithmName = '';
        this.path = new _Path2.default();
        this.isComplete = false;
        this.foundPath = false;

        this.selectGraph(graph);
    }

    _createClass(PathAlgorithm, [{
        key: 'selectGraph',
        value: function selectGraph(graph) {
            this.graph = graph || {};
        }
    }, {
        key: 'step',
        value: function step() {}
    }]);

    return PathAlgorithm;
}();

exports.default = PathAlgorithm;
},{"./Path":10}]},{},[6]);
