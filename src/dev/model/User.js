"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = __importDefault(require("./Deck"));
const Entity_1 = __importDefault(require("../data/Entity"));
class User extends Entity_1.default {
    decks = [];
    name;
    constructor(name) {
        super();
        this.name = name;
    }
    ;
    getName() {
        return this.name;
    }
    getDecks() {
        return new Set(this.decks);
    }
    /**
     * If a deck with a given name has been already existing within a user's collection of the decks,
     * a flashcards are put into the existing deck. Otherwise, new deck is crafted and put into
     * the user's collection of decks at its end.
     * @param name
     * @param flashcards
     * @returns
     */
    createDeck(name, flashcards) {
        const existingDeck = this.getDeck(name);
        if (existingDeck) {
            existingDeck.insertAll(flashcards);
            return existingDeck;
        }
        const brandNewDeck = Deck_1.default.of(name, flashcards);
        this.decks.push(brandNewDeck);
        return brandNewDeck;
    }
    hasDeck(name) {
        if (this.getDeck(name))
            return true;
        return false;
    }
    getDeck(name) {
        return this.decks.find(deck => name === deck.getName());
    }
}
exports.default = User;
