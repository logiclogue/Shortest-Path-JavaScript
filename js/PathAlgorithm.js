export default class PathAlgorithm
{
    constructor(graph) {
		this.graph = {};
        this.algorithmName = '';
        this.path = [];

        this.selectGraph(graph);
    }


    selectGraph(graph) {
        this.graph = graph || {};
    }

    step() {}

    draw() {}
}
