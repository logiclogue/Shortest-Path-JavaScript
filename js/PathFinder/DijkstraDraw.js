import Dijkstra from './Dijkstra'

export default class DijkstraDraw extends Dijkstra
{
    constructor(graph, canvas) {
        super(graph);

        this.canvas = canvas || {};
    }


    draw() {
		this.testing.forEach((node) => {
			this._drawNode(node, '#00FFFF');
		});

		this.complete.forEach((node) => {
			this._drawNode(node, '#0000FF');
		});

		this.graph.startNodes.forEach((node) => {
			this._drawNode(node, this.canvas.colours.start);
		});

		this.graph.endNodes.forEach((node) => {
			this._drawNode(node, this.canvas.colours.end);
		});

		this.path.route.forEach((node) => {
			this.canvas.drawLine(node.x1, node.y1, node.x2, node.y2);
		});
	}


	_drawNode(node, colour) {
		let coords = node.theName.split(',');

		this.canvas.drawSquare(coords[0], coords[1], colour);
	}
}
