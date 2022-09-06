import { Deck, Flashcard } from '../model/exports';
import * as fs from 'fs';

export type Guesswork = {
    notion: string;
    realDefinition: string;
    fakeDefinitions: string[];
}

export class FlashcardRandomizer {

    private static readonly AUX_FICTIOUS_DEFINITIONS_LISTING = "../../resources/guesswork.json"

    /**
     * This method outcome is a and object containing flashcard to notion to be guessed and possible definitions.
     * Only one definition is correct and comes from the flashcard with the given notion to be guessed.
     * @param guessableFlashcard 
     * @param deck 
     * @param fakeDefinitions number of incorrect definitions to be displayed. Bear in your mind that total number of definitions
     * is the outcome of formula: guessableFlashcardDefinition + incorrectDefinitions
     * @param fn callback function (user defined "do whatever you like" function which operates on a formed guesswork object)
     */
    static randomize(guessableFlashcard: Flashcard, fakeDefinitionsLimit: number, fn: (guesswork: Guesswork | undefined) => void ) {
        const deck = guessableFlashcard.getDeck();

        if(!deck)
            fn(undefined);
        else {
            const fakeDefinitions: string[] = [];
            const remainingDeckFlashcardDefinitions = Array.from(deck.getFlashcards())
                                                            .filter( flashcard => !flashcard.equals(guessableFlashcard))
                                                            .map( flashcard => flashcard.getDefinition());

            if(remainingDeckFlashcardDefinitions.length === fakeDefinitionsLimit) {
                fn({notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: remainingDeckFlashcardDefinitions});
            }

            if(remainingDeckFlashcardDefinitions.length > fakeDefinitionsLimit)
            {
                const fakeDefinitionsIndexes: Set<number> = new Set();
                while(fakeDefinitionsIndexes.size < fakeDefinitionsLimit) {
                    const randomIndex = Math.floor(Math.random() * remainingDeckFlashcardDefinitions.length - 1) + 1;
                    fakeDefinitionsIndexes.add(randomIndex);
                }


                fn({notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: Array.from(fakeDefinitionsIndexes)
                                        .map(i => remainingDeckFlashcardDefinitions[i])});
            }

            FlashcardRandomizer.assortRandomDefinitions(fakeDefinitionsLimit - remainingDeckFlashcardDefinitions.length, (definitions) => {
                fn({notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: [...remainingDeckFlashcardDefinitions, ...definitions]});
            })
        }
    }
    
    /**
     * There also might be a situation which in a deck from which a flashcard comes from, doesn't posses enought flashcards needed for forming
     * required number of false definitions. Hence shall the lacking definitions be imported from somewhere else eg. external file.
     * This method loads listing comprised of random preset unrelated definitions sets and simply randomly select requested number of definitions from randomly
     * choosen set.
     * @param limit
     * @param fn 
     */
    private static assortRandomDefinitions(limit: number, fn: (definitions: string[]) => void) {
        this.loadAuxiliaryFictiousDefinitions((definitions) => {
            const presets = definitions['presets'] as Array<any>;
            const randomPresetDefinitions = (presets[ Math.floor(Math.random() * presets.length - 1) + 1])['definitions'] as Array<string>;
            const selectedDefinitions: string[] = [];

            if(limit == 1) 
                selectedDefinitions.push(randomPresetDefinitions[Math.floor(Math.random() * randomPresetDefinitions.length - 1) + 1]);
            else {
                const selectedDefinitionsIndexes: Set<number> = new Set();
                while((selectedDefinitionsIndexes.size) < limit) {
                    selectedDefinitionsIndexes.add(Math.floor(Math.random() * randomPresetDefinitions.length - 1) + 1);
                }
                
                for(let definitionIndex of selectedDefinitionsIndexes)
                    selectedDefinitions.push(randomPresetDefinitions[definitionIndex]);
            }

            fn(selectedDefinitions);
        });
    }

    /**
     * In case a deck from which a flashcard to be guessed comes, posses less than requested incorrect definitions number,
     * shall the lacking definitions be imported from the listing with a predefined, totally unrelated definitions just
     * to bridge the gap between correct and incorrect ones and do have no affect on user experience.
     * Temporalily definitions are loaded from external file, but ultimate goal is to load them from integrated databse
     * of choice.
     */
    private static async loadAuxiliaryFictiousDefinitions(fn: (definitions: any) => void) {
        fs.readFile(this.AUX_FICTIOUS_DEFINITIONS_LISTING, {encoding: 'utf8'}, (err, data) => fn(JSON.parse(data)));
    }
}