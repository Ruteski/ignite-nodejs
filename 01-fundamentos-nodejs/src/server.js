// import http from 'node:http' // "type": "module", -> no packge.json para poder usar o import/export
import http from 'node:http';

const server = http.createServer((req, res) => res.end('Hello, lincoln!'))

server.listen(3333);