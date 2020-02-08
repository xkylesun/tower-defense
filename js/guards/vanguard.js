import Guard from "./guard";
import standing from "../../assets/v1.png";
import attacking from "../../assets/v2.png";
import icon from "../../assets/v3.png";

export default class Vanguard extends Guard {
    constructor(props) {
        super(props);
        this.klass = "Vanguard";

        this.health = 800;
        this.maxHealth = this.health;

        this.rangeX = 1 * 80;
        this.rangeY = 0;
        
        this.cost = 7;

        this.imgStanding = new Image();
        this.imgStanding.src = standing;

        this.imgAttacking = new Image();
        this.imgAttacking.src = attacking;

        this.icon = new Image();
        this.icon.src = icon;

        this.standShiftInt = 100;
        this.attackShiftInt = 140;

        this.attack = 40;
        this.attackFrame = 5;
    }

    draw(ctx) {
        if (this.standing) {
            ctx.drawImage(this.imgStanding, 0 + this.shift, 0, 405, 312, this.x - 70, this.y + this.topOffset - 72, 200, 150);
            this.shiftFrame(5265, 13);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 0, 405, 312, this.x - 70, this.y + this.topOffset - 72, 200, 150);
            this.shiftFrame(3645, 9);
        }
    }
}