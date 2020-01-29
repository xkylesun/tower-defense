TOP_OFFSET = 60;


class Game {
    constructor(){
        this.board = new Board();
        this.topOffset = TOP_OFFSET;
        this.cost = 9;
        this.missed = 0;
        this.enemiesRemaining = 6;
        this.guardsRemaining = 8;
        this.enemies = [];
        this.guards = new Array(6).fill(0).map(() => new Array(10).fill(null));

        this.shop = [];

        //test
        this.guards[0][3] = new Guard({});

        this.lastCostTime = 0;
        this.lastWaveTime= 0;

        this.paused = false;

        let startTime = new Date().getTime();
        this.firstWaveStart = startTime + 5000;
        this.firstWaveEnd = startTime + 15000;
        this.secondWaveStart = startTime + 20000;
        this.secondWaveEnd = startTime + 35000;

        this.guardSelected = true;
        this.activeCell = null;
    }

    genCost(time){
        if (time - this.lastCostTime > 2000){
            this.cost += 1;
            this.lastCostTime = time;
        }
    }

    genEnemy(row){
        if (this.enemiesRemaining > 0){
            let minion = new Minion({ row: row })
            this.enemies.push(minion);
            this.enemiesRemaining -= 1;
        }
    }

    firstWave(time){
        if (time > this.firstWaveStart && time < this.firstWaveEnd) {
            if (time - this.lastWaveTime > 5000) {
                this.genEnemy(0);
                this.lastWaveTime = time;
            }
        }
    }

    secondWave(time){
        if (time > this.secondWaveStart && time < this.secondWaveEnd ){
            if (time - this.lastWaveTime > 5000){
                this.genEnemy(0);
                this.genEnemy(1);
                this.genEnemy(2);
                this.lastWaveTime = time;
            }
        }
    }

    drawBoard() {
        const bg = document.getElementById("background");
        bg.width = 800;
        bg.height = 600;
        const bgx = bg.getContext("2d");

        this.board.draw(bgx);
    }

    drawCost(ctx){
        ctx.fillStyle="white";
        // ctx.fillRect(700, 550, 30, 15)
		ctx.font = 'bold 16px Arial';
        ctx.fillText('Cost: ' + this.cost, 700, 560);
    }

    update(){
        const c = document.getElementById("canvas");
        c.width = 800;
        c.height = 600;
        const ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 800, 600);

        this.drawActiveCell(ctx);

        let time = new Date().getTime();
        this.genCost(time);
        this.drawCost(ctx);

        this.firstWave(time);
        this.secondWave(time);
        
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

    animate(){
        this.update();
        this.drawBoard();
        if (this.win()){
            console.log("mission cleared")
        } else if (this.lost()){
            console.log("lost")
        } else {
            requestAnimationFrame(this.animate.bind(this))
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

    pauseGame(){
        this.paused = !this.paused;
    }


    addListeners() {
        window.addEventListener("mousemove", e => {
            if (this.guardSelected){
                let x = e.clientX;
                let y = e.clientY;
                if (this.validCell(x, y)){
                    this.activeCell = {
                        x: Math.floor(x / 80) * 80,
                        y: Math.floor((y - this.topOffset) / 80) * 80 + this.topOffset
                    }
                } else {
                    this.activeCell = null;
                }
            } 
        });

        window.addEventListener("mousedown", e => {
            let x = e.clientX;
            let y = e.clientY;
            this.selectShopItem(x, y);
        })

        window.addEventListener("mouseup", e => {
            if (this.guardSelected){
                let x = e.clientX;
                let y = e.clientY;
                if (this.validCell(x, y)){
                    this.guardSelected.x = Math.floor(x / 80) * 80;
                    this.guardSelected.y = Math.floor((y - this.topOffset) / 80) * 80;
                    this.placeGuard(this.dragObj);
                }
            }
        })

        window.addEventListener("click", e => {
            let x = e.clientX;
            let y = e.clientY;
        })
    }

    selectShopItem(mouseX, mouseY) {
        for (const item of this.shop) {
            if (mouseX > item.x && mouseX < (item.x + item.width) && mouseY > item.y ** mouseY < (item.y + item.height)) {
                // this.drag = true;
                this.guardSelected = new Guard({});
            }
        }
    }

    validCell(x, y){
        if (x > 0 && x < 800 && y > 60 && y < 460){
            console.log(y)
            if (this.guards[Math.floor((y - this.topOffset) / 80)][Math.floor(x / 80)] === null){
                return true;
            }
        }
        return false;
    }

    drawActiveCell(ctx){
        if (this.activeCell){
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(this.activeCell.x, this.activeCell.y, 79, 79);
        }
    }

    placeGuard(guard) {
        if (this.cost >= guard.cost) {
            this.cost -= guard.cost;
            this.guards[Math.floor(guard.y / 80)][Math.floor(guard.x / 80)] = guard;
        } else {
            console.log("not enough cost")
        };
    }

    play(){
        this.animate();
        this.addListeners();
    }

    parseX(x){
        return Math.floor(x / 80) * 80;
    }

    parseY(y){
        return 
    }

}

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game;
    game.play();
});