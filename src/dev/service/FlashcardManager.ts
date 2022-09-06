import { Flashcard } from '../model/exports';

export interface FlashcardManager {
    save(flashcard: Flashcard): Flashcard;
    remove(flashcard: Flashcard): Flashcard;
    findByNotion(notion: string, exact: boolean): Set<Flashcard>;
    findByDefinition(definition: string, exact: boolean): Set<Flashcard>
}
