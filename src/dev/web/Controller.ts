import { IncomingMessage, ServerResponse } from "http";

export type ControllerStatus = {
    shouldPassTheReqFurther: 0 | 1
}

export interface Controller {
    process(req: IncomingMessage, res: ServerResponse, next: (req: IncomingMessage, res: ServerResponse ) => ControllerStatus ): ControllerStatus;
}