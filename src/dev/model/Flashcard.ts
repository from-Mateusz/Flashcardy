import Entity from "../data/Entity";
import Deck from './Deck';
import Definition from "./Definition";

export default class Flashcard extends Entity<number> {
    private deck: Deck | undefined;
    private readonly notion: string;
    private readonly definition: string;
    private readonly definitions: Definition[] = [];

    // constructor(notion: string, definition: string, deck?: Deck) {
    //     super();
    //     this.notion = notion;
    //     this.definition = definition;
    //     this.setDeck(deck);
    // }

    private constructor(notion: string, definitions: Definition[], deck?: Deck) {
        super();
        this.notion = notion;
        this.definitions = definitions;
        this.setDeck(deck);
    }

    static create(notion: string, definitions: Definition[], deck?: Deck) {
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

    getDefinitions(): Definition[] {
        return [...this.definitions];
    }

    setDefinitions(definitions: Definition[]) {
        for(let definition of definitions) {
            if(!definition.getFlashcard())
                definition.changeFlashcard(this);
            this.definitions.push(definition);
        }
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