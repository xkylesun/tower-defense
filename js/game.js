
class Game {
    constructor(){
        this.board = new Board();
        this.cost = 10;
        this.missed = 0;
        this.remaining = 10;

        this.guards = new Array(6).fill(0).map(() => new Array(8).fill(null));

        //test
        this.guards[0][3] = new Guard({});
        this.enemies = [];

        this.lastCostTime = 0;
        this.lastWaveTime= 0;

        this.paused = false;

        this.firstWaveTime = new Date().getTime() + 10000;

    }

    placeGuard(guard, x, y){
        if (this.cost >= guard.cost){
            this.cost -= guard.cost;
            this.guards[Math.floor(y / 80)][Math.floor(x / 80)] = guard; 
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

    placeEnemy(){
        let minion = new Minion({})
        this.enemies.push(minion);
    }

    genWaves(time){
        if (this.remaining > 0 && time - this.lastWaveTime > 6000){
            this.placeEnemy();
            this.lastWaveTime = time;
        }
    }

    firstWave(){
        // this.placeEnemy();
        // setTimeout(this.placeEnemy, 5000)
    }

    drawBoard() {
        const bg = document.getElementById("background");
        bg.width = 800;
        bg.height = 600;
        const bgx = bg.getContext("2d");

        this.board.draw(bgx);
    }

    update(){

        const c = document.getElementById("canvas");
        c.width = 800;
        c.height = 600;
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 800, 600);

        let time = new Date().getTime();

        this.genCost(time);
        if (time > this.firstWaveTime){
            this.genWaves(time);
        }
        
        for (const enemy of this.enemies) {
            enemy.update(ctx, time, this.guards, this.enemies);
            if (enemy.touchDown()) {
                this.missed += 1;
                this.enemies = this.enemies.filter(min => (min !== enemy));
            };
            if (enemy.dead()){
                this.enemies = this.enemies.filter( min => (min !== enemy));
            }
        }

        let guards = this.guards.flat().filter(el => (el instanceof Guard));
        for (const guard of guards) {
            guard.update(ctx, time, this.enemies);
            if (guard.dead()){
                this.guards[Math.floor(guard.y / 80)][Math.floor(guard.x / 80)] = null;
            }
        }

    }

    play(){
        this.update();
        this.drawBoard();
        if (this.win()){
            console.log("mission cleared")
        } else if (this.lost()){
            console.log("lost")
        } else {
            requestAnimationFrame(this.play.bind(this))
        }
    }

    gameOver(){
        return this.win() || this.lost();
    }

    win(){

        return this.enemies.length === 0 && this.remaining === 0;
    }

    lost(){
        return this.missed > 0;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game;
    game.play();
});