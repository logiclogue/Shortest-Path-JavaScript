export default class PathAlgorithm
{
    constructor(graph) {
		this.graph = {};
        this.algorithmName = '';

        this.selectGraph(graph);
    }

    selectGraph(graph) {
        this.graph = graph || {};
    }

    step() {}
}
