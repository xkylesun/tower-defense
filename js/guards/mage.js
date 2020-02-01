import Guard from "./guard";


export default class Mage extends Guard {
    constructor(props) {
        super(props);
        this.health = 600;
        this.maxHealth = this.health;
        this.attack = 60;
        this.attackInterval = 1000;
        this.range = 3 * 80;
        this.cost = 12;

        this.standing = null;
        this.attacking = null;
    }
}