import { verifyVec3 } from './util.mjs';

class Ray {
	constructor(origin, direction) {
		verifyVec3(origin, direction);

		this._origin = origin;
		this._direction = direction;
	}

	get origin() { return this._origin }
	get direction() { return this._direction }

	at(t) {
		return this.origin.add(this.direction.multiply(t));
	}
}

export default Ray;
