import Minion from "./minion";
import mushroom from "../assets/sprite-mushroom.png";

// width = 683
import moving from "../assets/sprite-mushroom-moving.png";

// width = 715
import attacking from "../assets/sprite-mushroom-attacking.png";

export default class Mushroom extends Minion{
    constructor(spec){
        super(spec);
        this.health = 200;
        this.maxHealth = this.health;
        this.attack = 20;
        this.moveSpeed = 100
        this.moveLength = 1;
        this.attackSpeed = 1000;

        this.height = 70;
        this.width = 70;

        this.moving = moving;
        this.attacking = attacking;

        // this.image = test;

        this.shift = 0;
        this.lastShift = 0;
        this.shiftInteval = 100;
    }

    draw(ctx) {
        const image = new Image();
        image.src = this.target ? this.attacking : this.moving;
        ctx.drawImage(image, 0 + this.shift, 0, 140, 147, this.x - 5, this.y - 10 + this.topOffset, this.width, this.height);
        this.drawHealthBar(ctx);
        // debugger
        this.target ? this.shiftFrame(715) : this.shiftFrame(690);

    }

    shiftFrame(imageWidth){
        let time = new Date().getTime();
        if (time - this.lastShift > this.shiftInteval){
            this.shift += imageWidth / 5;
            this.lastShift = time;
        }

        if (this.shift >= imageWidth) {
            this.shift = 0;
        }
    }

}