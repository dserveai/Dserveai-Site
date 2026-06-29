const { Jimp } = require('jimp');

async function main() {
  try {
    const image = await Jimp.read('./app/icon.png');
    
    // Create a new black image with the same dimensions
    const bg = new Jimp({ width: image.bitmap.width, height: image.bitmap.height, color: 0x000000FF });
    
    // Composite the logo on top of the black background
    bg.composite(image, 0, 0);
    
    // Overwrite the icon in the app directory
    await bg.write('./app/icon.png');
    
    console.log('Successfully added a black background to the favicon!');
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

main();
