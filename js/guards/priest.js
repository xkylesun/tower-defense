import Guard from "./guard";

export default class Priest extends Guard{
    constructor(props) {
        super(props);
        this.klass = "Priest";

        this.health = 800;
        this.maxHealth = this.health;
        this.attack = 1800;
        this.attackInterval = 1000;

        this.rangeX = 1 * 80; // need fix
        this.rangeY = 1 * 80;

        this.cost = 12;

        this.standing = null;
        this.attacking = null;
    }

    // overwrite check allie
    CheckInRange(allies) {
        let temp = []
        let rangeX = Math.max(this.x - this.rangeX, 0);
        let rangeUp = Math.max(this.y - this.rangeY, 0);
        let rangeDown = Math.min(this.y + this.rangeY, 320);
        for (const allie of allies) {
            if (allie.health < allie.maxHealth && allie.x >= rangeX && allie.x <= this.x && allie.y >= rangeUp && allie.y <= rangeDown){
                temp.push(allie);
                debugger
            }
        }
        // sort by hp asc
        this.enemiesInRange = temp.sort((a, b) => a.health - b.health);
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