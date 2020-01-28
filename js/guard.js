
class Guard {
    constructor(spec) {
        this.x = spec.x || 240;
        this.y = spec.y || 0;

        this.health = spec.hp || 1000;
        this.attack = spec.atk || 0;
        this.attackInterval = 1000;

        this.enemiesInRange = [];
        this.lastAttacked = 0;
        this.range = 3 * 80;

    }

    CheckInRange(enemies){
        let temp = []
        let rangeX = Math.max(this.x - this.range, 0);
        for(const enemy of enemies){
            if (enemy.x > rangeX && enemy.y === this.y && !this.enemiesInRange.includes(enemy)){
                temp.push(enemy)
            }
        }
        this.enemiesInRange = temp.sort((a, b) => b.x - a.x);
    }

    strike(time){
        if (this.enemiesInRange.length > 0){
            if (time - this.lastAttacked > this.attackInterval) {
                // console.log("health" + this.enemiesInRange[0].health)
                this.enemiesInRange[0].health -= this.attack;
                this.lastAttacked = time;
            }
        }
    }

    draw(ctx) {
        // ctx.drawImage(this.image, this.x)
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y + 60, 60, 60);
    }

    update(ctx, time, enemies) {
        this.CheckInRange(enemies);
        this.strike(time);
        this.draw(ctx);
    }

    dead(){
        if (this.health <= 0) console.log("dead")

        return this.health <= 0;
    }

}