"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewNotFoundError = void 0;
const IdentifiableError_1 = __importDefault(require("../IdentifiableError"));
class ViewNotFoundError extends IdentifiableError_1.default {
    constructor(message) {
        super(message, '1001V');
    }
}
exports.ViewNotFoundError = ViewNotFoundError;
