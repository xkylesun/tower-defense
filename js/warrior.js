import Guard from "./guard";

export default class Warrior extends Guard {
    constructor(props) {
        super(props);
        this.health = 1200;
        this.maxHealth = this.health;

        this.attack = 40;
        this.attackInterval = 1000;

        this.range = 1 * 80;
        this.cost = 7;

        this.standing = null;
        this.attacking = null;
    }
}