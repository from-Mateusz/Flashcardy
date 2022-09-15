"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseFlashcardEntityModelConverter = exports.FlashcardEntityModelConverter = exports.ReverseDeckEntityModelConverter = exports.DeckEntityModelConverter = void 0;
const exports_1 = require("../model/exports");
class EntityModelConverter {
}
class ReverseEntityModelConverter {
}
class DeckEntityModelConverter extends EntityModelConverter {
    convert(entity) {
        const deck = exports_1.Deck.empty(entity["name"]);
        deck.setId(entity["id"]);
        const flashcardsRelationships = entity["flashcards"];
        const flashcards = flashcardsRelationships.map(relationship => {
            const id = relationship.source["id"];
            const notion = relationship.source["notion"];
            const definitions = relationship.source["definitions"]
                .map(relationship => {
                const id = relationship.source["id"];
                const content = relationship.source["content"];
                const label = relationship.source["label"];
                const definition = exports_1.Definition.of(content, label);
                definition.setId(id);
                return definition;
            });
            return exports_1.Flashcard.create(notion, definitions);
        });
        deck.insertAll(flashcards);
        return deck;
    }
}
exports.DeckEntityModelConverter = DeckEntityModelConverter;
class ReverseDeckEntityModelConverter extends ReverseEntityModelConverter {
    convert(deck) {
        const entity = {};
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
                            };
                        })
                    ] },
                target: { id: deck.getId(),
                    name: deck.getName() }
            };
        });
        return entity;
    }
}
exports.ReverseDeckEntityModelConverter = ReverseDeckEntityModelConverter;
class ReverseFlashcardEntityModelConverter extends ReverseEntityModelConverter {
    reverseDeckConverter = new ReverseDeckEntityModelConverter();
    convert(flashcard) {
        const entity = {};
        const deckEntity = this.reverseDeckConverter.convert(flashcard.getDeck());
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
            };
        });
        entity["decks"] = Array.of({
            source: { id: flashcard.getId(),
                notion: flashcard.getNotion(),
                definition: flashcard.getDefinition() },
            target: deckEntity
        });
        return entity;
    }
}
exports.ReverseFlashcardEntityModelConverter = ReverseFlashcardEntityModelConverter;
class FlashcardEntityModelConverter extends EntityModelConverter {
    deckConverter = new DeckEntityModelConverter();
    convert(entity) {
        const id = entity["id"];
        const notion = entity["notion"];
        const definitions = entity["definitions"]
            .map(relationship => {
            const id = relationship.source["id"];
            const content = relationship.source["content"];
            const label = relationship.source["label"];
            const definition = exports_1.Definition.of(content, label);
            definition.setId(id);
            return definition;
        });
        const flashcard = exports_1.Flashcard.create(notion, definitions);
        flashcard.setId(id);
        const deckRelationship = entity["decks"];
        const decks = deckRelationship.map(relationship => this.deckConverter.convert(relationship.target));
        flashcard.setDeck(decks[0]);
        return flashcard;
    }
}
exports.FlashcardEntityModelConverter = FlashcardEntityModelConverter;
