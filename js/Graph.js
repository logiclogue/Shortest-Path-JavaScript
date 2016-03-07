class Graph
{
	addNode(name, edges) {
		this.nodes[name] = {
			val: 1,
			edges: edges || {}
		}
	}

	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}
}