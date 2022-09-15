import { Deck, Flashcard, Definition, User } from '../model/exports';
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
            const id = relationship.source["id"] as number | undefined;
            const notion = relationship.source["notion"] as string;
            const definitions = (relationship.source["definitions"] as EntityRelationship[])
                                                                                .map(relationship => {
                                                                                    const id = relationship.source["id"];
                                                                                    const content = relationship.source["content"];
                                                                                    const label = relationship.source["label"];

                                                                                    const definition = Definition.of(content as string, label as string | undefined);
                                                                                    definition.setId(id as number);
                                                                                    return definition;
                                                                                });
                                                            return Flashcard.create(notion, definitions);
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
                                                     definitions: [
                                                        ...flashcard.getDefinitions()
                                                                    .map(definition => {
                                                                        return {
                                                                            source: {
                                                                                id: definition.getId(),
                                                                                content: definition.getContent(),
                                                                                label: definition.getLabel()
                                                                            },
                                                                            target: {
                                                                                id: flashcard.getId(),
                                                                                notion: flashcard.getNotion()
                                                                            }
                                                                        }
                                                                    })
                                                     ]},
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
        entity["definitions"] = flashcard.getDefinitions()
                                    .map(definition => {
                                        return {
                                            source: {
                                                id: definition.getId(),
                                                content: definition.getContent(),
                                                label: definition.getLabel()
                                            },
                                            target: entity
                                        }
                                    })
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
        const id = entity["id"] as number;
        const notion = entity["notion"] as string;
        const definitions = (entity["definitions"] as EntityRelationship[])
                                .map(relationship => {
                                    const id = relationship.source["id"];
                                    const content = relationship.source["content"];
                                    const label = relationship.source["label"];

                                    const definition = Definition.of(content as string, label as string | undefined);
                                    definition.setId(id as number);
                                    return definition;
                                });
        const flashcard = Flashcard.create(notion, definitions);
        flashcard.setId(id);
        const deckRelationship = (entity["decks"] as EntityRelationship[]);
        const decks = deckRelationship.map(relationship => this.deckConverter.convert(relationship.target as DatabaseEntity));
        flashcard.setDeck(decks[0]);
        return flashcard;
    }
}

export { DeckEntityModelConverter, ReverseDeckEntityModelConverter, FlashcardEntityModelConverter, ReverseFlashcardEntityModelConverter }
