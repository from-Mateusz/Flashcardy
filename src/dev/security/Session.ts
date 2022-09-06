/**
 * Session is a simple object comprised of id, owner's id (user's id), expiration date
 * Its properties are managed by dedicated user session service/
 */
 export default class Session {
    private readonly ownerId: number;
    private readonly id: number;
    private readonly expireDate: Date;

    constructor( ownerId: number, id: number, expireDate: Date ) {
        this.ownerId = ownerId;
        this.id = id;
        this.expireDate = expireDate;
    }

    getOwnerId() {
        return this.ownerId;
    }

    getId() {
        return this.id;
    }

    isValid() {
        const now = new Date();
        return this.expireDate.getMilliseconds() > now.getMilliseconds();
    }
}