const https = require('https');

https.get('https://dserveai.com', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    if (data.includes('clarity.ms')) {
      console.log('CLARITY FOUND');
    } else {
      console.log('CLARITY MISSING');
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
