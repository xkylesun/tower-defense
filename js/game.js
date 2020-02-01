
export const TOP_OFFSET = 60;

import Entry from "./entry";

import Mushroom from "./enemies/mushroom";
import Dragon from "./enemies/dragon";

import Guard from "./guards/guard";
import Priest from "./guards/priest";

import Board from "./board";
import ShopItem from "./shop_item";

import playButton from "../assets/play-button.svg";
import pauseButton from "../assets/pause-button.svg";

import { toCanvasX, toCanvasY } from "./util";

export default class Game {
    constructor(entry){

        this.entry = entry;

        this.board = new Board();
        this.topOffset = TOP_OFFSET;
        this.width = 800;
        this.height = 600;
        this.cost = 9;
        this.life = 3;
        this.kill = 0;

        this.enemiesTotal = 10;
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
        this.firstWaveStart = startTime;
        this.firstWaveEnd = startTime + 25000;
        this.secondWaveStart = startTime + 30000;
        this.secondWaveEnd = startTime + 155000;

        this.waveInterval = 1000;

        this.guardSelected = null;
        this.mouseX = null;
        this.mouseY = null;

        this.c = this.entry.c;
        this.ctx = this.entry.ctx;

        this.playIcon = new Image();
        this.playIcon.src = playButton;
        this.pauseIcon = new Image();
        this.pauseIcon.src = pauseButton;

        this.addListeners = this.addListeners.bind(this);
        this.restartGame = this.restartGame.bind(this);


    }

    genCost(){
        let time = new Date().getTime()
        if (time - this.lastCostTime > 2000){
            this.cost += 1;
            this.lastCostTime = time;
        }
    }

    genEnemy(Klass, row){
        if (this.enemiesRemaining > 0){
            let enemy = new Klass({row: row});
            this.enemies.push(enemy);
            this.enemiesRemaining -= 1;
        }
    }

    firstWave(time){
        if (time > this.firstWaveStart && time < this.firstWaveEnd) {
            this.board.background[2][0] = "red";
            if (time - this.lastWaveTime > this.waveInterval) {
                setTimeout(() => {
                    this.genEnemy(Mushroom, 2);
                }, 2000)
                this.lastWaveTime = time;
            }
        }
    }

    randomEnemy(){
        let enemies = [Mushroom, Mushroom, Dragon];
        return enemies[Math.floor(Math.random() * enemies.length)]
    }

    secondWave(time){
        if (time > this.secondWaveStart && time < this.secondWaveEnd ){
            for (let i = 1; i < 4; i++) {
                this.board.background[i][0] = "red";
            }
            if (time - this.lastWaveTime > this.waveInterval){
                setTimeout(() => {
                    this.genEnemy(this.randomEnemy(), 1);
                    setTimeout(() => this.genEnemy(this.randomEnemy(), 2), 3000);
                    this.genEnemy(this.randomEnemy(), 3);
                }, 2000)
                this.lastWaveTime = time;

            }
        }
    }

    drawStat(){
        const ctx = this.ctx;
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
        let control = this.paused ? this.playIcon : this.pauseIcon;
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
            // special rule for healer
            if (guard instanceof Priest){
                guard.update(this.ctx, time, this.guards);
            } else {
                guard.update(this.ctx, time, this.enemies);
            }
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

    drawGuardSelected(){
        const ctx = this.ctx;
        if (this.guardSelected){
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.drawImage(this.guardSelected.image, this.mouseX - 30, this.mouseY - 30, 60, 60);
            ctx.restore();
        }
    }

    drawBoard(){
        const bg = document.getElementById("background");
        bg.width = this.width;
        bg.height = this.height;
        const bgx = bg.getContext("2d");
        this.board.draw(bgx);
    }

    update(){
        let time = new Date().getTime();
        this.drawBoard()

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        this.drawEnemies(time);
        this.drawGuards(time);

        this.win();
        this.lost();
        
        // hover effect of dragging guard
        this.drawActiveCell();
        this.drawGuardSelected();


        this.genCost(time);
        this.drawStat();

        this.firstWave(time);
        this.secondWave(time);

        // this.drawEnemies(time);
        // this.drawGuards(time);

        this.drawShop();
        this.drawControl();

    }

    animate(){
        if (this.paused){
            this.drawPaused();
            this.drawControl();
        } else {
            this.update();
            if (!this.gameOver){
                requestAnimationFrame(this.animate.bind(this))
            } 
        }

    }

    win(){
        if(this.enemies.length === 0 && this.enemiesRemaining === 0 && this.life > 0){
            // setTimeout(() => this.gameOver = true, 2000);
            this.gameOver = true;

            this.drawGameOver("MISSION CLEARED");
        }
    }

    lost(){
        if (this.life <= 0){
            this.gameOver = true;

            this.drawGameOver("YOU LOST");
        }
    }

    addListeners() {
        this.c.addEventListener("mousemove", e => {
            let x = toCanvasX(this.c, e);
            let y = toCanvasY(this.c, e);
            this.mouseX = x;
            this.mouseY = y;
        });

        this.c.addEventListener("mousedown", e => {
            let x = this.mouseX;
            let y = this.mouseY;
            this.selectShopItem(x, y);
        })

        this.c.addEventListener("mouseup", e => {
            if (this.guardSelected){
                let x = this.mouseX;
                let y = this.mouseY;
                if (this.validCell(x, y)){
                    this.guardSelected.x = Math.floor(x / 80) * 80;
                    this.guardSelected.y = Math.floor((y - this.topOffset) / 80) * 80;
                    this.placeGuard(this.guardSelected);
                }
            } 
            this.guardSelected = null;
            this.activeCell = null;
        })

        this.c.addEventListener("click", e => {
            let x = this.mouseX;
            let y = this.mouseY;
            this.pauseGame(x, y);
            this.restartGame(x, y);
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
        if (x > 80 && x < this.width - 80 && y > 60 && y < 460){
            if (this.guards[Math.floor((y - this.topOffset) / 80)][Math.floor(x / 80)] === null){
                return true;
            }
        }
        return false;
    }

    drawActiveCell(){
        const ctx = this.ctx;
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
        if (x > 740 && x < 780 && y > 10 && y < 50 && !this.gameOver) {
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

    drawGameOver(text){
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = '#333';
        ctx.fillRect(0, this.topOffset, this.width, 400);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff'
        ctx.font = '40px Impact';
        ctx.fillText(text, this.width / 2 - ctx.measureText(text).width / 2, this.height / 2 - 20);
        ctx.fillStyle = "gray";
        ctx.fillRect(300, 350, 200, 50);
        ctx.fillStyle = "white";
        ctx.font = '28px Impact';
        let btnText = 'PLAY AGAIN';
        ctx.fillText(btnText, this.width / 2 - ctx.measureText(btnText).width / 2, this.height / 2 + 85);
        ctx.restore();

    }

    restartGame(x, y){
        if (this.gameOver && x > 300 && x < 500 && y > 350 && y < 400) {

            // to remove event listenrs
            const clone = this.c.cloneNode(true);
            this.c = clone;

            this.entry.restart();
        }
    }


}
