import Guard from "./guard";

export default class Priest extends Guard{
    constructor(props) {
        super(props);
        this.health = 800;
        this.maxHealth = this.health;
        this.attack = 50;
        this.attackInterval = 1000;

        this.range = 3 * 80; // need fix

        this.cost = 8;

        this.standing = null;
        this.attacking = null;
    }
}