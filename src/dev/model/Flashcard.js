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
    definitions = [];
    // constructor(notion: string, definition: string, deck?: Deck) {
    //     super();
    //     this.notion = notion;
    //     this.definition = definition;
    //     this.setDeck(deck);
    // }
    constructor(notion, definitions, deck) {
        super();
        this.notion = notion;
        this.definitions = definitions;
        this.setDeck(deck);
    }
    static create(notion, definitions, deck) {
        return new Flashcard(notion, [...definitions], deck);
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
    getDefinitions() {
        return [...this.definitions];
    }
    setDefinitions(definitions) {
        for (let definition of definitions) {
            if (!definition.getFlashcard())
                definition.changeFlashcard(this);
            this.definitions.push(definition);
        }
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
