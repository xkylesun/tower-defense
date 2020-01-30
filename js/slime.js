import Minion from "./minion";
import slimeWalking from "../assets/blob_move.png";

export default class Slime extends Minion{
    constructor(props){
        super(props);
        this.health = 200
        this.maxHealth = 200
        this.attack = 20
        this.moveSpeed = 50
        this.moveLength = 2;
        this.attackSpeed = 1000
        this.image = slimeWalking;
    }

    draw(ctx) {
        const image = new Image();
        image.src = slimeWalking;
        ctx.drawImage(image, this.x, this.y + this.topOffset, this.size, this.size)
        this.drawHealthBar(ctx);
    }
};