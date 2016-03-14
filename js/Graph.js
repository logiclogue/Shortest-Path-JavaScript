class Graph
{
	addNode(name, edges) {
		this.nodes[name] = {
			val: 1,
			edges: edges || {}
		}
	}

	addStartNode(name) {
		this.startNodes.push(this.nodes[name]);
		this.endNodes.push(this.nodes[name]);
	}
	

	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}
}