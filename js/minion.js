const PATH = [[0, 1], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0]];

class Minion {
    constructor(spec){
        this.health = spec.hp || 100;
        this.attack = spec.atk || 40;
        this.moveSpeed = spec.moveSpeed || 50;
        this.moveLength = 5;
        this.attackSpeed = spec.attackSpeed || 1000;
        this.size = 60;

        this.pos = spec.pos || [0, 0];
        this.x = 0;
        this.y = 0;

        this.lastAttack = 0;
        this.lastMove = 0;
        this.target = null;
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
                console.dir(this.target)
                console.log("ghp" + this.target.health)
                this.target.health -= this.attack;
                this.lastAttack = time;
            }
        }
    }

    move(time){
        if (!this.target){
            if (time - this.lastMove > 100){
                this.x += this.moveLength;
                this.lastMove = time;
                console.log(this.x)
            }
        }

    }

    destroy(){
        if (this.hp <= 0 || this.touchDown()){
            this.pos = [];
        }

    }

    touchDown(){
        // return JSON.stringify(this.pos) === JSON.stringify([5,7])
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
        // ctx.drawImage(this.image, this.x)
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y + 60, this.size, this.size);
    }

}