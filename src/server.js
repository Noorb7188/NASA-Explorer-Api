const http = require('http');
const handler = require('./handlers');
const router = require('./router');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer(router);

server.listen(port, () => {
  console.log(`Server is listening on ${host} : ${port}` );
})
