import { describe, expect, test } from '@jest/globals';
import { Flashcard, Deck, User } from '../../dev/model/exports';
import { KeyGenerators } from '../../dev/data/exports';

describe('Different Key Generators examination', () => {
    test('Should return numbers from 0 to 10', () => {
        const generator = KeyGenerators.numeric(10);
        let key = 0;
        let firstKey = -1;
        let lastKey = -1;
        while((key = generator.next()) >= 0) {
            if(firstKey === -1)
                firstKey = key;
            lastKey = key;
        }

        expect(firstKey).toEqual(0);
        expect(lastKey).toEqual(10);
    });
});