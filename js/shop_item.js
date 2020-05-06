
import Guard from "./guards/guard";
import { cloneDeep } from "lodash";
import { TOP_OFFSET } from "./game";

export default class ShopItem {
    constructor(Klass, idx){
        this.topOffset = TOP_OFFSET;

        this.boxSize = 80;
        this.guard = new Klass() || new Guard();
        this.idx = idx;
        this.leftOffset = 240;
        this.x = this.leftOffset + idx * 82;
        this.y = 400 + this.topOffset + 22;

    }

    draw(ctx){
        // shop inner border: 180 + ( 80 * 2 ) * idx
        ctx.fillStyle = "#4C5C68";
        ctx.fillRect(this.leftOffset + 80 * this.idx, 400 + this.topOffset + 18, 80, 84);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(this.leftOffset + 80 * this.idx, 400 + this.topOffset + 20, this.boxSize, this.boxSize)
        ctx.stroke();
        
        ctx.drawImage(this.guard.icon, this.leftOffset + 82 * this.idx, 400 + this.topOffset + 25, 72, 72)
        
        ctx.fillStyle = "black";
        ctx.fillRect(this.leftOffset + 60 + 80 * this.idx, 400 + this.topOffset + 22, 18, 20)
        
        ctx.fillStyle = "white";
        ctx.font = 'bold 16px Open sans';
        let cost = this.guard.cost;
        ctx.fillText(cost, this.leftOffset + 69 - ctx.measureText(cost).width / 2 + 80 * this.idx, 400 + this.topOffset + 38);
        let klass = this.guard.klass;
        ctx.fillText(klass, this.leftOffset + 40 - ctx.measureText(klass).width / 2 + 80 * this.idx, 400 + this.topOffset + 30 + 90)
        
    }

    convert(){
        return cloneDeep(this.guard);
    }
}

