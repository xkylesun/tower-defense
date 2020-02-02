import Guard from "./guard";
import standing from "../../assets/h1.png";
import attacking from "../../assets/h2.png";
import icon from "../../assets/h3.png";


export default class Priest extends Guard{
    constructor(props) {
        super(props);
        this.klass = "Priest";

        this.health = 100;
        this.maxHealth = this.health;
        this.attack = 80;
        this.attackInterval = 2000;

        this.rangeX = 1 * 80; // need fix
        this.rangeY = 1 * 80;

        this.cost = 12;

        this.imgStanding = new Image();
        this.imgStanding.src = standing;

        this.imgAttacking = new Image();
        this.imgAttacking.src = attacking;

        this.icon = new Image();
        this.icon.src = icon;

        this.standShiftInt = 150;
        this.attackShiftInt = 120;
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
                // debugger
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

    draw(ctx) {
        if (this.standing){
            ctx.drawImage(this.imgStanding, 0 + this.shift, 0, 220, 201, this.x - 60, this.y + this.topOffset - 90, 220, 170);
            this.shiftFrame(3080, 14);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 0, 220, 201, this.x - 60, this.y + this.topOffset - 90, 220, 170);
            this.shiftFrame(3740, 17);
        }
    }
}