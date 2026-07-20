import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  'C:/Users/Lenovo/Desktop/Dserve/dserveai-site/public/case-studies',
  'C:/Users/Lenovo/Desktop/Dserve/dserveai-site/public/solutions'
];

async function convert() {
  const results = [];
  
  for (const dir of dirs) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.endsWith('.png')) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.size > 300 * 1024) { // Only > 300KB
          const webpPath = fullPath.replace('.png', '.webp');
          
          // Lossless true preserves exact visual pixels and transparency
          await sharp(fullPath)
            .webp({ lossless: true })
            .toFile(webpPath);
            
          const newStat = fs.statSync(webpPath);
          
          // If lossless is bigger than original (sometimes happens), try high quality lossy
          if (newStat.size > stat.size) {
             await sharp(fullPath)
              .webp({ quality: 90 }) // visually identical
              .toFile(webpPath);
          }
          
          const finalStat = fs.statSync(webpPath);
          
          results.push({
            file,
            originalSize: stat.size,
            newSize: finalStat.size
          });
          
          console.log(`Converted ${file}: ${(stat.size/1024).toFixed(1)}KB -> ${(finalStat.size/1024).toFixed(1)}KB`);
        }
      }
    }
  }
  
  fs.writeFileSync('C:/Users/Lenovo/Desktop/Dserve/dserveai-site/conversion_results.json', JSON.stringify(results, null, 2));
}

convert().catch(console.error);
