const https = require('https');

https.get('https://dserveai.com', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (data.includes('G-FXC6DG572R')) {
      console.log('FOUND GA ID');
    } else {
      console.log('NOT FOUND');
      console.log('HTML SNIPPET:', data.substring(data.indexOf('</body>') - 200, data.indexOf('</body>') + 50));
    }
  });
}).on('error', err => console.log('Error: ', err.message));
