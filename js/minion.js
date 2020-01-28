const PATH = [[0, 1], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0]];

const equalPos = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default class Minion {
    constructor(spec){
        this.health = spec.hp || 100;
        this.attack = spec.atk || 20;
        this.moveSpeed = spec.moveSpeed || 50;
        this.attackSpeed = spec.attackSpeed || 2000;
        this.pos = spec.pos || [0, 0];

        this.lastAttack = 0;
        this.lastMove = 0;
        this.blocked = false;
        this.target = null;
    }

    isBlocked(guardPos){
        let nextPos = [this.pos[0], this.pos[1] + 1];
        let tar = guardPos[nextPos[0]][nextPos[1]];
        if (tar){
            this.target = tar;
            this.blocked = true;
            return true;
        } else {
            this.target = null;
            this.blocked = false;
            return false;
        }
    }

    attack(time){
        if (time - this.lastAttack > this.attackSpeed){
            this.dealDamage();
            this.lastAttack = time;
        }
    }

    dealDamage(){
        this.target.hp -= this.attack;
    }


    move(time){
        if (!this.touchDown() || !this.blocked()){
            if (time - this.lastMove > 1000){
                this.position = [this.pos[0], this.pos[1] + 1];
            }
        }

    }

    destroy(){
        if (this.hp <= 0 || this.touchDown()){
            this.pos = [];
        }

    }

    touchDown(pos){
        // return JSON.stringify(this.pos) === JSON.stringify([5,7])
        return this.pos[1] >= 7;
    }

    // time pass in from game
    update(time, guardPos){
        if (this.isBlocked(guardPos)){
            this.attack(time);
        } else {
            this.move(time);
            if (this.touchDown(this.pos)){
            }
        }
    }

    destroy(min, minions){

    }
}