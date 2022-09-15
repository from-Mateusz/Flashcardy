"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const MainController_1 = __importDefault(require("../dev/web/MainController"));
const http = require('http');
const mainController = new MainController_1.default();
(() => kickstart())();
/**
 * Kickstart method is mostly responsible for loading configuration ("app.config.json") values
 * into node.js environmental variables, which are used through out a whole application.
 */
function kickstart() {
    fs.readFile(`${__dirname}/app.config.json`, (err, data) => {
        if (err)
            console.log('Could not open configuration file.');
        const configuration = JSON.parse(data.toString("utf-8"));
        kickstartApplication(configuration);
    });
}
function kickstartApplication(configuration) {
    const server = http.createServer((req, res) => {
        mainController.process(req, res);
    });
    server.listen(configuration['node'].port, configuration['node'].hostname, () => {
        console.log(`Server is running at http://${configuration['node'].hostname}:${configuration['node'].port}`);
    });
}
