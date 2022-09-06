"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Session is a simple object comprised of id, owner's id (user's id), expiration date
 * Its properties are managed by dedicated user session service/
 */
class Session {
    ownerId;
    id;
    expireDate;
    constructor(ownerId, id, expireDate) {
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
exports.default = Session;
