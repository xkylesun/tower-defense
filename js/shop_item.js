import { TOP_OFFSET } from "./game";
import Guard from "./guard";
import { cloneDeep } from "lodash";

export default class ShopItem {
    constructor(spec){
        this.topOffset = TOP_OFFSET;
        this.boxSize = 80;

        this.guard = spec.guard || new Guard({});
        this.idx = spec.idx;
        this.x = 180 + spec.idx * 82;
        this.y = 400 + this.topOffset + 22;
    }

    draw(ctx){
        // shop inner border: 180 + ( 80 * 2 ) * idx
        let i = this.idx;
        let leftX = 180 + 80 * i;
        let topY = 400 + this.topOffset;

        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(leftX, topY + 20, this.boxSize, this.boxSize)
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.fillRect(leftX + 58, topY + 22, 20, 20);
        ctx.fillStyle = "white";
        ctx.font = 'bold 16px Arial';
        ctx.fillText(this.guard.cost, leftX + 64, topY + 38);

        const image = new Image();
        image.src = this.guard.image;
        ctx.drawImage(image, leftX + 10, topY + 30, 60, 60)
    }

    convert(){ 
        return cloneDeep(this.guard);
        // return this.guard;
    }
}

// class Shop {
//     constructor(){
//         const guard1;
//         this.list = [];
//     }
// }