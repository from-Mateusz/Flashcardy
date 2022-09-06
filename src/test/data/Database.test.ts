import { describe, expect, test } from '@jest/globals';
// import { Flashcard, Deck, User } from '../../dev/model/exports';
import { KeyGenerators, Database, DatabaseEntity, DatabaseTable, } from '../../dev/data/exports';

describe("Database mock tests", () => {
    test("Should create and initialize database with necessary tables", () => {
        const db = Database.run("Application DB");
        const flashcardTable = db.findTable("Flashcard");
        expect(flashcardTable).not.toBeUndefined();
    });
})