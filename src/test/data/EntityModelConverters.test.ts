import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck, User, Definition } from '../../dev/model/exports';
import { DeckEntityModelConverter, ReverseDeckEntityModelConverter, 
            FlashcardEntityModelConverter, ReverseFlashcardEntityModelConverter, EntityRelationship } from '../../dev/data/exports';

describe("Converter | Deck to entity and conversely | Tests", () => {
    test("Should convert a deck into a database entity", () => {
        const converter = new ReverseDeckEntityModelConverter();
        const deck = Deck.of("Spanish Language | Revision | Unit 1", 
            [Flashcard.create("El paciente", [Definition.of("patient", "adjective")]), Flashcard.create("El urgente", [Definition.of("urgent", "adjective")])]
        );
        const entity = converter.convert(deck);
        expect(entity).not.toBeUndefined();
        expect(entity["name"]).toEqual("Spanish Language | Revision | Unit 1");
    });

    test("Should convert an entity back into a deck model", () => {
        const converter = new ReverseDeckEntityModelConverter();
        const reverseConverter = new DeckEntityModelConverter();
        const deck = Deck.of("Spanish Language | Revision | Unit 1", 
            [Flashcard.create("El paciente", [Definition.of("patient", "adjective")]), Flashcard.create("El urgente", [Definition.of("urgent", "adjective")])]
        );
        const entity = converter.convert(deck);

        const recreatedDeck = reverseConverter.convert(entity);
        
        expect(recreatedDeck.getName()).toEqual(deck.getName());
        expect(recreatedDeck.getFlashcards().size).toEqual(deck.getFlashcards().size);
    });

    test("Should convert a flashcard into a database entity", () => {
        const converter = new ReverseFlashcardEntityModelConverter();
        const deck = Deck.of("Spanish Language | Revision | Unit 1", 
            [Flashcard.create("El paciente", [Definition.of("patient", "adjective")]), Flashcard.create("El urgente", [Definition.of("urgent", "adjective")])]
        );

        const flashcardToBeConverted = deck.getFlashcardsByNotion("El paciente", true) as Flashcard;
        const entity = converter.convert(flashcardToBeConverted);

        expect(entity).not.toBeUndefined();
        expect(entity["notion"]).toEqual("El paciente");
        expect(entity["definitions"] as EntityRelationship[]).toHaveLength(1);
        expect(entity["decks"] as EntityRelationship[]).toHaveLength(1);
    });

    test("Should convert an entity back into a flashcard model", () => {
        const converter = new ReverseFlashcardEntityModelConverter();
        const reverseConverter = new FlashcardEntityModelConverter();

        const deck = Deck.of("Spanish Language | Revision | Unit 1", 
            [Flashcard.create("El paciente", [Definition.of("patient", "adjective")]), Flashcard.create("El urgente", [Definition.of("urgent", "adjective")])]
        );

        const flashcardToBeConverted = deck.getFlashcardsByNotion("El paciente", true) as Flashcard;
        const entity = converter.convert(flashcardToBeConverted);

        const recreatedFlashcard = reverseConverter.convert(entity);

        console.log("Recreated flashcard: \n", recreatedFlashcard);

        expect(recreatedFlashcard!.getNotion()).toEqual(flashcardToBeConverted.getNotion());
        expect(recreatedFlashcard!.getDefinitions()).toHaveLength(flashcardToBeConverted.getDefinitions().length);
        expect(recreatedFlashcard!.getDeck()!.getName()).toEqual(deck.getName());
    });
})