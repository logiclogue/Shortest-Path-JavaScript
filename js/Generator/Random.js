export default class Random
{
    constructor(map, consistency) {
        this.map = map;
        this.consistency = consistency || 0.5;
    }


    run() {
        for (let x = 0; x < this.map.maxLength; x += 1) {
			for (let y = 0; y < this.map.maxLength; y += 1) {
				if (Math.random() < this.consistency) {
					this.map.world[x][y] = 1;
				}
			}
		}

		this.map.world[Math.floor(Math.random() * this.map.maxLength)][Math.floor(Math.random() * this.map.maxLength)] = 2;
		this.map.world[Math.floor(Math.random() * this.map.maxLength)][Math.floor(Math.random() * this.map.maxLength)] = 3;
    }
}
