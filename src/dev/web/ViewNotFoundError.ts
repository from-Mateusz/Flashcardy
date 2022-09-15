import IdentifiableError from "../IdentifiableError";

export class ViewNotFoundError extends IdentifiableError {
    constructor(message: string ) {
        super(message, '1001V');
    }
}