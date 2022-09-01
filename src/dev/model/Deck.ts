import Flashcard from './Flashcard';
import { KeyGenerators } from '../data/exports';
import Entity from "../data/Entity";

export default class Deck extends Entity<number> {
    private flashcards: Flashcard[] = [];
    private name: string;

    /**
     * Flashcards array's content is coppied into instance's property (cards' array)
     * in order to prevent any further manipulation except for those performed via current Deck's instance.
     * @param name 
     * @param flashcards 
     */
    constructor(name: string, flashcards: Flashcard[]) {
        super();
        this.name = name;
        this.insertAll(flashcards);
    }

    getName() {
        return this.name;
    }

    changeName(name: string) {
        this.name = name;
    }

    /**
     * Cards' array ought not to undergo any alterations except for within the scope of the deck's instance in question.
     * @returns New set containing every card from within the deck.
     */
    getFlashcards() {
        return new Set(this.flashcards);
    }

    /**
     * There might be more than one flashcard within the deck, that include the wanted notion (fully or partly).
     * Therefore, this method ought to yield a "collection" of cards.
     * @param notion 
     */
    getFlashcardsByNotion(notion: string): Flashcard[] {
        return this.flashcards.filter( flashcard => notion == flashcard.getNotion());
    }
    
    insertAll(flashcards: Flashcard[]) {
        for(let card of flashcards)
            this.insert(card);
    }

    /**
     * Every deck should be comprised of unique flashcards.
     * There's no use of adding multiple equal flashcards.
     * @param card 
     * @returns 
     */
    insert(flashcard: Flashcard): Flashcard {
        if(!this.contains(flashcard))
            this.flashcards.push(flashcard);
        return this.flashcards[this.flashcards.length - 1];
    };

    contains(flashcard: Flashcard): boolean {
        return this.flashcards.some( c => c.equals(flashcard))
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
    remove(flashcard: Flashcard): Flashcard | undefined {
        const removedCardPosition = this.flashcards.findIndex( card => card.equals(flashcard));
        let removedFlashcard: Flashcard | undefined = undefined;

        if(removedCardPosition === (this.flashcards.length))
            return removedFlashcard;

        if(removedCardPosition === 0) {
            removedFlashcard = this.flashcards.shift() as Flashcard;
            return removedFlashcard;
        }
        
        if(removedCardPosition === this.flashcards.length - 1)
            return this.flashcards.pop() as Flashcard;

        removedFlashcard = this.flashcards[removedCardPosition];
        const obsoleteFlashcards = this.removeAll();

        for(let currentPosition = 0; currentPosition < obsoleteFlashcards.length; currentPosition++) {
            if(currentPosition === removedCardPosition)
                continue;
            this.flashcards.push(obsoleteFlashcards[currentPosition]);
        }

        return removedFlashcard;
    }

    removeAll(): Flashcard[] {
        let removedFlashcards: Flashcard[] = [];
        for(let flashcard of this.flashcards)
            removedFlashcards.push(this.flashcards.pop() as Flashcard);
        return removedFlashcards.reverse();
    }

    size(): number {
        return this.flashcards.length;
    }
}
