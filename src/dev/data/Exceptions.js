"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyLimitException = void 0;
const IdentifiableError_1 = __importDefault(require("../IdentifiableError"));
class KeyLimitException extends IdentifiableError_1.default {
    constructor(message) {
        super(message, "1002_DB");
    }
}
exports.KeyLimitException = KeyLimitException;
