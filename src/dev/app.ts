import * as fs from 'fs';

const http = require('http');

type Endpoint = {
    hostname: string;
    port: number;
};

type Configuration = {
    node: Endpoint;
    redis: Endpoint;
}

/**
 * Kickstart method is mostly responsible for loading configuration ("app.config.json") values
 * into node.js environmental variables, which are used through out a whole application. 
 */
function kickstart() {
    fs.open(`${__dirname}/app.config.json`, (err, fd) => {
        if(!err)
            console.log('Could not open configuration file.');
        else
            fs.read(fd, (err, bytesCount, buf ) => {
                if(!err)
                    console.log('Could not read file.');
                else {
                    const content = buf.toString();
                    if(content.length > 0)
                        kickstartApplication(JSON.parse(content));
                }
            })  
    });  
}

function kickstartApplication( configuration: Configuration ) {
    const server = http.createServer(
        (req: any, res: any) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Welcome to Flashcardy');
        }
    );

    server.listen( configuration['node'].port, configuration['node'].hostname, () => {
        console.log(`Server is running at http://${configuration['node'].hostname}:${configuration['node'].port}`);
    });
}