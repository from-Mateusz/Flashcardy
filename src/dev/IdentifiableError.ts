export default class IdentifiableError extends Error {
    private readonly id: string;

    constructor(message: string, id: string) {
        super(message);
        this.id = id;
    }

    getId() {
        return this.id;
    }
}