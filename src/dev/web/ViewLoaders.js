"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ViewNotFoundError_1 = require("./ViewNotFoundError");
const fs_1 = require("fs");
/**
 * This implementation is only in charge of loading raw html view files from specific location.
 */
class HtmlViewLoader {
    load(name) {
        const vBuffer = (0, fs_1.readFileSync)(`${__dirname} + /../../resources/views/html/${name}.html`);
        if (!vBuffer)
            throw new ViewNotFoundError_1.ViewNotFoundError(`${name} has not been found as a view`);
        return {
            name: `${name}.html`,
            body: vBuffer.toString("utf-8"),
            format: "html"
        };
    }
}
class ViewLoaders {
    static html() {
        return new HtmlViewLoader();
    }
}
exports.default = ViewLoaders;
