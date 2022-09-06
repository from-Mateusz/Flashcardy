"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardRandomizer = void 0;
const fs = __importStar(require("fs"));
class FlashcardRandomizer {
    static AUX_FICTIOUS_DEFINITIONS_LISTING = "../../resources/guesswork.json";
    /**
     * This method outcome is a and object containing flashcard to notion to be guessed and possible definitions.
     * Only one definition is correct and comes from the flashcard with the given notion to be guessed.
     * @param guessableFlashcard
     * @param deck
     * @param fakeDefinitions number of incorrect definitions to be displayed. Bear in your mind that total number of definitions
     * is the outcome of formula: guessableFlashcardDefinition + incorrectDefinitions
     * @param fn callback function (user defined "do whatever you like" function which operates on a formed guesswork object)
     */
    static randomize(guessableFlashcard, fakeDefinitionsLimit, fn) {
        const deck = guessableFlashcard.getDeck();
        if (!deck)
            fn(undefined);
        else {
            const fakeDefinitions = [];
            const remainingDeckFlashcardDefinitions = Array.from(deck.getFlashcards())
                .filter(flashcard => !flashcard.equals(guessableFlashcard))
                .map(flashcard => flashcard.getDefinition());
            if (remainingDeckFlashcardDefinitions.length === fakeDefinitionsLimit) {
                fn({ notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: remainingDeckFlashcardDefinitions });
            }
            if (remainingDeckFlashcardDefinitions.length > fakeDefinitionsLimit) {
                const fakeDefinitionsIndexes = new Set();
                while (fakeDefinitionsIndexes.size < fakeDefinitionsLimit) {
                    const randomIndex = Math.floor(Math.random() * remainingDeckFlashcardDefinitions.length - 1) + 1;
                    fakeDefinitionsIndexes.add(randomIndex);
                }
                fn({ notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: Array.from(fakeDefinitionsIndexes)
                        .map(i => remainingDeckFlashcardDefinitions[i]) });
            }
            FlashcardRandomizer.assortRandomDefinitions(fakeDefinitionsLimit - remainingDeckFlashcardDefinitions.length, (definitions) => {
                fn({ notion: guessableFlashcard.getNotion(),
                    realDefinition: guessableFlashcard.getDefinition(),
                    fakeDefinitions: [...remainingDeckFlashcardDefinitions, ...definitions] });
            });
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
    static assortRandomDefinitions(limit, fn) {
        this.loadAuxiliaryFictiousDefinitions((definitions) => {
            const presets = definitions['presets'];
            const randomPresetDefinitions = (presets[Math.floor(Math.random() * presets.length - 1) + 1])['definitions'];
            const selectedDefinitions = [];
            if (limit == 1)
                selectedDefinitions.push(randomPresetDefinitions[Math.floor(Math.random() * randomPresetDefinitions.length - 1) + 1]);
            else {
                const selectedDefinitionsIndexes = new Set();
                while ((selectedDefinitionsIndexes.size) < limit) {
                    selectedDefinitionsIndexes.add(Math.floor(Math.random() * randomPresetDefinitions.length - 1) + 1);
                }
                for (let definitionIndex of selectedDefinitionsIndexes)
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
    static async loadAuxiliaryFictiousDefinitions(fn) {
        fs.readFile(this.AUX_FICTIOUS_DEFINITIONS_LISTING, { encoding: 'utf8' }, (err, data) => fn(JSON.parse(data)));
    }
}
exports.FlashcardRandomizer = FlashcardRandomizer;
