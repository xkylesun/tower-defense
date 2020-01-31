import Minion from "./minion";

import spriteMove from "../assets/sprite-mushroom-moving.png";
import spriteAttack from "../assets/sprite-mushroom-attacking.png";

export default class Mushroom extends Minion{
    constructor(spec){
        super(spec);
        this.health = 200;
        this.maxHealth = this.health;
        this.attack = 20;
        this.moveInterval = 100;
        this.moveLength = 2;
        this.attackInterval = 1000;

        this.attackShiftInt = 150;
        this.moveShiftInt = 120;

        this.moving = new Image();
        this.moving.src = spriteMove;

        this.attacking = new Image();
        this.attacking.src = spriteAttack;

    }

    draw(ctx) {
        if (!this.target) {
            ctx.drawImage(this.moving, 0 + this.shift, 0, 140, 140, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
        } else {
            ctx.drawImage(this.attacking, 0 + this.shift, 0, 140, 140, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
        }
        this.target ? this.shiftFrame(714, 5) : this.shiftFrame(690, 5);
    }
}