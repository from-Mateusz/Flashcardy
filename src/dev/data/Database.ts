import {Flashcard, Deck, User} from '../model/exports';
import { KeyGenerator, KeyGenerators } from './KeyGenerators';
import Entity from './Entity';

/**
 * This class and its class members (composition) are solely to simulate simplified database up until fully-fledged database system has been integrated.
 * Please don't take it too seriously, I just wanted to streamline implementation/testing and pretty quickly have a ready-to-use app.
 */
class Database {
    private readonly tables: Map<string, DatabaseTable<any, any>> = new Map();

    constructor() {
        this.init();
    }

    private init() {
        if(!this.tables.size) {
            this.tables.set("users", new UserTable(KeyGenerators.numeric(100)));
            this.tables.set("decks", new DeckTable(KeyGenerators.numeric(1000)));
            this.tables.set("flashcards", new FlashcardTable(KeyGenerators.numeric(10000)));
        }
    }

    isEmpty() {
        return this.tables.size === 0;
    }
}

abstract class DatabaseTable<IdType, EntityType extends Entity<IdType>> {
    private readonly idPool!: KeyGenerator<any>;
    protected readonly entities: Map<IdType, EntityType> = new Map();
    private latestEntityId!: IdType;

    constructor(idPool: KeyGenerator<IdType> ) {
        this.idPool = idPool;
    }

    save(entity: EntityType) {
        entity.setId(this.idPool.next());
        this.entities.set(entity.getId(), entity);
        this.latestEntityId = entity.getId();
        return this.entities.get(this.latestEntityId);
    }

    remove(id: IdType) {
        const deletedEntity = this.entities.get(id);
        if(deletedEntity)
            this.entities.delete(id);
        return deletedEntity;
    }

    update(entity: EntityType) {
        if(entity.getId() || !this.exists(entity.getId()))
            return false;
        
            this.entities.set(entity.getId(), entity);
        return true;
    }

    exists(id: IdType) {
        return this.entities.has(id);
    }

    findById(id: IdType) {
        return this.entities.get(id);
    }
}

class UserTable extends DatabaseTable<number, User> {
    findByName(name: string) {
        const users = [...this.entities.values()];
        return users.filter( user => name === user.getName());
    }
}

class DeckTable extends DatabaseTable<number, Deck> {
    findByName(name: string) {
        const decks = [...this.entities.values()];
        return decks.filter(deck => name === deck.getName());
    }

    findByFlashcard(flashcard: Flashcard) {
        const decks = [...this.entities.values()];
        return decks.find(deck => deck.contains(flashcard));
    }
}

class FlashcardTable extends DatabaseTable<number, Flashcard> {
    findByNotion(notion: string, exact: boolean = true) {
        const flashcards = [...this.entities.values()];
        if(exact)
            return flashcards.filter( flashcard => notion === flashcard.getNotion());
        else
            return flashcards.filter( flashcard => notion === flashcard.getNotion() || flashcard.getNotion().includes(notion));
    }

    findByDefinition(definition: string, exact: boolean = false) {
        const flashcards = [...this.entities.values()];
        if(!exact)
            return flashcards.filter( flashcard => flashcard.getDefinition().includes(definition));
        else
            return flashcards.filter( flashcard => definition === flashcard.getDefinition() || flashcard.getDefinition().includes(definition));
    }
}

export { Database }