// const PATH = [[0, 1], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0]];
import Guard from "./guard";
import { TOP_OFFSET } from "./game";

import test from "../assets/test.png";

export default class Minion {
    constructor(spec){
        this.topOffset = TOP_OFFSET;

        //below are customizable
        // this.health = 100;
        // this.maxHealth = 100;
        // this.attack = 40;
        // this.moveInterval = 50;
        // this.moveLength = 4;
        // this.attackInterval = 1000;
        // this.walking = test;
        // this.attacking = test;

        this.height = 70;
        this.width = 70;

        this.x = 0;
        this.y = (spec.row * this.topOffset + 20 * spec.row + 10) || 0;

        this.lastAttack = 0;
        this.lastMove = 0;
        this.target = null;

        this.shift = 0;
        this.lastShift = 0;

        this.attackShiftInt = 150;
        this.moveShiftInt = 100;
    }

    checkBlocked(guards){
        let tar = guards[Math.floor(this.y / 80)][Math.floor((this.x + this.width - 10)/ 80)];
        if (tar){
            this.target = tar;
        } else {
            this.target = null;
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
        if (this.x >= 800) console.log("touchdown")
        return this.x >= 800;
    }

    dead(){
        if (this.health <= 0) console.log("dead")
        return this.health <= 0;
    }

    // draw(ctx) {
    //     const image = new Image();
    //     image.src = this.image;
    //     ctx.drawImage(image, this.x, this.y + this.topOffset, this.size, this.size);
    //     this.drawHealthBar(ctx);
    // }

    drawHealthBar(ctx) {
        const barLength = this.width;
        const barHeight = 5;
        ctx.fillStyle = "gray"
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength, barHeight);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y + this.topOffset + this.height - 5, barLength * (this.health / this.maxHealth), barHeight);
    }

    shiftFrame(imageWidth, frames) {
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
        this.draw(ctx);
        this.drawHealthBar(ctx);
    }

}