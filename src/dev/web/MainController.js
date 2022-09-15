"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ViewLoaders_1 = __importDefault(require("./ViewLoaders"));
class MainController {
    viewloader;
    constructor(viewLoader = ViewLoaders_1.default.html()) {
        this.viewloader = viewLoader;
    }
    process(req, res, next) {
        if (req.url && req.url === '/welcome')
            return this.welcome(req, res);
        return { shouldPassTheReqFurther: 1 };
    }
    welcome(req, res) {
        const view = this.viewloader.load("welcome");
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Length", view.body.length);
        res.statusCode = 200;
        res.end(view.body);
        return { shouldPassTheReqFurther: 0 };
    }
}
exports.default = MainController;
