export default abstract class Entity<TID> {
    private id?: TID;

    constructor(id?: TID) {
        this.id = id;
    }
    
    getId() {
        return this.id;
    }

    /**
     * Obviously I know that this kind of method which operates on entity key ought to be private
     * and a whole work related to generating and assigning keys in question is on a database/orm frameworks side.
     * Nevertheless, for practice and revision purpose it might be enough.
     * On top of that, this project won't go live.
     */
    setId(id: TID) {
        this.id = id;
    }
}