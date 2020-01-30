
export const TOP_OFFSET = 60;

import Minion from "./minion";
import Mushroom from "./mushroom";
import Dragon from "./dragon";
import Guard from "./guard";
import Board from "./board";
import ShopItem from "./shop_item";

import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause-button.svg";

export default class Game {
    constructor(){
        this.board = new Board();
        this.topOffset = TOP_OFFSET;
        this.width = 800;
        this.height = 600;
        this.cost = 9;
        this.life = 3;
        this.kill = 0;

        this.enemiesTotal = 100;
        this.enemiesRemaining = this.enemiesTotal;

        // this.guardsRemaining = 8;

        this.enemies = [];
        this.guards = new Array(6).fill(0).map(() => new Array(10).fill(null));

        //test
        const test1 = new ShopItem({idx: 0});
        const test2 = new ShopItem({idx: 1});
        const test3 = new ShopItem({idx: 2});
        this.shop = [test1, test2, test3];

        this.lastCostTime = 0;
        this.lastWaveTime= 0;

        this.paused = false;
        this.pausedTime = 0;
        this.pauseInterval = null;

        this.gameOver =false;

        let startTime = new Date().getTime();
        this.firstWaveStart = startTime + 5000;
        this.firstWaveEnd = startTime + 20000;
        this.secondWaveStart = startTime + 25000;
        this.secondWaveEnd = startTime + 155000;

        this.waveInteval = 10000;

        this.guardSelected = null;
        this.mouseX = null;
        this.mouseY = null;

        this.c = document.getElementById("canvas");
        this.c.width = this.width;
        this.c.height = this.height;
        this.ctx = this.c.getContext("2d");
        // this.ctx.imageSmoothingEnabled = false;
        this.ctx.imageSmoothingQuality = "high"

        this.addListeners = this.addListeners.bind(this);
    }

    genCost(){
        let time = new Date().getTime()
        // console.log("passed" + (time - this.lastCostTime) / 1000)
        if (time - this.lastCostTime > 2000){
            this.cost += 1;
            this.lastCostTime = time;
        }
    }

    genEnemy(Klass, row){
        if (this.enemiesRemaining > 0){
            // new Minion({ row: row })
            let enemy = new Klass({row: row});
            this.enemies.push(enemy);
            this.enemiesRemaining -= 1;
        }
    }

    firstWave(time){
        if (time > this.firstWaveStart && time < this.firstWaveEnd) {
            if (time - this.lastWaveTime > this.waveInteval) {
                // this.genEnemy(Mushroom, 1);
                this.genEnemy(Dragon, 1);
                this.lastWaveTime = time;
            }
        }
    }

    secondWave(time){
        if (time > this.secondWaveStart && time < this.secondWaveEnd ){
            if (time - this.lastWaveTime > this.waveInteval){
                this.genEnemy(Mushroom, 0);
                this.genEnemy(Mushroom, 1);
                this.genEnemy(Mushroom, 2);
                this.lastWaveTime = time;
            }
        }
    }

    drawBoard() {
        const bg = document.getElementById("background");
        bg.width = this.width;
        bg.height = this.height;
        const bgx = bg.getContext("2d");
        this.board.draw(bgx);
    }

    drawStat(ctx){

        //life
        ctx.fillStyle = "white";
        // ctx.fillRect(700, 550, 30, 15)
		ctx.font = 'bold 16px Arial';
        ctx.fillText('Life: ' + Math.max(this.life, 0), 300, 35);

        // remaining
        ctx.fillStyle = "white";
        // ctx.fillRect(700, 550, 30, 15)
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Enemies: ' + (this.enemiesRemaining + this.enemies.length) + "/" + this.enemiesTotal, 400, 35);

        // cost
        ctx.fillStyle = "white";
        // ctx.fillRect(700, 550, 30, 15)
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Cost: ' + this.cost, 700, 560);
    }

    drawControl(){
        const ctx = this.ctx;
        ctx.fillStyle = "gray";
        ctx.fillRect(740, 10, 40, 40);
        const playIcon = new Image();
        const pauseIcon = new Image();
        playIcon.src = playButton;
        pauseIcon.src = pauseButton;

        let control = this.paused ? playIcon : pauseIcon;
        ctx.drawImage(control, 745, 15, 30, 30);
    }

    drawPaused(){
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#333';
        ctx.fillRect(0, this.topOffset, this.width, 400);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff'
        ctx.font = '40px Impact';
        let text = 'P A U S E D'
        ctx.fillText(text, this.width / 2 - ctx.measureText(text).width / 2, this.height / 2 - 20);
        ctx.restore();
    }

    drawEnemies(time){
        for (const enemy of this.enemies) {
            enemy.update(this.ctx, time, this.guards);
            if (enemy.touchDown()) {
                this.life -= 1;
                this.enemies = this.enemies.filter(min => (min !== enemy));
            };
            if (enemy.dead()) {
                this.kill += 1;
                this.enemies = this.enemies.filter(min => (min !== enemy));
            }
        }
    }

    drawGuards(time){
        let guards = this.guards.flat().filter(el => (el instanceof Guard));
        for (const guard of guards) {
            guard.update(this.ctx, time, this.enemies);
            if (guard.dead()) {
                this.guards[Math.floor(guard.y / 80)][Math.floor(guard.x / 80)] = null;
            }
        }
    }

    drawShop(){
        const ctx = this.ctx;
        ctx.fillStyle = "gray";
        ctx.fillRect(180, 400 + this.topOffset + 18, 3 * 80, 84);

        for (const item of this.shop){
            item.draw(ctx);
        }
    }

    drawGuardSelected(ctx){
        if (this.guardSelected){
            ctx.save();
            ctx.globalAlpha = 0.5;

            const image = new Image();
            image.src = this.guardSelected.image;
            ctx.drawImage(image, this.mouseX - 30, this.mouseY - 30, 60, 60);
            ctx.restore();
        }
    }

    update(){
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // hover effect when selected a guard
        this.drawActiveCell(ctx);
        this.drawGuardSelected(ctx);

        let time = new Date().getTime();
        this.genCost(time);
        this.drawStat(ctx);

        this.firstWave(time);
        this.secondWave(time);

        this.drawEnemies(time);
        this.drawGuards(time);

        this.drawShop(ctx);

        this.win();
        this.lost();
    }

    animate(){
        if (this.paused){
            this.drawPaused();
            this.drawControl();
        } else {
            this.update();
            this.drawBoard();
            this.drawControl();

            if (!this.gameOver){
                requestAnimationFrame(this.animate.bind(this))
            } 
        }

    }

    win(){
        if(this.enemies.length === 0 && this.enemiesRemaining === 0){
            setTimeout(() => this.gameOver = true, 2000);
            console.log("mission cleared")
        }
    }

    lost(){
        if (this.life <= 0){
            setTimeout(() => this.gameOver = true, 2000);
            console.log("you lost")
        }
    }

    addListeners() {
        window.addEventListener("mousemove", e => {
            let x = e.clientX;
            let y = e.clientY;
            this.mouseX = x;
            this.mouseY = y;
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
                    this.placeGuard(this.guardSelected);
                }
            } 
            this.guardSelected = null;
            this.activeCell = null;
        })

        window.addEventListener("click", e => {
            let x = e.clientX;
            let y = e.clientY;
            this.pauseGame(x, y)
        })
    }

    selectShopItem(x, y) {
        for (const item of this.shop) {
            if (x > item.x && x < (item.x + item.boxSize) && y > item.y && y < (item.y + item.boxSize)) {
                const guard = item.convert();
                if (this.cost >= guard.cost){
                    this.guardSelected = guard;
                }
            }
        }
    }

    validCell(x, y){
        if (x > 0 && x < this.width && y > 60 && y < 460){
            if (this.guards[Math.floor((y - this.topOffset) / 80)][Math.floor(x / 80)] === null){
                return true;
            }
        }
        return false;
    }

    drawActiveCell(ctx){
        if (this.guardSelected){
            let x = Math.floor(this.mouseX / 80) * 80;
            let y = Math.floor((this.mouseY - this.topOffset) / 80) * 80 + this.topOffset;
            if (this.validCell(this.mouseX, this.mouseY)){
                ctx.fillStyle = "rgba(0,0,0,0.2)";
                ctx.fillRect(x, y, 79, 79);
            }
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

    pauseGame(x, y) {
        if (x > 745 && x < 775 && y > 15 && y < 45) {
            this.paused = !this.paused;
            if (this.paused) {
                this.pauseInterval = setInterval(() => this.pausedTime += 100, 100)
            } else {
                this.updateWaveTime();
                clearInterval(this.pauseInterval);
                this.animate();
            }
        }
    }

    updateWaveTime() {
        this.firstWaveStart += this.pausedTime;
        this.firstWaveEnd += this.pausedTime;
        this.secondWaveStart += this.pausedTime;
        this.secondWaveEnd += this.pausedTime;
        this.lastCostTime += this.pausedTime;
        this.lastWaveTime += this.pausedTime;
        this.pausedTime = 0;
    }

    play(){
        this.animate();
        this.addListeners();
    }

}
