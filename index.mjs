// https://raytracing.github.io/books/RayTracingInOneWeekend.html

import {
	height,
	horizontal,
	lowerLeftCorner,
	maxColorValue,
	origin,
	vertical,
	width,
} from './consts.mjs';
import Ray from './Ray.mjs';

import { Vec3, verifyRay, writeHeader } from './util.mjs';

function hitSphere(center, radius, ray) {
	const originCenter = ray.origin.add(center.multiply(-1));

	const a = ray.direction.length_squared;
	const half_b = Vec3.dot(originCenter, ray.direction);
	const c = originCenter.length_squared - (radius * radius);
	const discriminant = (half_b * half_b) - (a * c);

	if (discriminant < 0) {
		return -1;
	}

	return (-half_b - Math.sqrt(discriminant)) / a;
}

function getRayColor(ray) {
	verifyRay(ray);

	let t = hitSphere(new Vec3(0, 0, -1), 0.5, ray);
	if (t > 0) {
		const n = Vec3.unit_vector(ray.at(t).add(new Vec3(0, 0, -1).multiply(-1)));
		return (new Vec3(n.x + 1, n.y + 1, n.z + 1)).multiply(0.5);
	}

	const unitDirection = Vec3.unit_vector(ray.direction);

	const oneVec = new Vec3(1, 1, 1);
	const multVec = new Vec3(0.5, 0.7, 1.0);

	t = 0.5 * (unitDirection.y + 1);

	const partOne = oneVec.multiply(1 - t);
	const partTwo = multVec.multiply(t);

	const color = partOne.add(partTwo);
	return color;
}

function render() {
	writeHeader();

	const renderStart = new Date();

	for (let j = height - 1; j >= 0; j--) {
		console.error(`Lines remaining: ${j}`);
		for (let i = 0; i < width; i++) {
			const u = i / (width - 1);
			const v = j / (height - 1);

			const ray = new Ray(origin, lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).add(origin.multiply(-1)));
			const color = getRayColor(ray);

			Vec3.write_color(color);
		}
	}

	console.error(`Render time: ${(new Date() - renderStart) / 1000} seconds`);

	console.error(`Done`);
}

async function renderParallel() {
	writeHeader();

	const jobs = [];

	const renderStart = new Date();

	for (let j = height - 1; j >= 0; j--) {
		console.error(`Lines remaining: ${j}`);
		for (let i = 0; i < width; i++) {
			jobs.push(new Promise((res, rej) => {
				const u = i / (width - 1);
				const v = j / (height - 1);

				const ray = new Ray(origin, lowerLeftCorner.add(horizontal.multiply(u)).add(vertical.multiply(v)).add(origin.multiply(-1)));
				const color = getRayColor(ray);

				res(color);
			}));
		}
	}

	let output = '';
	const pixels = await Promise.all(jobs);
	pixels.forEach(pixel => {
		const r = parseInt(pixel.x * maxColorValue);
		const g = parseInt(pixel.y * maxColorValue);
		const b = parseInt(pixel.z * maxColorValue);
		output += `${r} ${g} ${b}\n`;
	});

	console.log(output);

	console.error(`Render time: ${(new Date() - renderStart) / 1000} seconds`);

	console.error(`Done`);
}

//render();
renderParallel();
