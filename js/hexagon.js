export default class Hexagon{
    constructor(spec){
        this.width = spec.width;
        this.height = spec.height;

        this.side = 6;

        this.center = this.width / 2;
        this.radius = this.center - 50;

        this.angle = Math.PI * 2 / this.side;
        this.data = spec.data || { Atk: 100, HP: 100, Cost: 70, Range: 30, AtkSpeed: 40, ability: 80 };

        this.c = document.getElementById("description");
        this.c.width = this.width;
        this.c.height = this.height;
        this.ctx = this.c.getContext("2d");

    }

    drawPolygon (ctx) {
        ctx.save();
        ctx.strokeStyle = "black";
    
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
    drawRegion(ctx) {
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
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        for (let i = 0; i < this.side; i++) {
            let x = Math.cos(this.angle * i) * this.radius + this.center;
            let y = Math.sin(this.angle * i) * this.radius + this.center;
            ctx.moveTo(this.center, this.center);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    }


    drawText(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "12px Open sans";
        let margin = 12;
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
                ctx.fillText(text, x - ctx.measureText(text).width, y);
            } else {
                ctx.fillText(text, x, y);
            }
        }
        ctx.restore();
    }
}