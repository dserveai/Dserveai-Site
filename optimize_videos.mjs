import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const videos = ['1.mp4', '2.mp4', '3.mp4', '4.mp4'];
const dir = 'public/videos';

const results = [];

for (const file of videos) {
  const origPath = path.join(dir, file);
  const origSize = fs.statSync(origPath).size;
  
  let bestFile = origPath;
  let bestSize = origSize;
  let bestCrf = null;

  // Try CRFs. We want visually acceptable, so we won't go beyond 32 if possible.
  for (const crf of [28, 30, 32, 34]) {
    const tempPath = path.join(dir, `${file}_crf${crf}.mp4`);
    console.log(`Encoding ${file} at CRF ${crf}...`);
    try {
      execSync(`ffmpeg -y -i ${origPath} -c:v libx264 -preset slow -crf ${crf} -movflags +faststart -an ${tempPath}`, { stdio: 'ignore' });
      const newSize = fs.statSync(tempPath).size;
      
      if (newSize < origSize * 0.8) { // At least 20% smaller
        bestSize = newSize;
        bestFile = tempPath;
        bestCrf = crf;
        
        // Clean up any previous worse temp files if we were iterating
        // But we break on first success to keep highest quality possible!
        break; 
      } else {
        // Not small enough, delete and try higher CRF
        fs.unlinkSync(tempPath);
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  if (bestCrf !== null) {
    const finalPath = path.join(dir, `opt_${file}`);
    fs.renameSync(bestFile, finalPath);
    results.push({
      file,
      origSize,
      newSize: bestSize,
      crf: bestCrf
    });
  } else {
    results.push({
      file,
      origSize,
      newSize: origSize,
      crf: 'Original (unbeatable)'
    });
  }
}

fs.writeFileSync('video_opt_results.json', JSON.stringify(results, null, 2));
console.log("Done!", results);
