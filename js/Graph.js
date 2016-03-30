class Graph
{
	_drawNode(node, colour) {
		var coords = node.split(',');
		var x = parseInt(coords[0]);
		var y = parseInt(coords[1]);

		Canvas.drawSquare(x, y, colour);
	}

	_forEachNodeDraw(nodes, colour) {
		var self = this;

		nodes.forEach(function (node) {
			self._drawNode(node.theName, colour);
		});
	}

	_forInNodeDraw(nodes, colour) {
		for (var node in nodes) {
			this._drawNode(node, colour);
		}
	}


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

	drawOnCanvas() {
		Canvas.clear();

		this._forInNodeDraw(this.nodes, Canvas.colours.theDefault);
		this._forEachNodeDraw(this.startNodes, Canvas.colours.start);
		this._forEachNodeDraw(this.endNodes, Canvas.colours.end);
	}


	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}
}
