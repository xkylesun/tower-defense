import Game from "./game";
import { toCanvasX, toCanvasY } from "./util";

import background from "../assets/entry-bg.jpg";

export default class Menu {
    constructor(){
        this.width = 800;
        this.height = 600;
        this.c = document.getElementById("canvas");
        this.c.width = this.width;
        this.c.height = this.height;
        this.ctx = this.c.getContext("2d");
        this.ctx.imageSmoothingQuality = "high";

        this.bg = document.getElementById("background");
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bgx = this.bg.getContext("2d");

        this.start = this.start.bind(this);
        // this.restart = this.restart.bind(this);

        this.cb = e => {
            let x = toCanvasX(this.c, e);
            let y = toCanvasY(this.c, e);
            if (x > 300 && x < 500 && y > 400 && y < 450) {
                this.c.removeEventListener("click", this.cb)
                this.game = new Game(this);
                this.game.play();
            }
        };
        this.cb = this.cb.bind(this);
    }

    draw() {
        const ctx = this.ctx;
        const bgx = this.bgx;

        ctx.clearRect(0, 0, this.width, this.height);

        const bgEntry = new Image();
        bgEntry.src = background;
        bgEntry.onload = function () {
            bgx.drawImage(bgEntry, 0, 0, this.width, this.height);
        }

        ctx.save();
        ctx.fillStyle = "#E54059"; // red
        ctx.font = '40px Open sans';
        let title = 'G U A R D I A N S'
        ctx.fillText(title, this.width / 2 - ctx.measureText(title).width / 2, this.height / 2 - 40);
        ctx.fillRect(300, 400, 200, 50);
        ctx.fillStyle = "white";
        ctx.font = '28px Impact';
        let btnText = 'PLAY';
        ctx.fillText(btnText, this.width / 2 - ctx.measureText(btnText).width / 2, this.height / 2 + 135);
        ctx.restore();  
    }

    start(){
        this.draw();
        this.c.addEventListener("click", this.cb);
    }

    // restart(){
    //     this.game = new Game(this);
    //     this.game.play();
    // }
}

