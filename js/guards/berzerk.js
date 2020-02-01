import Guard from "./guard";

export default class Berzerk extends Guard {
    constructor(props) {
        super(props);
        this.health = 1200;
        this.maxHealth = this.health;

        this.attack = 60;
        this.attackInterval = 1000;

        this.range = 1 * 80;
        this.cost = 7;

        this.standing = null;
        this.attacking = null;
    }

    // deal damage to all enemy in range
    strike(time) {
        if (this.enemiesInRange.length > 0) {
            if (time - this.lastAttacked > this.attackInterval) {
                for (const enemy of this.enemiesInRange){
                    enemy.health -= this.attack;
                }
                this.lastAttacked = time;
            }
        }
    }
}