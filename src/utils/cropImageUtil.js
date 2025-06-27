export const getCroppedImg = (file, croppedAreaPixels, returnBlob = false) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const { width, height, x, y } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (returnBlob) {
          resolve(blob);
        } else {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        }
      }, "image/jpeg");
    };
    image.onerror = reject;
  });
};
