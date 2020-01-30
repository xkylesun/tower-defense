import moving from "../assets/sprite-dragon-moving.png";
import attacking from "../assets/sprite-dragon-attacking2.png";

import Minion from "./minion";

export default class Dragon extends Minion {
    constructor(spec) {
        super(spec);
        this.health = 400;
        this.maxHealth = this.health;
        this.attack = 40;
        this.moveSpeed = 100
        this.moveLength = 2;
        this.attackSpeed = 1000;

        this.height = 70;
        this.width = 70;

        this.moving = moving;
        this.attacking = attacking;

        this.shift = 0;
        this.lastShift = 0;
        this.shiftInteval = 100;
    }

    draw(ctx) {
        const image = new Image();
        image.src = this.target ? this.attacking : this.moving;

        if (!this.target){
            ctx.drawImage(image, 0 + this.shift, 0, 72, 78, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
        } else {
            ctx.drawImage(image, 0 + this.shift, 0, 115, 91, this.x - 5, this.y - 10 + this.topOffset, 115, this.height);
        }

        this.drawHealthBar(ctx);
        // debugger
        this.target ? this.shiftFrame(805, 7) : this.shiftFrame(721, 10);

    }

    shiftFrame(imageWidth, frames) {
        let time = new Date().getTime();
        if (time - this.lastShift > this.shiftInteval) {
            this.shift += imageWidth / frames;
            this.lastShift = time;
        }

        if (this.shift >= imageWidth) {
            this.shift = 0;
        }
    }

}