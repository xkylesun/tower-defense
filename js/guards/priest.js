import Guard from "./guard";

export default class Priest extends Guard{
    constructor(props) {
        super(props);
        this.health = 800;
        this.maxHealth = this.health;
        this.attack = 50;
        this.attackInterval = 1000;

        this.range = 1 * 80; // need fix

        this.cost = 8;

        this.standing = null;
        this.attacking = null;
    }

    // overwrite check allie
    CheckInRange(allies) {
        let temp = []
        let rangeX = Math.max(this.x - this.range, 0);
        for (const allie of allies) {
            if (allie.health < allie.maxHealth && allie.x >= rangeX && allie.x <= this.x && allie.y >= this.y - 80 && allie.y <= this.y + 80){
                temp.push(allie);
            }
        }
        // sort by hp asc
        this.enemiesInRange = temp.sort((a, b) => b.health - a.health);
    }

    //overwrite strike (heal)
    strike(time) {
        if (this.enemiesInRange.length > 0) {
            if (time - this.lastAttacked > this.attackInterval) {
                this.enemiesInRange[0].health = Math.min(this.enemiesInRange[0].health + this.attack, this.enemiesInRange[0].maxHealth);
                this.lastAttacked = time;
            }
        }
    }
}