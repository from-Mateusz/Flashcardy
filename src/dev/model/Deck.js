"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __importDefault(require("../data/Entity"));
class Deck extends Entity_1.default {
    static sortAscending = (flashcard1, flashcard2) => {
        return flashcard1.getId() > flashcard2.getId() ? 1 : flashcard1.getId() < flashcard2.getId() ? -1 : 0;
    };
    flashcards = [];
    name;
    /**
     * Flashcards array's content is coppied into instance's property (cards' array)
     * in order to prevent any further manipulation except for those performed via current Deck's instance.
     * @param name
     * @param flashcards
     */
    constructor(name, flashcards) {
        super();
        this.name = name;
        this.insertAll(flashcards);
    }
    static of(name, flashcards) {
        return new Deck(name, flashcards);
    }
    static empty(name) {
        return new Deck(name, []);
    }
    getName() {
        return this.name;
    }
    changeName(name) {
        this.name = name;
    }
    /**
     * Cards' array ought not to undergo any alterations except for within the scope of the deck's instance in question.
     * @returns New set containing every card from within the deck.
     */
    getFlashcards() {
        return new Set(this.flashcards);
    }
    getFlashcardsByNotion(notion, exact = true) {
        return exact ? this.flashcards.find(flashcard => notion = flashcard.getNotion()) :
            new Set(this.flashcards.filter(flashcard => flashcard.getNotion().includes(notion)));
    }
    getFlashcardsByMultipleNotions(notions, exact = true) {
        const foundFlashcards = new Set;
        this.flashcards.filter(flashcard => {
            notions.forEach(notion => {
                if ((exact && notion === flashcard.getNotion()) || (!exact && flashcard.getNotion().includes(notion)))
                    foundFlashcards.add(flashcard);
            });
        });
        return foundFlashcards;
    }
    insertAll(flashcards) {
        for (let card of flashcards)
            this.insert(card);
    }
    /**
     * Every deck should be comprised of unique flashcards.
     * There's no use of adding multiple equal flashcards.
     * @param card
     * @returns
     */
    insert(flashcard) {
        if (!this.contains(flashcard))
            this.flashcards.push(flashcard);
        else {
            const existingFlashcard = this.flashcards.find(existingFlashcard => existingFlashcard.getId() === flashcard.getId());
            // Object.assign(existingFlashcard!, flashcard);
            console.log("Existing card: ", existingFlashcard);
            return existingFlashcard;
        }
        if (!flashcard.getDeck())
            flashcard.setDeck(this);
        return this.flashcards[this.flashcards.length - 1];
    }
    ;
    contains(flashcard) {
        return this.flashcards.some(c => c.equals(flashcard));
    }
    /**
     * If a card to be removed is not a member of the deck, nothing should be done and null reference will be returned.
     *
     * If a card to be removed is a member of the deck and it's the very last card within the whole deck, card in question
     * is removed by simply taking it off the end of the deck and then it's returned to the user.
     *
     * If a card to be removed is a member of the deck and it's the very first card within the whole deck, card in question
     * is removed by simply taking it off the start of the deck and then reducing mentioned deck.
     *
     * If a card to be removed is a member of the deck and it's somewhere else than a first or last position in the deck, card in
     * question is removed by simply assigning it to a temporary variable, then every remaining card within the deck is coppied
     * to a new array. Then it's content is put into an instance's property (cards' array).
     *
     * @param card
     * @returns
     */
    remove(flashcard) {
        const removedCardPosition = this.flashcards.findIndex(card => card.equals(flashcard));
        let removedFlashcard = undefined;
        if (removedCardPosition < 0)
            return removedFlashcard;
        if (removedCardPosition === 0) {
            removedFlashcard = this.flashcards.shift();
            removedFlashcard.setDeck(undefined);
            return removedFlashcard;
        }
        if (removedCardPosition === this.flashcards.length - 1) {
            removedFlashcard = this.flashcards.pop();
            removedFlashcard.setDeck(undefined);
            return removedFlashcard;
        }
        removedFlashcard = this.flashcards[removedCardPosition];
        removedFlashcard.setDeck(undefined);
        const obsoleteFlashcards = this.removeAll();
        for (let currentPosition = 0; currentPosition < obsoleteFlashcards.length; currentPosition++) {
            if (currentPosition === removedCardPosition)
                continue;
            const preservedFlashcard = obsoleteFlashcards[currentPosition];
            preservedFlashcard.setDeck(this);
            this.flashcards.push(preservedFlashcard);
        }
        return removedFlashcard;
    }
    removeAll() {
        let removedFlashcards = [];
        while (this.flashcards.length) {
            const removedFlashcard = this.flashcards.pop();
            removedFlashcard.setDeck(undefined);
            removedFlashcards.push(removedFlashcard);
        }
        return removedFlashcards;
    }
    isEmpty() {
        return this.flashcards.length === 0;
    }
    size() {
        return this.flashcards.length;
    }
}
exports.default = Deck;
