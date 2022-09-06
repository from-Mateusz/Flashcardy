import Flashcard from "./Flashcard"
import Deck from "./Deck"
import Entity from "../data/Entity";

export default class User extends Entity<number> {
    
    private readonly decks: Deck[] = [];

    private name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    };

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
    createDeck(name: string, flashcards: Flashcard[]): Deck | undefined {
        const existingDeck = this.getDeck(name);
        
        if(existingDeck) {
            existingDeck.insertAll(flashcards);
            return existingDeck;
        }

        const brandNewDeck = Deck.of(name, flashcards);
        this.decks.push(brandNewDeck);
        return brandNewDeck;
    }

    hasDeck(name: string) {
        if(this.getDeck(name))
            return true;
        return false;
    }

    getDeck(name: string): Deck | undefined {
        return this.decks.find( deck => name === deck.getName());
    }
}