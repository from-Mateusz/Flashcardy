import { IncomingMessage, ServerResponse } from "http";
import { Controller, ControllerStatus } from "./Controller";
import ViewLoader from "./ViewLoader";
import ViewLoaders from "./ViewLoaders";

export default class MainController implements Controller {

    private readonly viewloader: ViewLoader;
    
    constructor(viewLoader: ViewLoader = ViewLoaders.html()) {
        this.viewloader = viewLoader;
    }

    process(req: IncomingMessage, res: ServerResponse, next?: (req: IncomingMessage, res: ServerResponse) => ControllerStatus): ControllerStatus {
        if(req.url && req.url === '/welcome' )
            return this.welcome(req, res);
        return { shouldPassTheReqFurther: 1 };
    }

    private welcome(req: IncomingMessage, res: ServerResponse): ControllerStatus {
        const view = this.viewloader.load("welcome");
        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Length", view.body.length);
        res.statusCode = 200;
        res.end(view.body);
        return { shouldPassTheReqFurther: 0 };
    }
}