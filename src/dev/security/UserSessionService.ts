import User from "../model/User";
import Session from "./Session";

interface UserSessionService {
    create(user: User): Session;
    remove(user: User): Session;
    findById(id: number): Session;
    findByOwnerId(id: number): Session;
}