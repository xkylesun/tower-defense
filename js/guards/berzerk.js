import Guard from "./guard";
import standing from "../../assets/b1.png";
import attacking from "../../assets/b2.png";
import icon from "../../assets/b3.png";


export default class Berzerk extends Guard {
    constructor(props) {
        super(props);
        this.klass = "Berserker";

        this.health = 600;
        this.maxHealth = this.health;

        this.rangeX = 1 * 80;
        this.rangeY = 0;
        
        this.cost = 14;

        this.imgStanding = new Image();
        this.imgStanding.src = standing;

        this.imgAttacking = new Image();
        this.imgAttacking.src = attacking;

        this.icon = new Image();
        this.icon.src = icon;

        this.standShiftInt = 100;
        this.attackShiftInt = 120;

        this.attack = 60;
        this.attackFrame = 10;
    }

    // deal damage to all enemy in range
    strike() {
        if (this.enemiesInRange.length > 0) {
            for (const enemy of this.enemiesInRange){
                enemy.health -= this.attack;
            }
        }
    }

    draw(ctx) {
        if (this.standing) {
            ctx.drawImage(this.imgStanding, 0 + this.shift, 50, 317, 270, this.x - 50, this.y + this.topOffset - 55, 140, 130);
            this.shiftFrame(4438, 14);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 50, 317, 270, this.x - 50, this.y + this.topOffset - 55, 140, 130);
            this.shiftFrame(5072, 16);
        }
    }
}