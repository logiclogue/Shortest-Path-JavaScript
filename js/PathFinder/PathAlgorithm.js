import Path from './Path'

export default class PathAlgorithm
{
    constructor(graph) {
		this.graph = {};
        this.algorithmName = '';
        this.path = new Path();
        this.isComplete = false;
        this.foundPath = false;

        this.selectGraph(graph);
    }


    selectGraph(graph) {
        this.graph = graph || {};
    }

    step() {}
}
