import { describe, expect, test } from '@jest/globals';
import { Flashcard, Definition, Deck } from '../../dev/model/exports';

describe('Deck of flashcards model/module', () => {
     test('should create a new deck of flashcards', () => {

         const deckName = 'English C1/C2 level | Revision | Unit 10';
         const flashcards = [ Flashcard.create("to size up", [Definition.of("to think carefully and form an opinion about a person or situation")]),
                             Flashcard.create("a fat lot of good/help/use", [Definition.of("no use or help at all")]),
                            Flashcard.create("in high spirits", [Definition.of("in a good mood")]) ];
         const deck = Deck.of(deckName, flashcards);

         expect(deck.getName()).toEqual(deckName)
         expect(deck.size()).toEqual(flashcards.length);
     });

     test('should remove one flashcard from a deck', () => {

         const deckName = 'Spanish | Revision';
         const flashcards = [ Flashcard.create("importante", [Definition.of("important", "adjective")]),
                                Flashcard.create("atractivo", [Definition.of("attraction, appeal", "noun"), Definition.of("appealing", "adjective")]),
                                Flashcard.create("optimista", [Definition.of("optimist", "noun")])];
         const deck = Deck.of(deckName, flashcards);

         const removedFlashcard = deck.remove(flashcards[0]);

         expect(deck.size()).toBeLessThan(flashcards.length);
         expect(removedFlashcard?.getDeck()).toBeUndefined();
     });

     test('should clear a deck', () => {

        const deckName = 'Spanish | Revision';
        const flashcards = [ Flashcard.create("importante", [Definition.of("important", "adjective")]),
                               Flashcard.create("atractivo", [Definition.of("attraction, appeal", "noun"), Definition.of("appealing", "adjective")]),
                               Flashcard.create("optimista", [Definition.of("optimist", "noun")])];
        const deck = Deck.of(deckName, flashcards);
    
         const removedFlashcards = deck.removeAll();

         expect(removedFlashcards.length).toEqual(flashcards.length);
         expect(deck.isEmpty()).toBeTruthy();
     });

     test('should create an empty deck and then put random flashcards into it', () => {

            const deckName = 'English C1/C2 level | Revision | Unit 10';
            const flashcards = [ Flashcard.create("to size up", [Definition.of("to think carefully and form an opinion about a person or situation")]),
                            Flashcard.create("a fat lot of good/help/use", [Definition.of("no use or help at all")]),
                           Flashcard.create("in high spirits", [Definition.of("in a good mood")]) ];

             const deck = Deck.empty(deckName);
             deck.insert(flashcards[0]);
             deck.insertAll([flashcards[1], flashcards[2]])
             expect(deck.getFlashcards().size).toEqual(3);
     });
});

