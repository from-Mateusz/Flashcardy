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
            let notion = relationship.source["notion"];
            let definition = relationship.target["definition"];
            return new exports_1.Flashcard(notion, definition);
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
                    definition: flashcard.getDefinition() },
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
        entity["definition"] = flashcard.getDefinition();
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
        const flashcard = new exports_1.Flashcard(entity["notion"], entity["definition"]);
        const deckRelationship = entity["decks"];
        const decks = deckRelationship.map(relationship => this.deckConverter.convert(relationship.target));
        flashcard.setDeck(decks[0]);
        return flashcard;
    }
}
exports.FlashcardEntityModelConverter = FlashcardEntityModelConverter;
