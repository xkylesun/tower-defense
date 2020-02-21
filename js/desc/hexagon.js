export default class Hexagon{
    constructor(c, data){
        this.width = c.width;
        this.height = c.height;

        this.ctx = c.getContext("2d");;

        this.topOffset = 30;
        this.side = 6;

        this.center = this.width / 2;
        this.radius = this.center - 35;

        this.angle = Math.PI * 2 / this.side;
        this.data = data || { Attack: 0, Health: 0, Cost: 0, Range: 0, Speed: 0, Skill: 0 }
    }

    drawPolygon () {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.save();
        ctx.strokeStyle = "#137BBE";
        // create inner hex with diff r
        let r = this.radius / this.side;
        for (let i = 0; i < this.side; i++) {
            ctx.beginPath();
            let currR = r * (i + 1);
            for (let j = 0; j < this.side; j++) {
                let x = Math.cos(this.angle * j) * currR + this.center;
                let y = Math.sin(this.angle * j) * currR + this.center;
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke()
        }
        ctx.restore();
    }

    // data = {Atk: 100, HP: 100, Cost: 70, Range: 30, AtkSpeed: 40, ability: 80}
    drawRegion() {
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        const statValues = Object.values(this.data);
        for (let i = 0; i < this.side; i++) {
            let x = Math.cos(this.angle * i) * this.radius * statValues[i] / 100 + this.center;
            let y = Math.sin(this.angle * i) * this.radius * statValues[i] / 100 + this.center;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.restore();
    }

    drawLine(){
        const ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "#137BBE";
        for (let i = 0; i < this.side; i++) {
            let x = Math.cos(this.angle * i) * this.radius + this.center;
            let y = Math.sin(this.angle * i) * this.radius + this.center;
            ctx.moveTo(this.center, this.center);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    }


    drawText() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "#343A40";
        ctx.font = "10px Open sans";
        let margin = 10;
        let statKeys = Object.keys(this.data);

        for (let i = 0; i < this.side; i++) {
            let x = Math.cos(this.angle * i) * this.radius + this.center;
            let y = Math.sin(this.angle * i) * this.radius + this.center;
            let text = statKeys[i];
            if (this.angle * i >= 0 && this.angle * i <= Math.PI / 2) {
                ctx.fillText(text, x, y + margin);
            } else if (this.angle * i > Math.PI / 2 && this.angle * i <= Math.PI) {
                ctx.fillText(text, x - ctx.measureText(text).width, y + margin);
            } else if (this.angle * i > Math.PI && this.angle * i <= Math.PI * 3 / 2) {
                ctx.fillText(text, x - ctx.measureText(text).width, y - margin / 3);
            } else {
                ctx.fillText(text, x, y - margin / 2);
            }
        }
        ctx.restore();
    }
}