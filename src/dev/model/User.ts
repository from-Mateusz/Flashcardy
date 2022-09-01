import Flashcard from "./Flashcard"
import Deck from "./Deck"
import { KeyGenerators } from '../data/exports';
import Entity from "../data/Entity";

const idGenerator = KeyGenerators.numeric(100);

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

        const brandNewDeck = new Deck(name, flashcards);
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
    getFlashcardsByNotion(notion: string, exact: boolean) {
        const flashcards = this.decks.flatMap( deck => deck.getFlashcardsByNotion(notion));
    
        const selectedFlashcards: Flashcard[] = [];
        
        if(exact) {
            for(let flashcard of flashcards)
                if(notion === flashcard.getNotion())
                    selectedFlashcards.push(flashcard);
        }
        else {
            for(let flashcard of flashcards)
                if(flashcard.getNotion().includes(notion))
                    selectedFlashcards.push(flashcard);
        }

        return selectedFlashcards;
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