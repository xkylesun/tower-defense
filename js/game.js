
class Game {
    constructor(){
        this.board = new Board();
        this.cost = 10;
        this.missed = 0;
        this.remaining = 10;


        // this.guards = [];
        this.guards = new Array(6).fill(0).map(() => new Array(8).fill(null));
        this.enemies = [];

        this.lastCostTime = 0;
        this.lastWaveTime= 0;
    }

    placeGuard(guard, pos){
        if (this.cost >= guard.cost){
            this.cost -= guard.cost;
            guard.position = pos;
        } else {
            console.log("not enough cost")
        };
    }

    genCost(time){
        if (time - this.lastCostTime > 1000){
            this.cost += 1;
            this.lastCostTime = time;
        }
    }

    genWaves(time){
        if (this.remaining > 0 && time - this.lastWaveTime > 12000){
            for (let i = 0; i < 3; i++){
                // setTimeout(() => {}, 1000)
                this.enemies.push(new Minion());
                this.remaining -= 1;
            }
            this.lastWaveTime = time;
        }
    }

    draw() {
        const c = document.getElementById("canvas");
        const bg = document.getElementById("background");
        c.width = 800;
        c.height = 600;
        bg.width = 800;
        bg.height = 600;
        const bgx = bg.getContext("2d");
        const ctx = c.getContext("2d");

        ctx.clearRect(0, 0, 1000, 600);

        this.board.draw(bgx);
    }

    update(){
        let time = new Date().getTime();

        this.genCost(time);
        
        for (const enemy of this.enemies) {
            enemy.update(time, this.guardPos, this.enemies);
        }

        for (const guard of this.guards) {
            guard.update(time);
        }

    }

    animate(){

    }

}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game;
    game.draw();
}, false);