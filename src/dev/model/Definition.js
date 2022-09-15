"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../data/Entity"));
class Definition extends Entity_1.default {
    content;
    label;
    flashcard;
    constructor(content, label, flashcard) {
        super();
        this.content = content;
        this.label = label;
        this.flashcard = flashcard;
    }
    static of(content, label, flashcard) {
        return new Definition(content, label, flashcard);
    }
    changeContent(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
    changeLabel(label) {
        this.label = label;
    }
    getLabel() {
        return this.label;
    }
    changeFlashcard(flashcard) {
        this.flashcard = flashcard;
    }
    getFlashcard() {
        return this.flashcard;
    }
}
exports.default = Definition;
