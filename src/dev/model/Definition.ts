import Entity from "../data/Entity";
import Flashcard from "./Flashcard";

export default class Definition extends Entity<number> {
    private content: string;
    private label?: string;
    private flashcard?: Flashcard;

    private constructor(content: string, label?: string, flashcard?: Flashcard) {
        super();
        this.content = content;
        this.label = label;
        this.flashcard = flashcard;
    }

    static of(content: string, label?: string, flashcard?: Flashcard): Definition {
        return new Definition(content, label, flashcard);
    }

    changeContent(content: string) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    changeLabel(label: string) {
        this.label = label;
    }

    getLabel() {
        return this.label;
    }

    changeFlashcard(flashcard: Flashcard) {
        this.flashcard = flashcard;
    }

    getFlashcard() {
        return this.flashcard;
    }
}