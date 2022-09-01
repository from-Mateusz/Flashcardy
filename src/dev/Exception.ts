export default abstract class Exception {
    readonly message: string;

    constructor(message: string) {
        this.message = message;
    }
}