// const PATH = [[0, 1], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0]];
import Guard from "./guard";
import { TOP_OFFSET } from "./game";

import test from "../assets/test.png";

export default class Minion {
    constructor(spec){
        this.topOffset = TOP_OFFSET;
        this.health = spec.hp || 100;
        this.attack = spec.atk || 40;
        this.moveSpeed = spec.moveSpeed || 50;
        this.moveLength = 4;
        this.attackSpeed = spec.attackSpeed || 1000;
        this.size = 60;

        this.x = 0;
        this.y = (spec.row * this.topOffset + 20 * spec.row + 10) || 0;

        this.lastAttack = 0;
        this.lastMove = 0;
        this.target = null;

        this.walking = spec.walking;
        this.attacking = spec.attacking;

        this.image = test;
    }

    checkBlocked(guards){
        let tar = guards[Math.floor(this.y / 80)][Math.floor((this.x + this.size)/ 80)];
        if (tar){
            this.target = tar;
        } else {
            this.target = null;
        }
    }

    strike(time){
        if (this.target instanceof Guard){
            if (time - this.lastAttack > this.attackSpeed) {
                this.target.health -= this.attack;
                this.lastAttack = time;
            }
        }
    }

    move(time){
        if (!this.target){
            if (time - this.lastMove > 50){
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

    // time pass in from game
    update(ctx, time, guards){
        this.checkBlocked(guards)
        this.strike(time);

        this.move(time);

        this.draw(ctx);
    }

    draw(ctx) {
        const image = new Image();
        image.src = this.image;
        ctx.drawImage(image, this.x, this.y + this.topOffset, this.size, this.size);
    }

}