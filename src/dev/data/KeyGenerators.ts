import { KeyLimitException } from './Exceptions';

abstract class KeyGenerator<T> {
    abstract next(): T
}

class NumericKeyGenerator extends KeyGenerator<number> {
    private readonly generator: Generator<number, number, void>;
    private last!: number;

    constructor(limit: number) {
        super();

        if(limit <= 0)
            throw new KeyLimitException('Key limit must not be negative or 0');

        this.generator = (function *(limit: number) {
            let value = 0;
            while(value < limit)
                yield value++;
            return limit;
        })(limit);
    }

    next(): number {
        const iterResult = this.generator.next();
        if(this.last === (this.last = iterResult.value)) return -1;
        return this.last;
    }
}

/**
 * static factory class - like
 */
class KeyGenerators {
    static numeric(limit: number): NumericKeyGenerator {
        return new NumericKeyGenerator(limit);
    }
}

export { KeyGenerator, KeyGenerators }