"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdentifiableError extends Error {
    id;
    constructor(message, id) {
        super(message);
        this.id = id;
    }
    getId() {
        return this.id;
    }
}
exports.default = IdentifiableError;
