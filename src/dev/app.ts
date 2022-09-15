import * as fs from 'fs';
import MainController from "../dev/web/MainController";

const http = require('http');

const mainController = new MainController();

type Endpoint = {
    hostname: string;
    port: number;
};

type Configuration = {
    node: Endpoint;
    redis: Endpoint;
}

(() => kickstart())();

/**
 * Kickstart method is mostly responsible for loading configuration ("app.config.json") values
 * into node.js environmental variables, which are used through out a whole application. 
 */
function kickstart() {
    fs.readFile(`${__dirname}/app.config.json`, (err, data) => {
        if( err )
            console.log('Could not open configuration file.');
        const configuration = JSON.parse(data.toString("utf-8"));
        kickstartApplication(configuration);
    });
}

function kickstartApplication( configuration: Configuration ) {
    const server = http.createServer(
        (req: any, res: any) => {
            mainController.process(req, res);
        }
    );

    server.listen( configuration['node'].port, configuration['node'].hostname, () => {
        console.log(`Server is running at http://${configuration['node'].hostname}:${configuration['node'].port}`);
    });
}