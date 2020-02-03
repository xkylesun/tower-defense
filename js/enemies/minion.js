// const PATH = [[0, 1], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0]];

import { TOP_OFFSET } from "../game";

// SUPER CLASS FOR MINION
export default class Minion {
    constructor(spec){
        this.topOffset = TOP_OFFSET;

        this.height = 70;
        this.width = 70;

        this.x = 0;
        this.y = (spec.row * this.topOffset + 20 * spec.row + 10) || 0;

        this.lastAttack = 0;
        this.lastMove = 0;
        this.target = null;
        this.moving = true;

        this.shift = 0;
        this.lastShift = 0;
    }

    checkBlocked(guards){
        this.target = null;
        let tar = guards[Math.floor(this.y / 80)][Math.floor((this.x + this.width)/ 80)];
        if (tar){
            this.target = tar;
        }
    }

    strike(time){
        if (this.target){
            if (time - this.lastAttack > this.attackInterval) {
                this.target.health -= this.attack;
                this.lastAttack = time;
            }
        }
    }

    move(time){
        if (!this.target){
            if (time - this.lastMove > this.moveInterval){
                this.x += this.moveLength;
                this.lastMove = time;
            }
        }
    }

    touchDown(){
        // if (this.x >= 800) console.log("touchdown")
        return this.x >= 800;
    }

    dead(){
        return this.health <= 0;
    }

    // // each subclass has its own draw method to account for diffs in image size and shift
    // draw(ctx) {
    //     const image = new Image();
    //     image.src = this.image;
    //     ctx.drawImage(image, this.x, this.y + this.topOffset, this.size, this.size);
    //     this.drawHealthBar(ctx);
    // }

    drawHealthBar(ctx) {
        const barLength = this.width;
        const barHeight = 5;
        ctx.fillStyle = "#8B8B8B"
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength, barHeight);
        ctx.fillStyle = this.hpColor();
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength * (this.health / this.maxHealth), barHeight);
    }

    hpColor() {
        let frac = this.health / this.maxHealth;
        if (frac > 0.5) {
            return "green";
        } else if (frac > 0.2) {
            return "#FDB36A"; // orange
        } else {
            return "#D13B51"; //red
        }
    }

    shiftFrame(imageWidth, frames) {
        // reset shift when status changed
        if (this.target && this.moving){
            this.moving = false;
            this.shift = 0;
        } else if (!this.moving && !this.target) {
            this.moving = true;
            this.shift = 0;
        }

        let time = new Date().getTime();
        let interval = this.target ? this.attackShiftInt : this.moveShiftInt;
        if (time - this.lastShift > interval) {
            this.shift += imageWidth / frames;
            this.lastShift = time;
        }

        if (this.shift >= imageWidth) {
            this.shift = 0;
        }
    }

    update(ctx, time, guards) {
        this.checkBlocked(guards)
        this.strike(time);
        this.move(time);
        ctx.save();
        ctx.shadowColor = "#171717";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = -20;
        ctx.shadowOffsetY = 20;
        this.draw(ctx);
        ctx.restore();
        this.drawHealthBar(ctx);
    }

}