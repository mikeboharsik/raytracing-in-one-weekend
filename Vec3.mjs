import { maxColorValue } from './consts.mjs';

class Vec3 {
	constructor(x = 0, y = 0, z = 0) {
		this._x = x;
		this._y = y;
		this._z = z;
	}

	get x() { return this._x }
	get y() { return this._y }
	get z() { return this._z }

	get length() {
		return Math.sqrt(this.length_squared);
	}

	get length_squared() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	add(v) {
		Vec3.verifyVec3(v);

		return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	multiply(n) {
		try {
			Vec3.verifyNumber(n);

			return new Vec3(this.x * n, this.y * n, this.z * n);
		} catch {
			Vec3.verifyVec3(n);

			return new Vec3(this.x * n.x, this.y * n.y, this.z * n.z);
		}
	}

	divide(n) {
		return this.multiply(1 / n);
	}

	static dot(v1, v2) {
		Vec3.verifyVec3(v1, v2);

		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	static cross(v1, v2) {
		Vec3.verifyVec3(v1, v2);

		return new Vec3(
			v1.y * v2.z - v1.z * v2.y,
			v1.z * v2.x - v1.x * v2.z,
			v1.x * v2.y - v1.y * v2.x
		);
	}

	static unit_vector(v) {
		Vec3.verifyVec3(v);

		return v.divide(v.length);
	}

	static write_color(v) {
		Vec3.verifyVec3(v);

		const r = parseInt(v.x * maxColorValue);
		const g = parseInt(v.y * maxColorValue);
		const b = parseInt(v.z * maxColorValue);

		console.log(`${r} ${g} ${b}`);
	}
}

export default Vec3;
