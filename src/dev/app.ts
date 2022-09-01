const http = require('http');

const endpoint = {
    hostname: 'localhost',
    port: 3000
};

const server = http.createServer(
    (req: any, res: any) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to Flashcardy');
    }
);

server.listen( endpoint.port, endpoint.hostname, () => {
    console.log(`Server is running at http://${endpoint.hostname}:${endpoint.port}`);
});