import Guard from "./guard";
import standing from "../../assets/a1.png";
import attacking from "../../assets/a2.png";
import icon from "../../assets/a3.png";

export default class Archer extends Guard {
    constructor(props) {
        super(props);
        this.klass = "Archer";

        this.health = 300;
        this.maxHealth = this.health;

        this.rangeX = 4 * 80;
        this.rangeY = 0;
        
        this.cost = 18;

        this.imgStanding = new Image();
        this.imgStanding.src = standing;

        this.imgAttacking = new Image();
        this.imgAttacking.src = attacking;

        this.icon = new Image();
        this.icon.src = icon;

        this.standShiftInt = 100;
        this.attackShiftInt = 140;

        this.attack = 60;
        this.attackFrame = 8;
    }

    draw(ctx) {
        if (this.standing) {
            ctx.drawImage(this.imgStanding, 0 + this.shift, 0, 521, 540, this.x - 45, this.y + this.topOffset - 100, 150, 180);
            this.shiftFrame(7294, 14);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 0, 521, 540, this.x - 45, this.y + this.topOffset - 100, 150, 180);
            this.shiftFrame(5731, 11);
        }
    }
}