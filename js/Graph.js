class Graph
{
	addNode(name) {
		var node = new Node(name);

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
