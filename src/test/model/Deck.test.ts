import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck } from '../../dev/model/exports';

describe('Deck of flashcards model/module', () => {
    test('should create a new deck of flashcards', () => {

        const deckName = 'English C1/C2 level | Revision | Unit 10';
        const flashcards = [ new Flashcard("to size up", "to think carefully and form an opinion about a person or situation"),
                            new Flashcard("a fat lot of good/help/use", "no use or help at all"),
                            new Flashcard("in high spirits", "in a good mood")];

        const deck = new Deck(deckName, flashcards);

        expect(deck.getName()).toEqual(deckName)
        expect(deck.size()).toEqual(flashcards.length);
    });
});

