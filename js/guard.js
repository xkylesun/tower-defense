
import { TOP_OFFSET } from "./game";
import test from "../assets/test.png";

export default class Guard {
    constructor(spec) {
        this.topOffset = TOP_OFFSET;
        this.height = 60;
        this.width = 60;

        this.x = spec.x || 240;
        this.y = spec.y || 0;

        this.health = spec.hp || 1000;
        this.maxHealth = this.health;
        this.attack = spec.atk || 20;
        this.attackInterval = 1000;
        this.range = (spec.range || 3) * 80;
        this.cost = spec.cost || 7;
        this.standing = spec.standing;
        this.attacking = spec.attacking;

        this.enemiesInRange = [];
        this.lastAttacked = 0;
        
        this.image = test;

    }

    CheckInRange(enemies){
        let temp = []
        let rangeX = Math.max(this.x - this.range, 0);
        for(const enemy of enemies){
            if (enemy.x > rangeX && enemy.y > this.y && enemy.y < this.y + this.height && !this.enemiesInRange.includes(enemy)){
                temp.push(enemy)
            }
        }
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
        const image = new Image();
        image.src = this.image;

        ctx.drawImage(image, this.x + 10, this.y + this.topOffset + 10, this.width, this.height);
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