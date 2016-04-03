export default class Map
{
	_populateMap() {
		/*
		 * 0 = Nothing
		 * 1 = Wall
		 * 2 = Start
		 * 3 = End
		 */

		for (var x = 0; x < this.maxLength; x += 1) {
			this.world[x] = [];

			for (var y = 0; y < this.maxLength; y += 1) {
				this.world[x][y] = 0;
			}
		}
	}

	_forEachCell(callback) {
		var max = this.maxLength;

		for (var x = 0; x < max; x += 1) {
			for (var y = 0; y < max; y += 1) {
				callback(x, y);
			}
		}
	}


	drawOnCanvas() {
		var colourIndex = this.colourIndex;

		Canvas.clear();

		this.world.forEach(function (row, x) {
			row.forEach(function (cell, y) {
				Canvas.drawSquare(x, y, colourIndex[cell]);
			});
		});
	}

	convertToGraph(graph) {
		var self = this;

		this._forEachCell(function (x, y) {
			var cell = self.world[x][y];
			var edges = [];

			// Checks every square around the cell
			for (var x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (var y1 = y - 1; y1 < y + 2; y1 += 1) {
					try {
						var isNotCentre = x1 !== x || y1 !== y;
						var isNotWall = self.world[x1][y1] !== 1;
						var isInWorld = x1 >= 0 && y1 >= 0 && x1 < self.maxLength && y1 < self.maxLength;

						if (isNotCentre && isNotWall && isInWorld) {
							var distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

							edges.push(new Edge(x1 + ',' + y1, distance));
						}
					}
					catch (e) {

					}
				}
			}

			// If not wall
			if (cell !== 1) {
				var node = graph.addNode(x + ',' + y, edges);
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
}
