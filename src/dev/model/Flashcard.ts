import { KeyGenerators } from '../data/exports';
import Entity from "../data/Entity";

export default class Flashcard extends Entity<number> {
    private readonly notion: string;
    private readonly definition: string;

    constructor(notion: string, definition: string) {
        super();
        this.notion = notion;
        this.definition = definition;
    }

    getNotion() {
        return this.notion;
    }

    getDefinition() {
        return this.definition;
    }

    equals(card: any) {
        if(card === null)
            return false;

        if( !(card instanceof Flashcard) )
            return false;

        return (!card.getId() ? true : card.getId() === this.getId()) && 
                card.notion === this.notion && 
                    card.definition === this.definition;
    } 
};