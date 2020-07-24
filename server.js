const http = require('http');
const app = require('./appp');
const port = process.env.port || 3000;

const server = http.createServer(appp);

server.listen(port);
