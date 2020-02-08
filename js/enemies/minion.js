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
        this.attacking = false;

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

    strike(){
        if (this.target){
            this.target.health -= this.attack;
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
        return this.x >= 800;
    }

    dead(){
        return this.health <= 0;
    }

    drawHealthBar(ctx) {
        const barLength = this.width;
        const barHeight = 5;
        ctx.save();
        ctx.fillStyle = "#8B8B8B"
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength, barHeight);
        ctx.fillStyle = this.hpColor();
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength * (Math.max(this.health,0) / this.maxHealth), barHeight);
        ctx.restore();
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
        let time = new Date().getTime();
        let interval = this.target ? this.attackShiftInt : this.moveShiftInt;
        let frameWidth = Math.floor(imageWidth / frames);

        // due to sprite resource shift from right to left

        // reset shift when status changed
        if (this.target && !this.attacking){
            this.attacking = true;
            this.shift = imageWidth - frameWidth;
        } else if (this.attacking && !this.target) {
            this.attacking = false;
            this.shift = imageWidth - frameWidth;
        }

        if (time - this.lastShift > interval) {
            this.shift -= frameWidth;

            if (this.shift < 0) {
                this.shift = imageWidth - frameWidth;
            }

            this.lastShift = time;
            
            if (this.shift === this.attackFrame * frameWidth && this.attacking) {
                this.strike();
            }
        }
    }

    update(ctx, time, guards) {
        this.checkBlocked(guards)
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