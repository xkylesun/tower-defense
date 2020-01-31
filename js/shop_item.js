
import Guard from "./guard";
import Priest from "./priest";
import Warrior from "./warrior";
import Mage from "./mage";

import { cloneDeep } from "lodash";
import { TOP_OFFSET } from "./game";

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
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "white";
        ctx.rect(180 + 80 * this.idx, 400 + this.topOffset + 20, this.boxSize, this.boxSize)
        ctx.stroke();

        ctx.drawImage(this.guard.image, 190 + 80 * this.idx, 400 + this.topOffset + 30, 60, 60)
    }

    convert(){
        return cloneDeep(this.guard);
    }
}