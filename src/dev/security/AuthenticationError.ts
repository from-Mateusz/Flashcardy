import IdentifiableError from "../IdentifiableError";

export default class AuthenticationError extends IdentifiableError {
    constructor(message: string) {
        super(message, '1001A');
    }
}