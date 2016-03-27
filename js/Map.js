class Map
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

		this.world[0][0] = 2;
		this.world[this.maxLength - 1][this.maxLength - 1] = 3;
	}

	_forEachCell(callback) {
		var max = this.maxLength;

		for (var x = 0; x < max; x += 1) {
			for (var y = 0; y < max; y += 1) {
				callback(x, y);
			}
		}
	}


	convertToGraph(graph) {
		var self = this;

		this._forEachCell(function (x, y) {
			var cell = self.world[x][y];
			var edges = [];

			for (var x1 = x - 1; x1 < x + 2; x1 += 1) {
				for (var y1 = y - 1; y1 < y + 2; y1 += 1) {
					if (x1 !== x || y1 !== y) {
						try {
							if (self.world[x1][y1] !== 1) {
								var distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

								edges.push(new Edge(x1 + ',' + y1, distance));
							}
						}
						catch (e) {

						}
					}
				}
			}

			// If not wall
			if (cell !== 1) {
				var node = graph.addNode(x + ',' + y, edges);

				console.log(node);
			}
		});
	}


	constructor() {
		this.world = [];
		this.maxLength = 10;

		this._populateMap();
	}
}
