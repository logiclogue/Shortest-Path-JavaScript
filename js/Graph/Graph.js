import Edge from './Edge'
import Node from './Node'

export default class Graph
{
	constructor() {
		this.nodes = {};
		this.startNodes = [];
		this.endNodes = [];
	}


	addNode(name, edges) {
		let node = new Node(name);

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
}
