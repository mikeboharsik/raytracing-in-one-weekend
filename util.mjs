import { height, maxColorValue, width } from './consts.mjs';

import Vec3 from './Vec3.mjs';
import Ray from './Ray.mjs';

export function writeHeader() {
	const formatSpecifier = 'P3' // PPM ASCII

	console.log(formatSpecifier);
	console.log(`${width} ${height}`);
	console.log(maxColorValue);
}

export function verifyNumber(...n) {
	if (n.length <= 0) {
		throw new Error('Nothing to verify');
	}

	for (let e of n) {
		if (typeof e !== 'number') {
			throw new Error(`${e} is not a Number`);
		}
	}
}

export function verifyVec3(...v) {
	if (v.length <= 0) {
		throw new Error('Nothing to verify');
	}

	for (let e of v) {
		if (!(e instanceof Vec3)) {
			throw new Error(`${e} is not a Vec3`);
		}
	}
}

export function verifyRay(...r) {
	if (r.length <= 0) {
		throw new Error('Nothing to verify');
	}

	for (let e of r) {
		if (!(e instanceof Ray)) {
			throw new Error(`${e} is not a Ray`);
		}
	}
}

Vec3.constructor.prototype.verifyNumber = verifyNumber;
Vec3.constructor.prototype.verifyVec3 = verifyVec3;

export { Vec3 };
