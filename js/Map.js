import Edge from './Graph/Edge'
import Array2D from'./Array2D'

export default class Map
{
	/*
	 * 0 = Nothing
	 * 1 = Wall
	 * 2 = Start
	 * 3 = End
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.world = new Array2D(1);
		this.maxLength = 20;
		this.colourIndex = [
			this.canvas.colours.theDefault,
			this.canvas.colours.wall,
			this.canvas.colours.start,
			this.canvas.colours.end
		];
	}


	convertToGraph(graph) {
		this.world.forEachCell((x, y, cell) => {
			let edges = [];

			// Checks every square around the cell
			for (let x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (let y1 = y - 1; y1 < y + 2; y1 += 1) {
					let isNotCentre = x1 !== x || y1 !== y;
					let isNotWall = this.world.softGet(x1, y1) !== 1;

					if (isNotCentre && isNotWall) {
						let distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

						edges.push(new Edge(x1 + ',' + y1, distance));
					}
				}
			}

			// If not wall
			if (cell !== 1) {
				let node = graph.addNode(x + ',' + y, edges);
			}

			// If start node
			if (cell === 2) {
				graph.addStartNode(x + ',' + y);
			}
			// If end node
			else if (cell === 3) {
				graph.addEndNode(x + ',' + y);
			}
		});
	}

	draw() {
		this.canvas.clear();

		this.world.forEachCell((x, y, cell) => {
			this.canvas.drawSquare(x, y, this.colourIndex[cell]);
		});
	}
}
