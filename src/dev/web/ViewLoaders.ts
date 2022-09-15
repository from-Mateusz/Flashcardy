import { View } from "./View";
import ViewLoader from "./ViewLoader";
import { ViewNotFoundError } from "./ViewNotFoundError";
import { readFileSync } from "fs";

/**
 * This implementation is only in charge of loading raw html view files from specific location. 
 */
class HtmlViewLoader implements ViewLoader {
    load(name: string): View {
        const vBuffer = readFileSync(`${__dirname} + /../../resources/views/html/${name}.html`);
        if(!vBuffer)
            throw new ViewNotFoundError(`${name} has not been found as a view`);

        return {
            name: `${name}.html`,
            body: vBuffer.toString("utf-8"),
            format: "html"
        };
    }
} 

export default class ViewLoaders {
    static html(): ViewLoader {
        return new HtmlViewLoader();
    }
}