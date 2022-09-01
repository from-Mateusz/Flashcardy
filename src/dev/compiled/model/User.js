"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = __importDefault(require("./Deck"));
const exports_1 = require("../data/exports");
const Entity_1 = __importDefault(require("../data/Entity"));
const idGenerator = exports_1.KeyGenerators.numeric(100);
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
        const brandNewDeck = new Deck_1.default(name, flashcards);
        this.decks.push(brandNewDeck);
        return brandNewDeck;
    }
    /**
     * By use of this method, user can find any flashcard/s from any of his deck, only by notion.
     * User can look for the flashcard/s in question in two manners. Firstly, he can look for the flashcard
     * with the exact same notion (1:1 match, so to speak). Secondly, he can look for flashcard which
     * at least includes wanted notion within it's own notion.
     * @param notion
     * @param exact
     */
    getFlashcardsByNotion(notion, exact) {
        const flashcards = this.decks.flatMap(deck => deck.getFlashcardsByNotion(notion));
        const selectedFlashcards = [];
        if (exact) {
            for (let flashcard of flashcards)
                if (notion === flashcard.getNotion())
                    selectedFlashcards.push(flashcard);
        }
        else {
            for (let flashcard of flashcards)
                if (flashcard.getNotion().includes(notion))
                    selectedFlashcards.push(flashcard);
        }
        return selectedFlashcards;
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
