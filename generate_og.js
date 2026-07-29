const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'public', 'logo.png');
const fontPath = path.join(__dirname, 'public', 'fonts', 'nasalization.otf');

const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const fontBase64 = fs.readFileSync(fontPath).toString('base64');

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&display=swap');

    @font-face {
      font-family: 'Nasalization';
      src: url(data:font/otf;base64,${fontBase64}) format('opentype');
    }

    body {
      margin: 0;
      width: 1200px;
      height: 630px;
      background: #050505;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
      font-family: 'Inter', sans-serif;
    }

    .grid {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background-image: linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
      background-size: 40px 40px;
      z-index: 1;
    }

    .glow1, .glow2 {
      position: absolute;
      width: 800px; height: 800px;
      border-radius: 50%;
      filter: blur(200px);
      z-index: 0;
      opacity: 0.10; /* Reduced by ~20% from 0.15 to make it disappear into black more */
    }
    .glow1 {
      background: #3b82f6;
      top: -450px;
      left: -200px;
    }
    .glow2 {
      background: #8b5cf6;
      bottom: -450px;
      right: -200px;
    }

    /* Additional very subtle glow behind the logo */
    .glow-center {
      position: absolute;
      width: 600px; height: 600px;
      border-radius: 50%;
      filter: blur(150px);
      z-index: 0;
      opacity: 0.05;
      background: #ffffff;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }

    .content {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 46px; /* Increased from 32px by ~14px */
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .logo-img {
      width: 125px;
      height: 125px;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgba(255,255,255,0.05));
    }

    .logo-text {
      font-family: 'Nasalization', sans-serif;
      font-size: 96px;
      font-weight: 400;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: white;
      display: flex;
      align-items: baseline;
    }

    .logo-ai {
      font-family: 'Inter', sans-serif;
      font-size: 43.2px; /* 0.45 * 96 = 43.2 */
      font-weight: 800;
      position: relative;
      top: -51.84px; /* -1.2 * 43.2 = -51.84 */
      margin-left: 5px;
      color: white;
      letter-spacing: 0.05em;
    }

    .tagline {
      font-size: 42px;
      font-weight: 500;
      letter-spacing: 0.025em; /* Slightly increased */
      text-align: center;
      line-height: 1.3; /* Slightly tighter */
      filter: drop-shadow(0 2px 10px rgba(255,255,255,0.1)); /* Extremely subtle glow/shadow */
    }
    
    .tagline-line1 {
      color: #FFFFFF; /* Pure white */
    }
    
    .tagline-line2 {
      color: #EBEBEB; /* Hint of light gray */
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow1"></div>
  <div class="glow2"></div>
  <div class="glow-center"></div>
  
  <div class="content">
    <div class="logo-container">
      <img src="data:image/png;base64,${logoBase64}" class="logo-img" />
      <div class="logo-text">
        Dserve<span class="logo-ai">AI</span>
      </div>
    </div>
    <div class="tagline">
      <span class="tagline-line1">Enterprise AI Data Collection,</span><br/>
      <span class="tagline-line2">Annotation & Synthetic Data</span>
    </div>
  </div>
</body>
</html>
`;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'public/og-image.jpg', type: 'jpeg', quality: 100 });
  await browser.close();
  console.log('OG Image refined and generated at public/og-image.jpg');
})();
