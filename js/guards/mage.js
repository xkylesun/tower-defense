import Guard from "./guard";


export default class Mage extends Guard {
    constructor(props) {
        super(props);
        this.klass = "Mage";

        this.health = 600;
        this.maxHealth = this.health;
        this.attack = 80;
        this.attackInterval = 1000;

        this.rangeX = 3 * 80;
        this.rangeY = 0;
        
        this.cost = 18;

        this.standing = null;
        this.attacking = null;
    }
}