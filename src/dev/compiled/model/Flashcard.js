"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../data/Entity"));
class Flashcard extends Entity_1.default {
    notion;
    definition;
    constructor(notion, definition) {
        super();
        this.notion = notion;
        this.definition = definition;
    }
    getNotion() {
        return this.notion;
    }
    getDefinition() {
        return this.definition;
    }
    equals(card) {
        if (card === null)
            return false;
        if (!(card instanceof Flashcard))
            return false;
        return (!card.getId() ? true : card.getId() === this.getId()) &&
            card.notion === this.notion &&
            card.definition === this.definition;
    }
}
exports.default = Flashcard;
;
