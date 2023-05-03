const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const path = urlObj.pathname;
  
  if (path === '/payment-success') {
    // This is the URL that the SSLCOMMERZ checkout page redirects to after a successful payment
    fs.readFile('payment_success.html', (err, data) => {
      if (err) throw err;
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});
