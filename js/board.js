import { TOP_OFFSET } from "./game";
import ruby from "../assets/ruby.svg";
import bgTile from "../assets/bg-tile.png";
import lavaTile from "../assets/Lava #4.png";
import crystal from "../assets/Water Gem.svg";


export default class Board {
    constructor(){
        this.width = 800;
        this.height = 600;

        this.bg = document.getElementById("background");
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bgx = this.bg.getContext("2d");


        this.topOffset = TOP_OFFSET;

        this.ruby = new Image();
        this.ruby.src = ruby;

        this.bgTile = new Image();
        this.bgTile.src = bgTile;

        this.lavaTile = new Image();
        this.lavaTile.src = lavaTile;
        this.crystal = new Image();
        this.crystal.src = crystal;
    }

    draw(){
        const bgx = this.bgx;
        bgx.clearRect(0, 0, this.width, this.height)
        bgx.fillStyle = "black";
        bgx.fillRect(0, 0, this.width, this.height);
        // bgx.globalAlpha = 0.6;
        bgx.drawImage(this.bgTile, 0, this.topOffset, this.width, 160);
        bgx.drawImage(this.bgTile, 0, this.topOffset + 160, this.width, 160);
        // bgx.globalAlpha = 1;
        // bgx.drawImage(this.lavaTile, 0, this.topOffset, 800, 80)

        for (let i = 1; i < 4; i++) {

        }

        for (let i = 0; i < 10; i++) {

            bgx.drawImage(this.lavaTile, 80 * i, 1 + this.topOffset, 79, 79);
            bgx.drawImage(this.lavaTile, 80 * i, 1 + 80 * 4 + this.topOffset, 79, 79);
        }
        bgx.save();
        bgx.shadowColor = "black";
        bgx.shadowBlur = 10;
        bgx.shadowOffsetX = 10;
        bgx.shadowOffsetY = 20;
        for (let i = 0; i < 3; i++) {
            // bgx.drawImage(this.ruby, 0 + 10, 80 * (1 + i) + this.topOffset + 10, 60, 60);
            bgx.drawImage(this.crystal, 80 * 9 + 10, 80 * (1 + i) + this.topOffset + 10, 60, 60);
        }
        bgx.restore();
    }

    drawRuby(i){
        const bgx = this.bgx;
        bgx.save();
        bgx.shadowColor = "black";
        bgx.shadowBlur = 10;
        bgx.shadowOffsetX = 10;
        bgx.shadowOffsetY = 20;
        bgx.drawImage(this.ruby, 0 + 10, 80 * i + this.topOffset + 10, 60, 60);
        bgx.restore();

    }


}