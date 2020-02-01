
import { TOP_OFFSET } from "../game";
import test from "../../assets/test.png";

// SUPER CLASS FOR GUARD
export default class Guard {
    constructor() {
        this.topOffset = TOP_OFFSET;
        this.height = 60;
        this.width = 60;

        this.x = 240;
        this.y = 0;

        this.health = 1000;
        this.maxHealth = this.health;
        this.attack = 20;
        this.attackInterval = 1000;
        this.range = 1 * 80;
        this.cost = 7;

        this.enemiesInRange = [];
        this.lastAttacked = 0;
        this.moving = false;
        
        this.image = new Image();
        this.image.src = test;

        this.moving = new Image();
        this.moving.src = test;

        this.attacking = new Image();
        this.attacking.src = test;

    }

    CheckInRange(enemies){
        let temp = []
        let rangeX = Math.max(this.x - this.range, 0);
        for(const enemy of enemies){
            if (enemy.x > rangeX && enemy.x < this.x - this.width && enemy.y > this.y && enemy.y < this.y + this.height && !this.enemiesInRange.includes(enemy)){
                temp.push(enemy)
            }
        }
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
        this.drawHealthBar(ctx);
    }

    drawHealthBar(ctx){
        const barLength = this.width;
        const barHeight = 5;

        ctx.fillStyle = "gray"
        ctx.fillRect(this.x + 10, this.y + this.topOffset + this.height + 15, barLength, barHeight);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x + 10, this.y + this.topOffset + this.height + 15, barLength * (this.health / this.maxHealth), barHeight);
    }

    update(ctx, time, enemies) {
        this.CheckInRange(enemies);
        this.strike(time);
        this.draw(ctx);
    }

    dead(){
        return this.health <= 0;
    }

}