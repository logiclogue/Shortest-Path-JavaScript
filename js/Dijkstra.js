class Dijkstra
{
	selectGraph(graph) {
		graph.nodes.forEach(function (node) {
			node.dijkstra = this.obj;
		});
	}

	run() {

	}


	constructor() {
		this.obj = function () {
			this.permanentLabel; 
			this.temporaryLabel;
			this.smallestValue;
		};
	}
}