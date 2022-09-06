"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTable = exports.Database = void 0;
const KeyGenerators_1 = require("./KeyGenerators");
class DatabaseTable {
    name;
    entities = new Set();
    idGenerator;
    constructor(name, idGenerator) {
        this.name = name;
        this.idGenerator = idGenerator;
    }
    save(entity) {
        entity["id"] = this.idGenerator.next();
        this.entities.add(entity);
        return entity;
    }
    getById(id) {
        let entity = undefined;
        for (let ent of this.entities) {
            if (ent["id"] !== id)
                continue;
            entity = ent;
            break;
        }
        return entity;
    }
    remove(id) {
        let removableEntity = this.getById(id);
        if (!removableEntity)
            return removableEntity;
        const remainingEntities = Array.from(this.entities).filter(ent => ent["id"] !== removableEntity["id"]).reverse();
        this.entities.clear();
        let remainingEntity = undefined;
        while ((remainingEntity = remainingEntities.pop())) {
            this.entities.add(remainingEntity);
        }
        return removableEntity;
    }
    removeAll() {
        const removableEntities = new Set(this.entities);
        this.entities.clear();
        return removableEntities;
    }
}
exports.DatabaseTable = DatabaseTable;
class Database {
    name;
    initializationDate;
    tables = new Map();
    constructor(name) {
        this.name = name;
        this.init();
    }
    static run(name) {
        return new Database(name);
    }
    init() {
        this.tables.set("Flashcard", new DatabaseTable("Flashcard", KeyGenerators_1.KeyGenerators.numeric(10000)));
        this.tables.set("Deck", new DatabaseTable("Deck", KeyGenerators_1.KeyGenerators.numeric(10000)));
        this.tables.set("User", new DatabaseTable("User", KeyGenerators_1.KeyGenerators.numeric(10000)));
        this.initializationDate = new Date();
    }
    findTable(name) {
        return this.tables.get(name);
    }
}
exports.Database = Database;
// class Database {
//     private readonly tables: Map<string, DatabaseTable<any, any>> = new Map();
//     constructor() {
//         this.init();
//     }
//     private init() {
//         if(!this.tables.size) {
//             const userTable = new UserTable(KeyGenerators.numeric(100));
//             const deckTable = new FlashcardTable(KeyGenerators.numeric(10000));
//             const flashcardTable = new DeckTable(KeyGenerators.numeric(1000));
//             const flashcardDeckRelationship = new Relationship(
//                 "FlashcardDeck",
//                 flashcardTable,
//                 deckTable
//             );
//             deckTable.setRelationship(flashcardDeckRelationship);
//             flashcardTable.setRelationship(flashcardDeckRelationship);
//             this.tables.set("user", userTable);
//             this.tables.set("deck", deckTable);
//             this.tables.set("flashcard", flashcardTable);
//         }
//     }
//     isEmpty() {
//         return this.tables.size === 0;
//     }
//     getTable(name: string) {
//         return this.tables.get(name);
//     }
// }
// /**
//  * I realize that this kind of "excessive" implementation may well be a bad practice,
//  * but I've been working for quite some time with everything related to database and
//  * I thought that it could be somewhat pleasant to try to mock database components, functions
//  * to some extent. Also, the more code you write, the more insigthful about it you're becoming.
//  * It's better to have written bad but working as planned code, than no code at all.
//  */
// class Relationship {
//     private readonly name: string;
//     private readonly source: DatabaseTable<any, any>;
//     private readonly target: DatabaseTable<any, any>;
//     constructor(name: string,
//                 source: DatabaseTable<any, any>,
//                 target: DatabaseTable<any, any>) {
//                     this.name = name;
//                     this.source = source;
//                     this.target = target;
//                 }
//     getName() {
//         return this.name;
//     }
//     getSource() {
//         return this.source;
//     }
//     getTarget() {
//         return this.target;
//     }
// }
// abstract class DatabaseTable<IdType, EntityType extends Entity<IdType>> {
//     private relationships: Relationship[] = [];
//     protected readonly idPool!: KeyGenerator<any>;
//     protected readonly entities: Map<IdType, EntityType> = new Map();
//     protected latestEntityId!: IdType;
//     constructor(idPool: KeyGenerator<IdType>) {
//         this.idPool = idPool;
//     }
//     setRelationship(relationship: Relationship) {
//         this.relationships.push(relationship);
//     }
//     relationship(name: string) {
//         return this.relationships.find( rel => name === rel.getName());
//     }
//     /**
//      * 
//      * @param entity
//      * @param deep If we want to persist entity including other entities which are in relationship with it,
//      *              we can set argument this argument to be true
//      * @returns 
//      */
//     abstract save(entity: EntityType): EntityType;
//     saveAll(entities: EntityType[]) {
//         entities.forEach(entity => this.save(entity));
//         return this.entities.get(this.latestEntityId);
//     }
//     remove(id: IdType) {
//         const deletedEntity = this.entities.get(id);
//         if(deletedEntity)
//             this.entities.delete(id);
//         return deletedEntity;
//     }
//     removeAll(ids: Set<IdType>) {
//         let lastRemovedEntity: EntityType | undefined = undefined; 
//         for(let id of ids) {
//             lastRemovedEntity = this.remove(id);
//         }
//         return lastRemovedEntity;
//     }
//     update(entity: EntityType) {
//         if(entity.getId() || !this.exists(entity.getId()))
//             return this.save(entity);
//             this.entities.set(entity.getId(), entity);
//         return this.entities.get(entity.getId()) as EntityType;
//     }
//     exists(id: IdType) {
//         return this.entities.has(id);
//     }
//     findById(id: IdType) {
//         return this.entities.get(id);
//     }
//     findAll() {
//         return Array.from(this.entities.values());
//     }
// }
// class UserTable extends DatabaseTable<number, User> {
//     save(entity: User): User {
//         return entity;
//     }
//     findByName(name: string) {
//         const users = [...this.entities.values()];
//         return users.filter( user => name === user.getName());
//     }
// }
// class DeckTable extends DatabaseTable<number, Deck> {
//     save(deck: Deck) {
//         deck.setId(this.idPool.next());
//         this.entities.set(deck.getId(), deck);
//         this.latestEntityId = deck.getId();
//         const savedDeck = this.entities.get(this.latestEntityId) as Deck;
//         const flashcardTableRelationship = this.relationship("FlashcardDeck");
//         const flashcardTable = flashcardTableRelationship!.getSource() as FlashcardTable;
//         flashcardTable.saveAll(Array.from(savedDeck.getFlashcards()));
//         return savedDeck;
//     }
//     update(deck: Deck) {
//         const flashcardTableRelationship = this.relationship("FlashcardDeck");
//         const flashcardTable = flashcardTableRelationship!.getSource() as FlashcardTable;
//         deck.getFlashcards().forEach( flashcard => {
//             if(!flashcard.getId())
//                 flashcardTable.save(flashcard);
//             else
//                 flashcardTable.update(flashcard);
//         });
//         return super.update(deck);
//     }
//     remove(deckId: number) {
//         const flashcardTableRelationship = this.relationship("FlashcardDeck");
//         const flashcardTable = flashcardTableRelationship!.getSource() as FlashcardTable;
//         const removedDeck = this.entities.get(deckId);
//         const removedFlashcardsIds = new Set(Array.from(removedDeck?.getFlashcards() || [])
//                                                     .flatMap( flashcard => flashcard.getId()));
//         flashcardTable.removeAll(removedFlashcardsIds);
//         return super.remove(deckId);
//     }
//     findByName(name: string, exact: boolean) {
//         const decks = [...this.entities.values()];
//         if(exact)
//             return decks.filter(deck => name === deck.getName())
//         return decks.filter(deck => name === deck.getName() || deck.getName().includes(name));
//     }
//     findByFlashcard(flashcard: Flashcard) {
//         const decks = [...this.entities.values()];
//         return decks.find(deck => deck.contains(flashcard));
//     }
// }
// class FlashcardTable extends DatabaseTable<number, Flashcard> {
//     save(flashcard: Flashcard) {
//         flashcard.setId(this.idPool.next());
//         this.entities.set(flashcard.getId(), flashcard);
//         this.latestEntityId = flashcard.getId();
//         const savedFlashcard = this.entities.get(this.latestEntityId) as Flashcard;
//         const deckTableRelationship = this.relationship("FlashcardDeck");
//         const deckTable = deckTableRelationship!.getTarget() as DeckTable;
//         savedFlashcard.getDeck();
//         // deckTable.save(flashcard.getDeck() as Deck);
//         return flashcard;
//     }
//     findByNotion(notion: string, exact: boolean) {
//         const flashcards = [...this.entities.values()];
//         if(exact)
//             return flashcards.filter( flashcard => notion === flashcard.getNotion());
//         else
//             return flashcards.filter( flashcard => notion === flashcard.getNotion() || flashcard.getNotion().includes(notion));
//     }
//     findByDefinition(definition: string, exact: boolean) {
//         const flashcards = [...this.entities.values()];
//         if(!exact)
//             return flashcards.filter( flashcard => flashcard.getDefinition().includes(definition));
//         else
//             return flashcards.filter( flashcard => definition === flashcard.getDefinition() || flashcard.getDefinition().includes(definition));
//     }
// }
