export default class Node
{
    addEdge(startNode, endNode, value) {
		this.edges.push(new Edge(endNode, value));
	}


    constructor(name) {
        this.theName = name;
        this.edges = {};
    }
}
