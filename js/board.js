class Board {
    constructor(){
        this.width = 800;
        this.height = 600;
        this.background = new Array(6).fill(0).map(() => new Array(8).fill("#d3d3d3"));
        this.background[0][0] = "red";
  
    }

    draw(bgx){

        for (let i = 0; i < this.width / 100; i++){
            for (let j = 0; j < this.height / 100; j++){
                bgx.beginPath();
                bgx.lineWidth = "1";
                bgx.strokeStyle = "black";
                bgx.rect(i * 100, j * 100, 100, 100)
                bgx.stroke();
                bgx.fillStyle = this.background[j][i];
                bgx.fillRect(i * 100, j * 100, 100, 100)
            }
        }
    }



}