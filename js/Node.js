export default class Node
{
    constructor(name) {
        this.theName = name;
        this.edges = {};
    }

    
    addEdge(startNode, endNode, value) {
		this.edges.push(new Edge(endNode, value));
	}
}
