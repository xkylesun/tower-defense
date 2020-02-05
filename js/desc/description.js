import Hexagon from "./hexagon";
// import { toCanvasX, toCanvasY } from "./js/util";

export default class Description {
    constructor(){
        this.data = {
            vanguard: { Attack: 30, Health: 90, Cost: 30, Range: 30, Speed: 70, Skill: 40 },
            archer: { Attack: 90, Health: 40, Cost: 100, Range: 100, Speed: 50, Skill: 80 },
            berserker: { Attack: 70, Health: 75, Cost: 80, Range: 30, Speed: 30, Skill: 80 },
            priest: { Attack: 0, Health: 50, Cost: 60, Range: 80, Speed: 60, Skill: 60 }
        };

        this.c = document.getElementById("hexagon");
        this.c.width = 220;
        this.c.height = 220;
        
    };

    init() {
        this.drawHex("vanguard")
        this.addListener();
    }

    drawHex(name){
        const hex = new Hexagon(this.c, this.data[name]);
        hex.drawPolygon();
        hex.drawLine();
        hex.drawRegion();
        hex.drawText();
    }

    addListener(){
        const charList = Array.from(document.getElementsByClassName("char"));
        for (let i = 0; i < charList.length; i++){
            charList[i].addEventListener("click", (e) => {
                this.toggleImage(e);
            })
        }
    }

    toggleImage(e){
        e.target.classList.add("selected");
        const charList = Array.from(document.getElementsByClassName("char"));
        this.toggleDesc(e.target.id);
        this.drawHex(e.target.id);
        for (const char of charList){
            if (char !== e.target){
                char.classList.remove("selected");
            }
        }
    }

    toggleDesc(name){
        const descList = Array.from(document.getElementsByClassName("desc"));
        const target = document.getElementById("desc-" + name);
        for (const desc of descList){
            target !== desc ? desc.classList.add("hidden") : desc.classList.remove("hidden");
        }
    }

}