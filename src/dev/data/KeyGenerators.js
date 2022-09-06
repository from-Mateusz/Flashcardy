"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyGenerators = exports.KeyGenerator = void 0;
const Exceptions_1 = require("./Exceptions");
class KeyGenerator {
}
exports.KeyGenerator = KeyGenerator;
class NumericKeyGenerator extends KeyGenerator {
    generator;
    last;
    constructor(limit) {
        super();
        if (limit <= 0)
            throw new Exceptions_1.KeyLimitException('Key limit must not be negative or 0');
        this.generator = (function* (limit) {
            let value = 0;
            while (value < limit)
                yield value++;
            return limit;
        })(limit);
    }
    next() {
        const iterResult = this.generator.next();
        if (this.last === (this.last = iterResult.value))
            return -1;
        return this.last;
    }
}
/**
 * static factory class - like
 */
class KeyGenerators {
    static numeric(limit) {
        return new NumericKeyGenerator(limit);
    }
}
exports.KeyGenerators = KeyGenerators;
