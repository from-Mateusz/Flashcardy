import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck } from '../../dev/model/exports';

describe('Deck of flashcards model/module', () => {
     test('should create a new deck of flashcards', () => {

         const deckName = 'English C1/C2 level | Revision | Unit 10';
         const flashcards = [ new Flashcard("to size up", "to think carefully and form an opinion about a person or situation"),
                             new Flashcard("a fat lot of good/help/use", "no use or help at all"),
                             new Flashcard("in high spirits", "in a good mood")];
         const deck = Deck.of(deckName, flashcards);

         expect(deck.getName()).toEqual(deckName)
         expect(deck.size()).toEqual(flashcards.length);
     });

     test('should remove one flashcard from a deck', () => {

         const deckName = 'Spanish | Revision';
         const flashcards = [ new Flashcard("importante", "important"),
                             new Flashcard("atractivo", "attraction, appeal, attractive"),
                             new Flashcard("optimista", "optimistic")];
         const deck = Deck.of(deckName, flashcards);

         const removedFlashcard = deck.remove(flashcards[0]);

         expect(deck.size()).toBeLessThan(flashcards.length);
         expect(removedFlashcard?.getDeck()).toBeUndefined();
     });

     test('should clear a deck', () => {

         const deckName = 'Spanish | Revision';
         const flashcards = [ new Flashcard("importante", "important"),
                             new Flashcard("atractivo", "attraction, appeal, attractive"),
                             new Flashcard("optimista", "optimistic")];
         const deck = Deck.of(deckName, flashcards);
    
         const removedFlashcards = deck.removeAll();

         expect(removedFlashcards.length).toEqual(flashcards.length);
         expect(deck.isEmpty()).toBeTruthy();
     });

     test('should create an empty deck and then put random flashcards into it', () => {

             const deckName = 'English C1/C2 level | Revision | Unit 10';

             const deck = Deck.empty(deckName);
             deck.insert(new Flashcard("to size up", "to think carefully and form an opinion about a person or situation"));
             deck.insertAll([ new Flashcard("a fat lot of good/help/use", "no use or help at all"),
                              new Flashcard("in high spirits", "in a good mood")]);
             expect(deck.getFlashcards().size).toEqual(3);
     });
});

