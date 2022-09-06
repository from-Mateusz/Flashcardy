import Entity from "../data/Entity";
import Deck from './Deck';

export default class Flashcard extends Entity<number> {
    private deck: Deck | undefined;
    private readonly notion: string;
    private readonly definition: string;

    constructor(notion: string, definition: string, deck?: Deck) {
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

    setDeck(deck: Deck | undefined) {
        this.deck = deck;
        if(deck && !deck.contains(this))
            deck.insert(this);
    }

    equals(card: any) {
        if(card === undefined)
            return false;

        if(!(card instanceof Flashcard))
            return false;

        const otherCard = card as Flashcard;

        return (!otherCard.getId() || !this.getId() ? true : otherCard.getId() === this.getId()) &&
                otherCard.notion === this.notion && 
                otherCard.definition === this.definition;
    } 
};