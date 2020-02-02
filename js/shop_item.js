
import Guard from "./guards/guard";
import Priest from "./guards/priest";
import Vanguard from "./guards/vanguard";
import Mage from "./guards/mage";
import Berzerk from "./guards/berzerk";

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
        ctx.fillStyle = "#8B8B8B";
        ctx.fillRect(this.leftOffset + 80 * this.idx, 400 + this.topOffset + 18, 80, 84);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(this.leftOffset + 80 * this.idx, 400 + this.topOffset + 20, this.boxSize, this.boxSize)
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillRect(this.leftOffset + 60 + 80 * this.idx, 400 + this.topOffset + 22, 18, 20)
        ctx.fillStyle = "white";
        ctx.font = 'bold 16px Open sans';
        let text = this.guard.cost;
        ctx.fillText(text, this.leftOffset + 69 - ctx.measureText(text).width / 2 + 80 * this.idx, 400 + this.topOffset + 38)

        ctx.drawImage(this.guard.image, this.leftOffset + 10 + 80 * this.idx, 400 + this.topOffset + 30, 60, 60)
    }

    convert(){
        return cloneDeep(this.guard);
    }
}


// const SHOP = [Vanguard, Mage, Berzerk, Priest];
// SHOP = SHOP.map(k => new ShopItem(k));

// export { SHOP };