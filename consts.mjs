import { Vec3 } from './util.mjs';

const aspectRatio = 16 / 9;

const width = 400;
const height = parseInt(width / aspectRatio);

const viewportHeight = 2;
const viewportWidth = viewportHeight * aspectRatio;
const focalLength = 1;

const origin = new Vec3(0, 0, 0);
const horizontal = new Vec3(viewportWidth, 0, 0);
const vertical = new Vec3(0, viewportHeight, 0);
const lowerLeftCorner = origin.add(horizontal.divide(-2)).add(vertical.divide(-2)).add(new Vec3(0, 0, -focalLength));

const maxColorValue = 255;

export {
	focalLength,
	height,
	horizontal,
	lowerLeftCorner,
	maxColorValue,
	origin,
	vertical,
	width,
};
