class Main
{
	constructor() {
		var graph = new Graph();

		graph.addNode('Jordan', [{node: '1', distance: 10}, {node: '2', distance: 10}]);

		console.log(graph.nodes);

		Canvas.init();
	}
}


window.onload = function () {
	var main = new Main();
};