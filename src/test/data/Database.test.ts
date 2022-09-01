import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck, User } from '../../dev/model/exports';
import { Database } from "../../dev/data/exports";

describe("Database mock tests", () => {
    test("Should create and initialize database", () => {
        const database = new Database();
        expect(database.isEmpty()).toBeFalsy();
    })
});