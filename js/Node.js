class Node
{
    addEdge(startNode, endNode, value) {
		this.edges.push(new Edge(endNode, value));
	}


    constructor() {
        this.edges = {};
    }
}
