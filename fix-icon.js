/* eslint-disable @typescript-eslint/no-require-imports */
const { Jimp } = require("jimp");
const path = require("path");

async function run() {
  const file = path.join(__dirname, "app", "icon.png");
  const img = await Jimp.read(file);
  const { width, height } = img.bitmap;
  
  const bg = new Jimp({ width, height, color: '#000000' });
  bg.composite(img, 0, 0);
  
  await bg.write(file);
  console.log("Done");
}

run().catch(console.error);
