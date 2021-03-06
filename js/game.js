
export const TOP_OFFSET = 60;

import Mushroom from "./enemies/mushroom";
import Dragon from "./enemies/dragon";

import Guard from "./guards/guard";
import Priest from "./guards/priest";
import Vanguard from "./guards/vanguard";
import Archer from "./guards/archer";
import Berzerk from "./guards/berzerk";

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

        this.enemiesTotal = 30;
        this.enemiesRemaining = this.enemiesTotal;
        // this.guardsRemaining = 8;

        this.enemies = [];
        this.guards = new Array(6).fill(0).map(() => new Array(10).fill(null));

        const shop = [Vanguard, Archer, Berzerk, Priest];
        this.shop = shop.map((k, idx) => new ShopItem(k, idx));

        this.lastCostTime = 0;
        this.lastWaveTime= 0;

        this.paused = false;
        this.pausedTime = 0;
        this.pauseInterval = null;

        this.gameOver = false;

        let startTime = new Date().getTime();
        this.firstWaveStart = startTime + 2000;
        this.firstWaveEnd = startTime + 38000;
        this.secondWaveStart = startTime + 45000;
        // this.secondWaveEnd = startTime + 155000;

        this.waveInterval = 10000;
        this.lastSpawnRow = null;

        this.costInterval = 1000;

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
        let time = new Date().getTime();
        if (time - this.lastCostTime > this.costInterval){
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

    randomRow(){
        return [1,2,3][Math.floor(Math.random() * 3)];
    }

    firstWave(time){
        if (time > this.firstWaveStart && time < this.firstWaveEnd) {
            if (time - this.lastWaveTime > this.waveInterval) {
                let row = this.randomRow();
                this.lastSpawnRow = row;
                setTimeout(() => {
                    this.genEnemy(Mushroom, row);
                }, 3000);
                this.lastWaveTime = time;
            }
            if (this.lastSpawnRow){
                this.board.drawRuby(this.lastSpawnRow);
            }
        }
    }

    randomEnemy(){
        let enemies = [Mushroom, Dragon];
        return enemies[Math.floor(Math.random() * enemies.length)]
    }

    secondWave(time){
        if (time > this.secondWaveStart){
            if (time - this.lastWaveTime > this.waveInterval){
                setTimeout(() => {
                    this.genEnemy(this.randomEnemy(), 1);
                    setTimeout(() => this.genEnemy(this.randomEnemy(), 2), 3000);
                    this.genEnemy(this.randomEnemy(), 3);
                }, 3000)
                this.lastWaveTime = time;
            }
            for (let i = 1; i < 4; i++){
                this.board.drawRuby(i);
            }
        }
    }

    drawStat(){
        const ctx = this.ctx;
        ctx.save();
        //life
        ctx.fillStyle = "white";
        ctx.font = 'bold 18px Open sans';
        ctx.fillText('LIFE: ' + Math.max(this.life, 0), 250, 35);

        // remaining
        ctx.fillStyle = "white";
        ctx.font = 'bold 18px Open sans';
        ctx.fillText('ENEMIES: ' + (this.enemiesRemaining + this.enemies.length) + "/" + this.enemiesTotal, 400, 35);

        // cost
        ctx.fillStyle = "white";
        ctx.font = 'bold 18px Open sans';
        ctx.fillText('COST: ' + this.cost, 700, 560);
        ctx.restore();
    }

    drawControl(){
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "#8B8B8B"; // lite gray
        ctx.fillRect(760, 10, 40, 40);
        let control = this.paused ? this.playIcon : this.pauseIcon;
        ctx.drawImage(control, 765, 15, 30, 30);
        ctx.restore();
    }

    drawPaused(){
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#5C5C5C';  
        ctx.fillRect(0, this.topOffset, this.width, 400);
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '42px Open sans';
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

    drawGuards(){
        let guards = this.guards.flat().filter(el => (el instanceof Guard));
        for (const guard of guards) {
            // special rule for healer
            if (guard instanceof Priest){
                guard.update(this.ctx, guards);
            } else {
                guard.update(this.ctx, this.enemies);
            }
            if (guard.dead()) {
                this.guards[Math.floor(guard.y / 80)][Math.floor(guard.x / 80)] = null;
            }
        }
    }

    drawShop(){
        const ctx = this.ctx;
        for (const item of this.shop){
            item.draw(ctx);
        }
    }

    drawGuardSelected(){
        const ctx = this.ctx;
        if (this.guardSelected){
            ctx.save();
            ctx.globalAlpha = 0.6;
            ctx.drawImage(this.guardSelected.icon, this.mouseX - 35, this.mouseY - 40, 72, 72);
            ctx.restore();
        }
    }

    drawBoard(){
        this.board.draw();
    }

    update(){
        let time = new Date().getTime();
        this.drawBoard()

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        this.drawGuards();
        
        this.win();
        this.lost();
        
        this.drawEnemies(time);

        // hover effect of dragging guard
        this.drawActiveCell();
        this.drawGuardSelected();

        this.genCost(time);
        this.drawStat();

        this.firstWave(time);
        this.secondWave(time);

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
            this.drawGameOver("M I S S I O N  C L E A R E D");
            this.gameOver = true;
        }
    }

    lost(){
        if (this.life <= 0){
            this.drawGameOver("Y O U  L O S T");
            this.gameOver = true;
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
        if (x > 80 && x < this.width - 80 && y > this.topOffset + 80 && y < this.topOffset + 4 * 80){
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
                ctx.save();
                // draw range in blue
                ctx.fillStyle = "rgb(87, 166, 186, 0.5)";
                let rangeX = this.guardSelected.rangeX;
                let rangeY = this.guardSelected.rangeY;
                ctx.fillRect(x + 1 - rangeX, y + 1 - rangeY, rangeX + 79, 79 + rangeY * 2);
                // draw active cell in green
                ctx.fillStyle = "rgb(118,171, 118, 0.5)";
                ctx.fillRect(x + 1, y + 1, 79, 79);
                ctx.restore();
            }
        }
    }

    placeGuard(guard) {
        if (this.cost >= guard.cost) {
            this.cost -= guard.cost;
            this.guards[Math.floor(guard.y / 80)][Math.floor(guard.x / 80)] = guard;
        } 
    }

    pauseGame(x, y) {
        if (x > 760 && x < 800 && y > 10 && y < 50 && !this.gameOver) {
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
        // this.secondWaveEnd += this.pausedTime;
        this.lastCostTime += this.pausedTime;
        this.lastWaveTime += this.pausedTime;
        // reset pause time
        this.pausedTime = 0;
    }

    play(){
        this.animate();
        this.addListeners();
    }

    drawGameOver(text){
        const ctx = this.ctx;
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#5C5C5C';
        ctx.fillRect(0, this.topOffset, this.width, 400);
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '42px Open sans';
        ctx.fillText(text, this.width / 2 - ctx.measureText(text).width / 2, this.height / 2 - 20);
        ctx.fillStyle = "#E54059"; //darker gray
        ctx.fillRect(300, 350, 200, 50);
        ctx.fillStyle = "white";
        ctx.font = '28px Impact';
        let btnText = 'RETURN';
        ctx.fillText(btnText, this.width / 2 - ctx.measureText(btnText).width / 2, this.height / 2 + 85);
        ctx.restore();
    }

    restartGame(x, y){
        if (this.gameOver && x > 300 && x < 500 && y > 350 && y < 400) {
            // to remove event listenrs
            const clone = this.c.cloneNode(true);
            this.c = clone;
            this.gameOver = false;
            this.entry.start();
        }
    }
}

