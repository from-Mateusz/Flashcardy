"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyLimitException = void 0;
const Exception_1 = __importDefault(require("../Exception"));
class KeyLimitException extends Exception_1.default {
}
exports.KeyLimitException = KeyLimitException;
