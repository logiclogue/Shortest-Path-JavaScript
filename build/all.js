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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PathAlgorithm2 = require('./PathAlgorithm');

var _PathAlgorithm3 = _interopRequireDefault(_PathAlgorithm2);

var _Canvas = require('./Canvas');

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
		_this.complete = [];
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
			var self = this;
			this.complete = this.graph.startNodes.slice();

			this._addWorkingObj(this.complete);
			setInterval(function () {
				self.step();
			}, 1);
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this._foundEndNode()) {
				this._findAdjacentNodes();
				this._draw();
				this._lowestVertex();
			} else {
				this._backTrack();
			}
		}
	}, {
		key: '_draw',
		value: function _draw() {
			var self = this;

			this.testing.forEach(function (node) {
				self._drawNode(node, '#00FFFF');
			});

			this.complete.forEach(function (node) {
				self._drawNode(node, '#0000FF');
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
			var coordsB;

			this.endNode = this.endNode.working.previousNode;
			coordsB = this.endNode.theName.split(',');

			_Canvas2.default.drawLine(coordsA[0], coordsA[1], coordsB[0], coordsB[1]);
		}
	}, {
		key: '_foundEndNode',
		value: function _foundEndNode() {
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
	}, {
		key: '_findAdjacentNodes',
		value: function _findAdjacentNodes() {
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
	}, {
		key: '_lowestVertex',
		value: function _lowestVertex() {
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
	}, {
		key: '_addWorkingObj',
		value: function _addWorkingObj(nodes) {
			var self = this;

			nodes.forEach(function (node) {
				node.working = new self.NodeObj();
				node.working.shortestDistance = 0;
			});
		}
	}, {
		key: '_convertAllToNodes',
		value: function _convertAllToNodes(nodes) {
			var self = this;

			nodes.forEach(function (node) {
				node = self._convertStringToNode(node);
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

},{"./Canvas":1,"./PathAlgorithm":8}],3:[function(require,module,exports){
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

},{"./Edge":3,"./Node":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Dijkstra = require('./Dijkstra');

var _Dijkstra2 = _interopRequireDefault(_Dijkstra);

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Graph = require('./Graph');

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

	map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 2;
	map.world[Math.floor(Math.random() * map.maxLength)][Math.floor(Math.random() * map.maxLength)] = 3;

	map.convertToGraph(graph);
	map.drawOnCanvas();

	dijkstra.run();
};

exports.default = Main;


window.onload = function () {
	var main = new Main();
};

},{"./Canvas":1,"./Dijkstra":2,"./Graph":4,"./Map":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Edge = require('./Edge');

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

},{"./Canvas":1,"./Edge":3}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PathAlgorithm = function () {
    function PathAlgorithm(graph) {
        _classCallCheck(this, PathAlgorithm);

        this.graph = {};
        this.algorithmName = '';

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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9DYW52YXMuanMiLCJqcy9EaWprc3RyYS5qcyIsImpzL0VkZ2UuanMiLCJqcy9HcmFwaC5qcyIsImpzL01haW4uanMiLCJqcy9NYXAuanMiLCJqcy9Ob2RlLmpzIiwianMvUGF0aEFsZ29yaXRobS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUI7Ozs7Ozs7eUJBRU47QUFDYixRQUFLLENBQUwsR0FBUyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBVCxDQURhO0FBRWIsUUFBSyxDQUFMLENBQU8sS0FBUCxHQUFlLE9BQU8sVUFBUCxDQUZGO0FBR2IsUUFBSyxDQUFMLENBQU8sTUFBUCxHQUFnQixPQUFPLFdBQVAsQ0FISDtBQUliLFFBQUssR0FBTCxHQUFXLEtBQUssQ0FBTCxDQUFPLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWCxDQUphO0FBS2IsUUFBSyxLQUFMLEdBQWEsS0FBSyxDQUFMLENBQU8sS0FBUCxDQUxBO0FBTWIsUUFBSyxNQUFMLEdBQWMsS0FBSyxDQUFMLENBQU8sTUFBUCxDQU5EOztBQVFiLFFBQUssV0FBTCxHQUFtQixFQUFuQixDQVJhO0FBU2IsUUFBSyxJQUFMLEdBQVksQ0FBWixDQVRhO0FBVWIsUUFBSyxJQUFMLEdBQVksQ0FBWixDQVZhOztBQVliLFFBQUssT0FBTCxHQUFlO0FBQ2QsV0FBTyxTQUFQO0FBQ0EsU0FBSyxTQUFMO0FBQ0EsZ0JBQVksU0FBWjtBQUNBLFVBQU0sU0FBTjtJQUpELENBWmE7Ozs7NkJBcUJJLEdBQUcsR0FBRyxRQUFRO0FBQy9CLE9BQUksT0FBTyxLQUFLLElBQUwsR0FBWSxLQUFLLFdBQUwsQ0FEUTtBQUUvQixPQUFJLE9BQU8sS0FBSyxJQUFMLEdBQVksS0FBSyxXQUFMLENBRlE7QUFHL0IsT0FBSSxLQUFLLEtBQUwsQ0FBVyxJQUFJLEtBQUssV0FB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Ozs7Ozs7O0lDQUE7QUFFakIsYUFGaUIsYUFFakIsQ0FBWSxLQUFaLEVBQW1COzhCQUZGLGVBRUU7O0FBQ3JCLGFBQUssS0FBTCxHQUFhLEVBQWIsQ0FEcUI7QUFFZixhQUFLLGFBQUwsR0FBcUIsRUFBckIsQ0FGZTs7QUFJZixhQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFKZTtLQUFuQjs7aUJBRmlCOztvQ0FVTCxPQUFPO0FBQ2YsaUJBQUssS0FBTCxHQUFhLFNBQVMsRUFBVCxDQURFOzs7OytCQUlaOzs7V0FkVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNcbntcblx0c3RhdGljIGluaXQoKSB7XG5cdFx0dGhpcy5jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY2FudmFzJyk7XG5cdFx0dGhpcy5jLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5jLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLmN0eCA9IHRoaXMuYy5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdHRoaXMud2lkdGggPSB0aGlzLmMud2lkdGg7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLmMuaGVpZ2h0O1xuXG5cdFx0dGhpcy5zY2FsZUZhY3RvciA9IDUwO1xuXHRcdHRoaXMucG9zWCA9IDA7XG5cdFx0dGhpcy5wb3NZID0gMDtcblxuXHRcdHRoaXMuY29sb3VycyA9IHtcblx0XHRcdHN0YXJ0OiAnIzAwRkYwMCcsXG5cdFx0XHRlbmQ6ICcjRkYwMDAwJyxcblx0XHRcdHRoZURlZmF1bHQ6ICcjREREREREJyxcblx0XHRcdHdhbGw6ICcjMDAwMDAwJ1xuXHRcdH1cblx0fVxuXG5cblx0c3RhdGljIGRyYXdTcXVhcmUoeCwgeSwgY29sb3VyKSB7XG5cdFx0dmFyIHBvc1ggPSB0aGlzLnBvc1ggKiB0aGlzLnNjYWxlRmFjdG9yO1xuXHRcdHZhciBwb3NZID0gdGhpcy5wb3NZICogdGhpcy5zY2FsZUZhY3Rvcjtcblx0XHR4ID0gTWF0aC5yb3VuZCh4ICogdGhpcy5zY2FsZUZhY3Rvcik7XG5cdFx0eSA9IE1hdGgucm91bmQoeSAqIHRoaXMuc2NhbGVGYWN0b3IpO1xuXG5cdFx0dGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3VyIHx8IHRoaXMuY29sb3Vycy50aGVEZWZhdWx0O1xuXHRcdHRoaXMuY3R4LmZpbGxSZWN0KHggKyBwb3NYLCB5ICsgcG9zWSwgdGhpcy5zY2FsZUZhY3RvciwgdGhpcy5zY2FsZUZhY3Rvcik7XG5cdH1cblxuXHRzdGF0aWMgZHJhd0xpbmUoeDEsIHkxLCB4MiwgeTIpIHtcblx0XHR2YXIgeDEgPSAoeDEgKiB0aGlzLnNjYWxlRmFjdG9yKSArICh0aGlzLnNjYWxlRmFjdG9yIC8gMik7XG5cdFx0dmFyIHgyID0gKHgyICogdGhpcy5zY2FsZUZhY3RvcikgKyAodGhpcy5zY2FsZUZhY3RvciAvIDIpO1xuXHRcdHZhciB5MSA9ICh5MSAqIHRoaXMuc2NhbGVGYWN0b3IpICsgKHRoaXMuc2NhbGVGYWN0b3IgLyAyKTtcblx0XHR2YXIgeTIgPSAoeTIgKiB0aGlzLnNjYWxlRmFjdG9yKSArICh0aGlzLnNjYWxlRmFjdG9yIC8gMik7XG5cblx0XHR0aGlzLmN0eC5iZWdpblBhdGgoKTtcblx0XHR0aGlzLmN0eC5tb3ZlVG8oeDEsIHkxKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oeDIsIHkyKTtcblx0XHR0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnNjYWxlRmFjdG9yIC8gNTtcblx0XHR0aGlzLmN0eC5saW5lQ2FwID0gJ3JvdW5kJztcblx0XHR0aGlzLmN0eC5zdHJva2UoKTtcblx0fVxuXG5cdHN0YXRpYyBjbGVhcigpIHtcblx0XHR0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jLndpZHRoLCB0aGlzLmMuaGVpZ2h0KTtcblx0fVxufVxuIiwiaW1wb3J0IFBhdGhBbGdvcml0aG0gZnJvbSAnLi9QYXRoQWxnb3JpdGhtJ1xuaW1wb3J0IENhbnZhcyBmcm9tICcuL0NhbnZhcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlqa3N0cmEgZXh0ZW5kcyBQYXRoQWxnb3JpdGhtXG57XG5cdGNvbnN0cnVjdG9yKGdyYXBoKSB7XG5cdFx0c3VwZXIoZ3JhcGgpO1xuXG5cdFx0dGhpcy5hbGdvcml0aG1OYW1lID0gJ0RpamtzdHJhJztcblx0XHR0aGlzLmNvbXBsZXRlID0gW107XG5cdFx0dGhpcy50ZXN0aW5nID0gW107XG5cdFx0dGhpcy5lbmROb2RlO1xuXHRcdHRoaXMuTm9kZU9iaiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuc2hvcnRlc3REaXN0YW5jZTtcblx0XHRcdHRoaXMucHJldmlvdXNOb2RlO1xuXHRcdH07XG5cdH1cblxuXG5cdHJ1bigpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dGhpcy5jb21wbGV0ZSA9IHRoaXMuZ3JhcGguc3RhcnROb2Rlcy5zbGljZSgpO1xuXG5cdFx0dGhpcy5fYWRkV29ya2luZ09iaih0aGlzLmNvbXBsZXRlKTtcblx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnN0ZXAoKTtcblx0XHR9LCAxKTtcblx0fVxuXG5cdHN0ZXAoKSB7XG5cdFx0aWYgKCF0aGlzLl9mb3VuZEVuZE5vZGUoKSkge1xuXHRcdFx0dGhpcy5fZmluZEFkamFjZW50Tm9kZXMoKTtcblx0XHRcdHRoaXMuX2RyYXcoKTtcblx0XHRcdHRoaXMuX2xvd2VzdFZlcnRleCgpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuX2JhY2tUcmFjaygpO1xuXHRcdH1cblx0fVxuXG5cblx0X2RyYXcoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0dGhpcy50ZXN0aW5nLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcblx0XHRcdHNlbGYuX2RyYXdOb2RlKG5vZGUsICcjMDBGRkZGJyk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbXBsZXRlLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcblx0XHRcdHNlbGYuX2RyYXdOb2RlKG5vZGUsICcjMDAwMEZGJyk7XG5cdFx0fSk7XG5cdH1cblxuXHRfZHJhd05vZGUobm9kZSwgY29sb3VyKSB7XG5cdFx0dmFyIGNvb3JkcyA9IG5vZGUudGhlTmFtZS5zcGxpdCgnLCcpO1xuXG5cdFx0Q2FudmFzLmRyYXdTcXVhcmUoY29vcmRzWzBdLCBjb29yZHNbMV0sIGNvbG91cik7XG5cdH1cblxuXHRfYmFja1RyYWNrKCkge1xuXHRcdHZhciBjb29yZHNBID0gdGhpcy5lbmROb2RlLnRoZU5hbWUuc3BsaXQoJywnKTtcblx0XHR2YXIgY29vcmRzQjtcblxuXHRcdHRoaXMuZW5kTm9kZSA9IHRoaXMuZW5kTm9kZS53b3JraW5nLnByZXZpb3VzTm9kZTtcblx0XHRjb29yZHNCID0gdGhpcy5lbmROb2RlLnRoZU5hbWUuc3BsaXQoJywnKTtcblxuXHRcdENhbnZhcy5kcmF3TGluZShjb29yZHNBWzBdLCBjb29yZHNBWzFdLCBjb29yZHNCWzBdLCBjb29yZHNCWzFdKTtcblx0fVxuXG5cdF9mb3VuZEVuZE5vZGUoKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBoYXNGb3VuZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5jb21wbGV0ZS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAoc2VsZi5ncmFwaC5lbmROb2Rlcy5pbmRleE9mKG5vZGUpICE9PSAtMSkge1xuXHRcdFx0XHRzZWxmLmVuZE5vZGUgPSBzZWxmLmVuZE5vZGUgfHwgbm9kZTtcblx0XHRcdFx0aGFzRm91bmQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGhhc0ZvdW5kO1xuXHR9XG5cblx0X2ZpbmRBZGphY2VudE5vZGVzKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHRoaXMuY29tcGxldGUuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0bm9kZS5lZGdlcy5mb3JFYWNoKGZ1bmN0aW9uIChlZGdlKSB7XG5cdFx0XHRcdHZhciBub2RlT2JqID0gc2VsZi5fY29udmVydFN0cmluZ1RvTm9kZShlZGdlLmVuZE5vZGUpO1xuXHRcdFx0XHR2YXIgbmV3RGlzdGFuY2UgPSBub2RlLndvcmtpbmcuc2hvcnRlc3REaXN0YW5jZSArIGVkZ2UudmFsO1xuXG5cdFx0XHRcdC8vIElzIG5vdCBpbiB0ZXN0aW5nIGFycmF5IGFuZCBub3QgaW4gY29tcGxldGUgYXJyYXkuXG5cdFx0XHRcdC8vIEluIG90aGVyIHdvcmRzLCBpZiB0aGUgbm9kZSBoYXNuJ3QgYmVlbiBzZWVuIGJ5IHRoZSBhbGdvcml0aG0geWV0LlxuXHRcdFx0XHRpZiAoc2VsZi50ZXN0aW5nLmluZGV4T2Yobm9kZU9iaikgPT09IC0xICYmIHNlbGYuY29tcGxldGUuaW5kZXhPZihub2RlT2JqKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRub2RlT2JqLndvcmtpbmcgPSBuZXcgc2VsZi5Ob2RlT2JqKCk7XG5cdFx0XHRcdFx0bm9kZU9iai53b3JraW5nLnNob3J0ZXN0RGlzdGFuY2UgPSBuZXdEaXN0YW5jZTtcblx0XHRcdFx0XHRub2RlT2JqLndvcmtpbmcucHJldmlvdXNOb2RlID0gbm9kZTtcblxuXHRcdFx0XHRcdHNlbGYudGVzdGluZy5wdXNoKG5vZGVPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIEZvdW5kIHNob3J0ZXIgZGlzdGFuY2Vcblx0XHRcdFx0ZWxzZSBpZiAobm9kZU9iai53b3JraW5nLnNob3J0ZXN0RGlzdGFuY2UgPiBuZXdEaXN0YW5jZSkge1xuXHRcdFx0XHRcdG5vZGVPYmoud29ya2luZy5zaG9ydGVzdERpc3RhbmNlID0gbmV3RGlzdGFuY2U7XG5cdFx0XHRcdFx0bm9kZU9iai53b3JraW5nLnByZXZpb3VzTm9kZSA9IG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0X2xvd2VzdFZlcnRleCgpIHtcblx0XHR2YXIgbG93ZXN0O1xuXG5cdFx0dGhpcy50ZXN0aW5nLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcblx0XHRcdGxvd2VzdCA9IGxvd2VzdCB8fCBub2RlO1xuXG5cdFx0XHRpZiAobm9kZS53b3JraW5nLnNob3J0ZXN0RGlzdGFuY2UgPCBsb3dlc3Qud29ya2luZy5zaG9ydGVzdERpc3RhbmNlKSB7XG5cdFx0XHRcdGxvd2VzdCA9IG5vZGU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnRlc3Rpbmcuc3BsaWNlKHRoaXMudGVzdGluZy5pbmRleE9mKGxvd2VzdCksIDEpO1xuXHRcdHRoaXMuY29tcGxldGUucHVzaChsb3dlc3QpO1xuXHR9XG5cblx0X2FkZFdvcmtpbmdPYmoobm9kZXMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRub2RlLndvcmtpbmcgPSBuZXcgc2VsZi5Ob2RlT2JqKCk7XG5cdFx0XHRub2RlLndvcmtpbmcuc2hvcnRlc3REaXN0YW5jZSA9IDA7XG5cdFx0fSk7XG5cdH1cblxuXHRfY29udmVydEFsbFRvTm9kZXMobm9kZXMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHRub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRub2RlID0gc2VsZi5fY29udmVydFN0cmluZ1RvTm9kZShub2RlKTtcblx0XHR9KTtcblx0fVxuXG5cdF9jb252ZXJ0U3RyaW5nVG9Ob2RlKHN0cmluZykge1xuXHRcdHJldHVybiB0aGlzLmdyYXBoLm5vZGVzW3N0cmluZ107XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkZ2VcbntcbiAgICBjb25zdHJ1Y3RvcihlbmROb2RlLCB2YWwpIHtcbiAgICAgICAgdGhpcy5lbmROb2RlID0gZW5kTm9kZTtcbiAgICAgICAgdGhpcy52YWwgPSB2YWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IEVkZ2UgZnJvbSAnLi9FZGdlJ1xuaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaFxue1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLm5vZGVzID0ge307XG5cdFx0dGhpcy5zdGFydE5vZGVzID0gW107XG5cdFx0dGhpcy5lbmROb2RlcyA9IFtdO1xuXHR9XG5cblx0XG5cdGFkZE5vZGUobmFtZSwgZWRnZXMpIHtcblx0XHR2YXIgbm9kZSA9IG5ldyBOb2RlKG5hbWUpO1xuXG5cdFx0bm9kZS5lZGdlcyA9IGVkZ2VzO1xuXHRcdHRoaXMubm9kZXNbbmFtZV0gPSBub2RlO1xuXG5cdFx0cmV0dXJuIG5vZGU7XG5cdH1cblxuXHRhZGRTdGFydE5vZGUobmFtZSkge1xuXHRcdHRoaXMuc3RhcnROb2Rlcy5wdXNoKHRoaXMubm9kZXNbbmFtZV0pO1xuXHR9XG5cblx0YWRkRW5kTm9kZShuYW1lKSB7XG5cdFx0dGhpcy5lbmROb2Rlcy5wdXNoKHRoaXMubm9kZXNbbmFtZV0pO1xuXHR9XG59XG4iLCJpbXBvcnQgRGlqa3N0cmEgZnJvbSAnLi9EaWprc3RyYSdcbmltcG9ydCBDYW52YXMgZnJvbSAnLi9DYW52YXMnXG5pbXBvcnQgR3JhcGggZnJvbSAnLi9HcmFwaCdcbmltcG9ydCBNYXAgZnJvbSAnLi9NYXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5cbntcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Q2FudmFzLmluaXQoKTtcblxuXHRcdHZhciBncmFwaCA9IG5ldyBHcmFwaCgpO1xuXHRcdHZhciBtYXAgPSBuZXcgTWFwKCk7XG5cdFx0dmFyIGRpamtzdHJhID0gbmV3IERpamtzdHJhKGdyYXBoKTtcblxuXHRcdGZvciAodmFyIHggPSAwOyB4IDwgbWFwLm1heExlbmd0aDsgeCArPSAxKSB7XG5cdFx0XHRmb3IgKHZhciB5ID0gMDsgeSA8IG1hcC5tYXhMZW5ndGg7IHkgKz0gMSkge1xuXHRcdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuXHRcdFx0XHRcdG1hcC53b3JsZFt4XVt5XSA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXAud29ybGRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWFwLm1heExlbmd0aCldW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1hcC5tYXhMZW5ndGgpXSA9IDI7XG5cdFx0bWFwLndvcmxkW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1hcC5tYXhMZW5ndGgpXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXAubWF4TGVuZ3RoKV0gPSAzO1xuXG5cdFx0bWFwLmNvbnZlcnRUb0dyYXBoKGdyYXBoKTtcblx0XHRtYXAuZHJhd09uQ2FudmFzKCk7XG5cblx0XHRkaWprc3RyYS5ydW4oKTtcblx0fVxufVxuXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBtYWluID0gbmV3IE1haW4oKTtcbn07XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gJy4vQ2FudmFzJ1xuaW1wb3J0IEVkZ2UgZnJvbSAnLi9FZGdlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXBcbntcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy53b3JsZCA9IFtdO1xuXHRcdHRoaXMubWF4TGVuZ3RoID0gMjA7XG5cdFx0dGhpcy5jb2xvdXJJbmRleCA9IFtcblx0XHRcdENhbnZhcy5jb2xvdXJzLnRoZURlZmF1bHQsXG5cdFx0XHRDYW52YXMuY29sb3Vycy53YWxsLFxuXHRcdFx0Q2FudmFzLmNvbG91cnMuc3RhcnQsXG5cdFx0XHRDYW52YXMuY29sb3Vycy5lbmRcblx0XHRdO1xuXG5cdFx0dGhpcy5fcG9wdWxhdGVNYXAoKTtcblx0fVxuXG5cblx0Y29udmVydFRvR3JhcGgoZ3JhcGgpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHR0aGlzLl9mb3JFYWNoQ2VsbChmdW5jdGlvbiAoeCwgeSkge1xuXHRcdFx0dmFyIGNlbGwgPSBzZWxmLndvcmxkW3hdW3ldO1xuXHRcdFx0dmFyIGVkZ2VzID0gW107XG5cblx0XHRcdC8vIENoZWNrcyBldmVyeSBzcXVhcmUgYXJvdW5kIHRoZSBjZWxsXG5cdFx0XHRmb3IgKHZhciB4MSA9IHggLSAxOyB4MSA8IHggKyAyOyB4MSArPSAxKSB7XG5cdFx0XHRcdGZvciAodmFyIHkxID0geSAtIDE7IHkxIDwgeSArIDI7IHkxICs9IDEpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIGlzTm90Q2VudHJlID0geDEgIT09IHggfHwgeTEgIT09IHk7XG5cdFx0XHRcdFx0XHR2YXIgaXNOb3RXYWxsID0gc2VsZi53b3JsZFt4MV1beTFdICE9PSAxO1xuXHRcdFx0XHRcdFx0dmFyIGlzSW5Xb3JsZCA9IHgxID49IDAgJiYgeTEgPj0gMCAmJiB4MSA8IHNlbGYubWF4TGVuZ3RoICYmIHkxIDwgc2VsZi5tYXhMZW5ndGg7XG5cblx0XHRcdFx0XHRcdGlmIChpc05vdENlbnRyZSAmJiBpc05vdFdhbGwgJiYgaXNJbldvcmxkKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyh4MSAtIHgsIDIpICsgTWF0aC5wb3coeTEgLSB5LCAyKSk7XG5cblx0XHRcdFx0XHRcdFx0ZWRnZXMucHVzaChuZXcgRWRnZSh4MSArICcsJyArIHkxLCBkaXN0YW5jZSkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZSkge1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIG5vdCB3YWxsXG5cdFx0XHRpZiAoY2VsbCAhPT0gMSkge1xuXHRcdFx0XHR2YXIgbm9kZSA9IGdyYXBoLmFkZE5vZGUoeCArICcsJyArIHksIGVkZ2VzKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgc3RhcnQgbm9kZVxuXHRcdFx0aWYgKGNlbGwgPT09IDIpIHtcblx0XHRcdFx0Z3JhcGguYWRkU3RhcnROb2RlKHggKyAnLCcgKyB5KTtcblx0XHRcdH1cblx0XHRcdC8vIElmIGVuZCBub2RlXG5cdFx0XHRlbHNlIGlmIChjZWxsID09PSAzKSB7XG5cdFx0XHRcdGdyYXBoLmFkZEVuZE5vZGUoeCArICcsJyArIHkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZHJhd09uQ2FudmFzKCkge1xuXHRcdHZhciBjb2xvdXJJbmRleCA9IHRoaXMuY29sb3VySW5kZXg7XG5cblx0XHRDYW52YXMuY2xlYXIoKTtcblxuXHRcdHRoaXMud29ybGQuZm9yRWFjaChmdW5jdGlvbiAocm93LCB4KSB7XG5cdFx0XHRyb3cuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCwgeSkge1xuXHRcdFx0XHRDYW52YXMuZHJhd1NxdWFyZSh4LCB5LCBjb2xvdXJJbmRleFtjZWxsXSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cblx0X2ZvckVhY2hDZWxsKGNhbGxiYWNrKSB7XG5cdFx0dmFyIG1heCA9IHRoaXMubWF4TGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgeCA9IDA7IHggPCBtYXg7IHggKz0gMSkge1xuXHRcdFx0Zm9yICh2YXIgeSA9IDA7IHkgPCBtYXg7IHkgKz0gMSkge1xuXHRcdFx0XHRjYWxsYmFjayh4LCB5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfcG9wdWxhdGVNYXAoKSB7XG5cdFx0Lypcblx0XHQgKiAwID0gTm90aGluZ1xuXHRcdCAqIDEgPSBXYWxsXG5cdFx0ICogMiA9IFN0YXJ0XG5cdFx0ICogMyA9IEVuZFxuXHRcdCAqL1xuXG5cdFx0Zm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLm1heExlbmd0aDsgeCArPSAxKSB7XG5cdFx0XHR0aGlzLndvcmxkW3hdID0gW107XG5cblx0XHRcdGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5tYXhMZW5ndGg7IHkgKz0gMSkge1xuXHRcdFx0XHR0aGlzLndvcmxkW3hdW3ldID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVcbntcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMudGhlTmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZWRnZXMgPSB7fTtcbiAgICB9XG5cbiAgICBcbiAgICBhZGRFZGdlKHN0YXJ0Tm9kZSwgZW5kTm9kZSwgdmFsdWUpIHtcblx0XHR0aGlzLmVkZ2VzLnB1c2gobmV3IEVkZ2UoZW5kTm9kZSwgdmFsdWUpKTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aEFsZ29yaXRobVxue1xuICAgIGNvbnN0cnVjdG9yKGdyYXBoKSB7XG5cdFx0dGhpcy5ncmFwaCA9IHt9O1xuICAgICAgICB0aGlzLmFsZ29yaXRobU5hbWUgPSAnJztcblxuICAgICAgICB0aGlzLnNlbGVjdEdyYXBoKGdyYXBoKTtcbiAgICB9XG5cblxuICAgIHNlbGVjdEdyYXBoKGdyYXBoKSB7XG4gICAgICAgIHRoaXMuZ3JhcGggPSBncmFwaCB8fCB7fTtcbiAgICB9XG5cbiAgICBzdGVwKCkge31cbn1cbiJdfQ==
