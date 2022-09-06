"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../data/Entity"));
class Flashcard extends Entity_1.default {
    deck;
    notion;
    definition;
    constructor(notion, definition, deck) {
        super();
        this.notion = notion;
        this.definition = definition;
        this.setDeck(deck);
    }
    getDeck() {
        return this.deck;
    }
    getNotion() {
        return this.notion;
    }
    getDefinition() {
        return this.definition;
    }
    setDeck(deck) {
        this.deck = deck;
        if (deck && !deck.contains(this))
            deck.insert(this);
    }
    equals(card) {
        if (card === undefined)
            return false;
        if (!(card instanceof Flashcard))
            return false;
        const otherCard = card;
        return (!otherCard.getId() || !this.getId() ? true : otherCard.getId() === this.getId()) &&
            otherCard.notion === this.notion &&
            otherCard.definition === this.definition;
    }
}
exports.default = Flashcard;
;
