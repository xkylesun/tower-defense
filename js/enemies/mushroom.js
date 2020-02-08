import Minion from "./minion";

import spriteMove from "../../assets/sprite-mushroom-moving.png";
import spriteAttack from "../../assets/sprite-mushroom-attacking.png";

export default class Mushroom extends Minion{
    constructor(spec){
        super(spec);

        this.health = 250;
        this.maxHealth = this.health;

        this.attack = 30;
        this.attackFrame = 2;
        this.attackShiftInt = 180;

        this.moveInterval = 100;
        this.moveLength = 2;
        this.moveShiftInt = 140;

        this.imgMoving = new Image();
        this.imgMoving.src = spriteMove;

        this.imgAttacking = new Image();
        this.imgAttacking.src = spriteAttack;
    }

    draw(ctx) {
        if (!this.target) {
            ctx.drawImage(this.imgMoving, 0 + this.shift, 0, 140, 140, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
            this.shiftFrame(700, 5);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 0, 140, 140, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
            this.shiftFrame(750, 5);
        }
    }
}