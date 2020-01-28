
export default class Guard {
    constructor(spec) {
        this.health = spec.hp || 200;
        this.attack = spec.atk || 50;
        this.attackSpeed = spec.attackSpeed || 1000;
        this.position = [];
    }
}