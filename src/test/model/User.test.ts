import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck, User } from '../../dev/model/exports';

const yourCEO = new User("Mateusz");

describe('User model/module behavior', ()=> {
     test('Should create own deck of flashcards', () => {
         const deckName = 'Spanish B1 | Revision | Unit 1';
         const flashcards = [
             new Flashcard('camion', 'truck or lorry'),
             new Flashcard('primorosa', 'exquisite')
         ];

         const deck = yourCEO.createDeck(deckName, flashcards);
         expect(deck?.getName()).toEqual(deckName);
         expect(deck?.contains(flashcards[0])).toBeTruthy();
     });
});