import spriteMove from "../../assets/sprite-dragon-moving.png";
import spriteAttack from "../../assets/sprite-dragon-attacking2.png";

import Minion from "./minion";

export default class Dragon extends Minion {
    constructor(spec) {
        super(spec)
        this.health = 400;
        this.maxHealth = this.health;
        this.attack = 40;
        this.moveInterval = 50;
        this.moveLength = 2;
        this.attackInterval = 1000;

        this.attackShiftInt = 150;
        this.moveShiftInt = 100;

        this.imgMoving = new Image();
        this.imgMoving.src = spriteMove;

        this.imgAttacking = new Image();
        this.imgAttacking.src = spriteAttack;

    }

    draw(ctx) {
        if (!this.target){
            ctx.drawImage(this.imgMoving, 0 + this.shift, 0, 72, 78, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
            this.shiftFrame(721, 10);
        } else {
            ctx.drawImage(this.imgAttacking, 0 + this.shift, 0, 115, 91, this.x - 5, this.y - 10 + this.topOffset, 115, this.height);
            this.shiftFrame(805, 7);
        }
    }



}