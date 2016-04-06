import Canvas from './Canvas/Canvas'
import Edge from './Graph/Edge'

export default class Map
{
	constructor() {
		this.world = [];
		this.maxLength = 20;
		this.colourIndex = [
			Canvas.colours.theDefault,
			Canvas.colours.wall,
			Canvas.colours.start,
			Canvas.colours.end
		];

		this._populateMap();
	}


	convertToGraph(graph) {
		this._forEachCell((x, y) => {
			let cell = this.world[x][y];
			let edges = [];

			// Checks every square around the cell
			for (let x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (let y1 = y - 1; y1 < y + 2; y1 += 1) {
					try {
						let isNotCentre = x1 !== x || y1 !== y;
						let isNotWall = this.world[x1][y1] !== 1;
						let isInWorld = x1 >= 0 && y1 >= 0 && x1 < this.maxLength && y1 < this.maxLength;

						if (isNotCentre && isNotWall && isInWorld) {
							let distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

							edges.push(new Edge(x1 + ',' + y1, distance));
						}
					}
					catch (e) {

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

	drawOnCanvas() {
		let colourIndex = this.colourIndex;

		Canvas.clear();

		this.world.forEach((row, x) => {
			row.forEach((cell, y) => {
				Canvas.drawSquare(x, y, colourIndex[cell]);
			});
		});
	}


	_forEachCell(callback) {
		let max = this.maxLength;

		for (let x = 0; x < max; x += 1) {
			for (let y = 0; y < max; y += 1) {
				callback(x, y);
			}
		}
	}

	_populateMap() {
		/*
		 * 0 = Nothing
		 * 1 = Wall
		 * 2 = Start
		 * 3 = End
		 */

		for (let x = 0; x < this.maxLength; x += 1) {
			this.world[x] = [];

			for (let y = 0; y < this.maxLength; y += 1) {
				this.world[x][y] = 0;
			}
		}
	}
}
