import Guard from "./guard";

export default class Vanguard extends Guard {
    constructor(props) {
        super(props);
        this.health = 1000;
        this.maxHealth = this.health;

        this.attack = 30;
        this.attackInterval = 2000;

        this.rangeX = 1 * 80;
        this.rangeY = 0;
        this.cost = 7;

        this.standing = null;
        this.attacking = null;
    }
}