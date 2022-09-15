import {Flashcard, Deck, User} from '../model/exports';
import { KeyGenerator, KeyGenerators } from './KeyGenerators';
import Entity from './Entity';

/**
 * This class and its class members (composition) are solely to simulate simplified database up until fully-fledged database system has been integrated.
 * Please don't take it too seriously, I just wanted to streamline implementation/testing and pretty quickly have a ready-to-use app.
 */

type EntityRelationship = {
    source: DatabaseEntity;
    target: DatabaseEntity;
}

 type DatabaseEntity = {
    [key: string]: string | number | EntityRelationship[] | undefined
}

class DatabaseTable {
    private name: string;
    private entities: Set<DatabaseEntity> = new Set();
    private readonly idGenerator: KeyGenerator<number>;

    constructor(name: string,
                idGenerator: KeyGenerator<number>) {
        this.name = name;
        this.idGenerator = idGenerator;
    }

    save(entity: DatabaseEntity): DatabaseEntity {
        entity["id"] = this.idGenerator.next();
        this.entities.add(entity);
        return entity;
    }

    getById(id: number): DatabaseEntity | undefined {
        let entity: DatabaseEntity | undefined = undefined;
        for(let ent of this.entities) {
            if(ent["id"] !== id)
                continue;
            
            entity = ent;
            break;
        }
        return entity;
    }

    remove(id: number): DatabaseEntity | undefined {
        let removableEntity: DatabaseEntity | undefined = this.getById(id);
        if(!removableEntity)
            return removableEntity;
        
        const remainingEntities = Array.from(this.entities).filter(ent => ent["id"] !== removableEntity!["id"]).reverse();
        this.entities.clear();

        let remainingEntity: DatabaseEntity | undefined = undefined;
        while((remainingEntity = remainingEntities.pop())) {
            this.entities.add(remainingEntity)
        }
        return removableEntity;
    }

    removeAll(): Set<DatabaseEntity> {
        const removableEntities = new Set(this.entities);
        this.entities.clear();
        return removableEntities;
    }
}
 
class Database {
    private name: string;
    private initializationDate: Date;
    private readonly tables: Map<string, DatabaseTable> = new Map();

    private constructor(name: string) {
        this.name = name;
        this.init();
    }

    static run(name: string): Database {
        return new Database(name);
    }
 
    private init() {
        this.tables.set("Flashcard", new DatabaseTable("Flashcard", KeyGenerators.numeric(10000)))
        this.tables.set("Deck", new DatabaseTable("Deck", KeyGenerators.numeric(10000)));
        this.tables.set("User", new DatabaseTable("User", KeyGenerators.numeric(10000)));
        this.initializationDate = new Date();
    }

    findTable(name: string): DatabaseTable | undefined {
        return this.tables.get(name);
    }
}

export { Database, DatabaseTable, DatabaseEntity, EntityRelationship }