
import { TOP_OFFSET } from "../game";
import test from "../../assets/test.png";

// SUPER CLASS FOR GUARD
export default class Guard {
    constructor() {
        this.topOffset = TOP_OFFSET;
        this.height = 60;
        this.width = 60;

        // this.health = 1000;
        // this.maxHealth = this.health;
        // this.attack = 20;
        // this.attackInterval = 1000;
        // this.rangeX = 1 * 80;
        // this.rangeY = 0;
        // this.cost = 7;

        this.enemiesInRange = [];
        this.lastAttacked = 0;
        
        this.standing = true;
        
        this.image = new Image();
        this.image.src = test;

        this.shift = 0;
        this.lastShift = 0;

    }

    CheckInRange(enemies){
        let temp = []
        let rangeX = Math.max(this.x - this.rangeX, 0);
        for(const enemy of enemies){
            if (enemy.x > rangeX && enemy.x < this.x + 80 && enemy.y > this.y && enemy.y < this.y + this.height){
                temp.push(enemy)
            }
        }
        // debugger
        // sort by distance asc
        this.enemiesInRange = temp.sort((a, b) => b.x - a.x);
    }

    strike(time){
        if (this.enemiesInRange.length > 0){
            if (time - this.lastAttacked > this.attackInterval) {
                this.enemiesInRange[0].health -= this.attack;
                this.lastAttacked = time;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x + 10, this.y + this.topOffset + 10, this.width, this.height);
    }

    drawHealthBar(ctx){
        const barLength = this.width;
        const barHeight = 5;

        ctx.fillStyle = "#8B8B8B"
        ctx.fillRect(this.x + 10, this.y + this.topOffset + this.height + 15, barLength, barHeight);
        
        ctx.fillStyle = this.hpColor();
        ctx.fillRect(this.x + 10, this.y + this.topOffset + this.height + 15, barLength * (this.health / this.maxHealth), barHeight);
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

    update(ctx, time, enemies) {
        this.CheckInRange(enemies);
        this.strike(time);
        ctx.save();
        ctx.shadowColor = "#171717";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = -20;
        ctx.shadowOffsetY = 20;
        this.draw(ctx);
        ctx.restore();
        this.drawHealthBar(ctx);
    }

    dead(){
        return this.health <= 0;
    }

    shiftFrame(imageWidth, frames) {
        // reset shift when status changed
        if (this.enemiesInRange.length > 0  && this.standing) {
            this.standing = false;
            this.shift = 0;
            // debugger
        } else if (!this.standing && this.enemiesInRange.length < 1) {
            this.standing = true;
            this.shift = 0;
            // debugger
        }

        let time = new Date().getTime();
        let interval = this.standing ? this.standShiftInt : this.attackShiftInt;
        if (time - this.lastShift > interval) {
            this.shift += imageWidth / frames;
            this.lastShift = time;
            // debugger
        }

        if (this.shift >= imageWidth) {
            this.shift = 0;
        }
    }

}