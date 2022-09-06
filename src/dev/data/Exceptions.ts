import Exception from '../IdentifiableError';

class KeyLimitException extends Exception {
    constructor(message: string) {
        super(message, "1002_DB")
    }
}

export { KeyLimitException }