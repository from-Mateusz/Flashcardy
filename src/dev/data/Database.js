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
