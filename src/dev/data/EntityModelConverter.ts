import { Deck, Flashcard, User } from '../model/exports';
import { DatabaseEntity, EntityRelationship } from './Database';

abstract class EntityModelConverter<Model extends any> {
    abstract convert(entity: DatabaseEntity): Model | undefined;
}

abstract class ReverseEntityModelConverter<Model extends any> {
    abstract convert(mode: Model): DatabaseEntity;
}

class DeckEntityModelConverter extends EntityModelConverter<Deck> {
    convert(entity: DatabaseEntity): Deck {
        const deck = Deck.empty(entity["name"] as string);
        deck.setId(entity["id"] as number);
        const flashcardsRelationships = (entity["flashcards"] as EntityRelationship[]);
        const flashcards = flashcardsRelationships.map(relationship => {
                                                            let notion = relationship.source["notion"] as string;
                                                            let definition = relationship.target["definition"] as string;
                                                            return new Flashcard(notion, definition);
                                                        });
        deck.insertAll(flashcards);
        return deck;
    }
}

class ReverseDeckEntityModelConverter extends ReverseEntityModelConverter<Deck> {
    convert(deck: Deck): DatabaseEntity {
        const entity: DatabaseEntity = {};
        entity["id"] = deck.getId();
        entity["name"] = deck.getName();
        entity["flashcards"] = Array.from(deck.getFlashcards())
                                    .map(flashcard => {
                                        return {
                                            source: { id: flashcard.getId(),
                                                     notion: flashcard.getNotion(),
                                                     definition: flashcard.getDefinition() },
                                            target: { id: deck.getId(),
                                                      name: deck.getName() }
                                        }
                                    });
        return entity;
    }
}

class ReverseFlashcardEntityModelConverter extends ReverseEntityModelConverter<Flashcard> {

    private readonly reverseDeckConverter = new ReverseDeckEntityModelConverter();

    convert(flashcard: Flashcard): DatabaseEntity {
        const entity: DatabaseEntity = {};
        const deckEntity = this.reverseDeckConverter.convert(flashcard.getDeck() as Deck);
        entity["id"] = flashcard.getId();
        entity["notion"] = flashcard.getNotion();
        entity["definition"] = flashcard.getDefinition();
        entity["decks"] = Array.of({
            source: { id: flashcard.getId(),
                        notion: flashcard.getNotion(),
                        definition: flashcard.getDefinition()},
            target: deckEntity
        });
        return entity;
    }
}

class FlashcardEntityModelConverter extends EntityModelConverter<Flashcard> {
    
    private readonly deckConverter = new DeckEntityModelConverter();

    convert(entity: DatabaseEntity): Flashcard | undefined {
        const flashcard = new Flashcard(entity["notion"] as string, entity["definition"] as string);
        const deckRelationship = (entity["decks"] as EntityRelationship[]);
        const decks = deckRelationship.map(relationship => this.deckConverter.convert(relationship.target as DatabaseEntity));
        flashcard.setDeck(decks[0]);
        return flashcard;
    }
}

export { DeckEntityModelConverter, ReverseDeckEntityModelConverter, FlashcardEntityModelConverter, ReverseFlashcardEntityModelConverter }
