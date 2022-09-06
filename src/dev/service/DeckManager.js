"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /**
//  * Some methods may look somewhat odd and long-winded. 
//  * Although I know, I could make them shorter and more efficient but basically, 
//  * It's due to trying simulate eg. database high-level db/orm framework operations.
//  * I do code in different programming languages both low-level and high-level and
//  * sometimes I can mix-up some habits that are peculiar to a specific language into completely
//  * different one (at least at first glance). 
//  * So please, do not penalize me or rule out right away. There's always a space for improvement. :)
//  */
// export class DeckManagerImpl implements DeckManager {
//     private readonly deckRepository: DeckRepository;
//     private readonly flashcardRepository: FlashcardRepository;
//     constructor(deckRepository: DeckRepository,
//                 flashcardRepository: FlashcardRepository) {
//         this.deckRepository = deckRepository;
//         this.flashcardRepository = flashcardRepository;
//     }
//     save(deck: Deck) {
//         return this.deckRepository.save(deck);
//     }
//     destroy(deck: Deck) {
//         return this.deckRepository.remove(deck);
//     }
//     destroyFlashcard(flashcard: Flashcard) {
//         const deck = this.deckRepository.findByFlashcard(flashcard);
//         if(!deck) return undefined;
//         const removedFlashcard = deck.remove(flashcard);
//         this.deckRepository.save(deck);
//         return removedFlashcard;
//     }
//     destroyFlashcards(flashcards: Set<Flashcard>): Set<Flashcard> {
//         const decks: Map<number, Deck> = new Map;
//         const existingFlashcards: Set<Flashcard> = new Set;
//         flashcards.forEach(flashcard => {
//             if(flashcard.getId()) {
//                 const existingFlashcard = this.flashcardRepository.findById(flashcard.getId());
//                 if(existingFlashcard) {
//                     const deck = existingFlashcard.getDeck();
//                     deck!.remove(existingFlashcard);
//                     existingFlashcards.add(existingFlashcard);
//                     decks.set(deck!.getId(), deck!);
//                 }
//             }
//         });
//         for(let deck of decks.values()) {
//             this.deckRepository.save(deck);
//         }
//         return existingFlashcards;
//     }
//     addFlashcard(flashcard: Flashcard): Flashcard | undefined {
//         if(!flashcard.getDeck())
//             return undefined;
//         else {
//             this.deckRepository.save(flashcard.getDeck() as Deck);
//             const deck = this.deckRepository.findById(flashcard.getDeck()!.getId());
//             return deck!.getFlashcardsByNotion(flashcard.getNotion(), true) as Flashcard
//         }
//     }
//     addFlashcards(flashcards: Set<Flashcard>): Set<Flashcard> {
//         const savedFlashcards: Set<Flashcard> = new Set(flashcards);
//         const decks = new Set(Array.from(savedFlashcards).flatMap( flashcard => flashcard.getDeck()));
//         decks.forEach( deck => this.deckRepository.save(deck!));
//         return savedFlashcards;
//     }
//     getDeckById(id: number): Deck | undefined {
//         return this.deckRepository.findById(id);
//     }
//     getAllDecks(): Deck[] {
//         return this.deckRepository.findAll();
//     }
// }
