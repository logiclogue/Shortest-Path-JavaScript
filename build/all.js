(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
	function Canvas() {
		_classCallCheck(this, Canvas);
	}

	_createClass(Canvas, null, [{
		key: 'init',
		value: function init() {
			this.c = document.getElementById('main-canvas');
			this.c.width = window.innerWidth;
			this.c.height = window.innerHeight;
			this.ctx = this.c.getContext('2d');
			this.width = this.c.width;
			this.height = this.c.height;

			this.scaleFactor = 50;
			this.posX = 0;
			this.posY = 0;

			this.colours = {
				start: '#00FF00',
				end: '#FF0000',
				theDefault: '#DDDDDD',
				wall: '#000000'
			};
		}
	}, {
		key: 'drawSquare',
		value: function drawSquare(x, y, colour) {
			var posX = this.posX * this.scaleFactor;
			var posY = this.posY * this.scaleFactor;
			x = Math.round(x * this.scaleFactor);
			y = Math.round(y * this.scaleFactor);

			this.ctx.fillStyle = colour || this.colours.theDefault;
			this.ctx.fillRect(x + posX, y + posY, this.scaleFactor, this.scaleFactor);
		}
	}, {
		key: 'drawLine',
		value: function drawLine(x1, y1, x2, y2) {
			x1 = x1 * this.scaleFactor + this.scaleFactor / 2;
			x2 = x2 * this.scaleFactor + this.scaleFactor / 2;
			y1 = y1 * this.scaleFactor + this.scaleFactor / 2;
			y2 = y2 * this.scaleFactor + this.scaleFactor / 2;

			this.ctx.beginPath();
			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2);
			this.ctx.lineWidth = this.scaleFactor / 5;
			this.ctx.lineCap = 'round';
			this.ctx.stroke();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.clearRect(0, 0, this.c.width, this.c.height);
		}
	}]);

	return Canvas;
}();

exports.default = Canvas;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./Edge":2,"./Node":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Dijkstra = require('./PathFinder/Dijkstra');

var _Dijkstra2 = _interopRequireDefault(_Dijkstra);

var _Canvas = require('./Canvas/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Graph = require('./Graph/Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
	_classCallCheck(this, Main);

	_Canvas2.default.init();

	var graph = new _Graph2.default();
	var map = new _Map2.default();
	var dijkstra = new _Dijkstra2.default(graph);

	for (var x = 0; x < map.maxLength; x += 1) {
		for (var y = 0; y < map.maxLength; y += 1) {
			if (Math.random() < 0.5) {
				map.world[x][y] = 1;
			}
		}
	}

	for (var i = 0; i < Math.floor(Math.random() * 10); i += 1) {
		map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
	}

	map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

	map.convertToGraph(graph);
	map.drawOnCanvas();

	dijkstra.run();
};

exports.default = Main;


window.onload = function () {
	var main = new Main();
};
},{"./Canvas/Canvas":1,"./Graph/Graph":3,"./Map":6,"./PathFinder/Dijkstra":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Edge = require('./Graph/Edge');

var _Edge2 = _interopRequireDefault(_Edge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
	function Map() {
		_classCallCheck(this, Map);

		this.world = [];
		this.maxLength = 20;
		this.colourIndex = [_Canvas2.default.colours.theDefault, _Canvas2.default.colours.wall, _Canvas2.default.colours.start, _Canvas2.default.colours.end];

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
		key: 'drawOnCanvas',
		value: function drawOnCanvas() {
			var colourIndex = this.colourIndex;

			_Canvas2.default.clear();

			this.world.forEach(function (row, x) {
				row.forEach(function (cell, y) {
					_Canvas2.default.drawSquare(x, y, colourIndex[cell]);
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
},{"./Canvas/Canvas":1,"./Graph/Edge":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PathAlgorithm2 = require('./PathAlgorithm');

var _PathAlgorithm3 = _interopRequireDefault(_PathAlgorithm2);

var _Canvas = require('../Canvas/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dijkstra = function (_PathAlgorithm) {
	_inherits(Dijkstra, _PathAlgorithm);

	function Dijkstra(graph) {
		_classCallCheck(this, Dijkstra);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dijkstra).call(this, graph));

		_this.algorithmName = 'Dijkstra';
		_this.complete = graph.startNodes.slice();
		_this.testing = [];
		_this.endNode;
		_this.NodeObj = function () {
			this.shortestDistance;
			this.previousNode;
		};
		return _this;
	}

	_createClass(Dijkstra, [{
		key: 'run',
		value: function run() {
			var _this2 = this;

			this.complete = this.graph.startNodes.slice();

			this._addWorkingObj(this.complete);
			setInterval(function () {
				_this2.step();
				_this2.draw();
			}, 1);
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
		key: 'draw',
		value: function draw() {
			var _this3 = this;

			this.testing.forEach(function (node) {
				_this3._drawNode(node, '#00FFFF');
			});

			this.complete.forEach(function (node) {
				_this3._drawNode(node, '#0000FF');
			});

			this.path.route.forEach(function (node) {
				_Canvas2.default.drawLine(node.x1, node.y1, node.x2, node.y2);
			});
		}
	}, {
		key: '_drawNode',
		value: function _drawNode(node, colour) {
			var coords = node.theName.split(',');

			_Canvas2.default.drawSquare(coords[0], coords[1], colour);
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
			var _this4 = this;

			var hasFound = false;

			this.complete.forEach(function (node) {
				if (_this4.graph.endNodes.indexOf(node) !== -1) {
					_this4.endNode = _this4.endNode || node;
					hasFound = true;
				}
			});

			return hasFound;
		}
	}, {
		key: '_findAdjacentNodes',
		value: function _findAdjacentNodes() {
			var _this5 = this;

			this.complete.forEach(function (node) {
				node.edges.forEach(function (edge) {
					var nodeObj = _this5._convertStringToNode(edge.endNode);
					var newDistance = node.working.shortestDistance + edge.val;

					// Is not in testing array and not in complete array.
					// In other words, if the node hasn't been seen by the algorithm yet.
					if (_this5.testing.indexOf(nodeObj) === -1 && _this5.complete.indexOf(nodeObj) === -1) {
						nodeObj.working = new _this5.NodeObj();
						nodeObj.working.shortestDistance = newDistance;
						nodeObj.working.previousNode = node;

						_this5.testing.push(nodeObj);
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
			var _this6 = this;

			nodes.forEach(function (node) {
				node.working = new _this6.NodeObj();
				node.working.shortestDistance = 0;
			});
		}
	}, {
		key: '_convertAllToNodes',
		value: function _convertAllToNodes(nodes) {
			var _this7 = this;

			nodes.forEach(function (node) {
				node = _this7._convertStringToNode(node);
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
},{"../Canvas/Canvas":1,"./PathAlgorithm":9}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
    }, {
        key: 'draw',
        value: function draw() {}
    }]);

    return PathAlgorithm;
}();

exports.default = PathAlgorithm;
},{"./Path":8}]},{},[5]);
