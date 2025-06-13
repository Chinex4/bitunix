export const getCroppedImg = async (imageSrc, cropPixels) => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = cropPixels.width;
	canvas.height = cropPixels.height;

	ctx.drawImage(
		image,
		cropPixels.x,
		cropPixels.y,
		cropPixels.width,
		cropPixels.height,
		0,
		0,
		cropPixels.width,
		cropPixels.height
	);

	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			resolve(URL.createObjectURL(blob));
		}, 'image/jpeg');
	});
};

const createImage = (url) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (err) => reject(err));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues
		image.src = url;
	});
