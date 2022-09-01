"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const KeyGenerators_1 = require("./KeyGenerators");
/**
 * This class and its class members (composition) are solely to simulate simplified database up until fully-fledged database system has been integrated.
 * Please don't take it too seriously, I just wanted to streamline implementation/testing and pretty quickly have a ready-to-use app.
 */
class Database {
    tables = new Map();
    constructor() {
        this.init();
    }
    init() {
        if (!this.tables.size) {
            this.tables.set("users", new UserTable(KeyGenerators_1.KeyGenerators.numeric(100)));
            this.tables.set("decks", new DeckTable(KeyGenerators_1.KeyGenerators.numeric(1000)));
            this.tables.set("flashcards", new FlashcardTable(KeyGenerators_1.KeyGenerators.numeric(10000)));
        }
    }
    isEmpty() {
        return this.tables.size === 0;
    }
}
exports.Database = Database;
class DatabaseTable {
    idPool;
    entities = new Map();
    latestEntityId;
    constructor(idPool) {
        this.idPool = idPool;
    }
    save(entity) {
        entity.setId(this.idPool.next());
        this.entities.set(entity.getId(), entity);
        this.latestEntityId = entity.getId();
        return this.entities.get(this.latestEntityId);
    }
    remove(id) {
        const deletedEntity = this.entities.get(id);
        if (deletedEntity)
            this.entities.delete(id);
        return deletedEntity;
    }
    update(entity) {
        if (entity.getId() || !this.exists(entity.getId()))
            return false;
        this.entities.set(entity.getId(), entity);
        return true;
    }
    exists(id) {
        return this.entities.has(id);
    }
    findById(id) {
        return this.entities.get(id);
    }
}
class UserTable extends DatabaseTable {
    findByName(name) {
        const users = [...this.entities.values()];
        return users.filter(user => name === user.getName());
    }
}
class DeckTable extends DatabaseTable {
    findByName(name) {
        const decks = [...this.entities.values()];
        return decks.filter(deck => name === deck.getName());
    }
    findByFlashcard(flashcard) {
        const decks = [...this.entities.values()];
        return decks.find(deck => deck.contains(flashcard));
    }
}
class FlashcardTable extends DatabaseTable {
    findByNotion(notion, exact = true) {
        const flashcards = [...this.entities.values()];
        if (exact)
            return flashcards.filter(flashcard => notion === flashcard.getNotion());
        else
            return flashcards.filter(flashcard => notion === flashcard.getNotion() || flashcard.getNotion().includes(notion));
    }
    findByDefinition(definition, exact = false) {
        const flashcards = [...this.entities.values()];
        if (!exact)
            return flashcards.filter(flashcard => flashcard.getDefinition().includes(definition));
        else
            return flashcards.filter(flashcard => definition === flashcard.getDefinition() || flashcard.getDefinition().includes(definition));
    }
}
