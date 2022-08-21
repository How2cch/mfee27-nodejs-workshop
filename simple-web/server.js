const http = require('http');
const fs = require('fs/promises');

const port = 3001;

const server = http.createServer(async (request, response) => {
  // 處理 request, response
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html; charset=UTF-8');
  response.end('<html><head><body><h1>Hello</h1></body></head></html>');

  const content = await fs.readFile('index.html');
  response.end(content);

  console.log(request.url);
  switch (request.url) {
    case '/':
      response.end('首頁');
      break;
    case 'about':
      response.end('關於我');
      break;
    default:
      response.writeHead(404);
      response.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
