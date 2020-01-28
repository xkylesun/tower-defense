class Board {
    constructor(){
        this.width = 800;
        this.height = 600;
        this.background = new Array(6).fill(0).map(() => new Array(8).fill("#d3d3d3"));
        this.background[1][0] = "red";
  
    }

    draw(bgx){
        bgx.fillStyle = "black";
        bgx.fillRect(0, 0, 800, 600);

        for (let i = 0; i < 10; i++){
            for (let j = 0; j < 5; j++){
                bgx.beginPath();
                bgx.lineWidth = "1";
                bgx.strokeStyle = "black";
                bgx.rect(i * 80, j * 80 + 50, 80, 80)
                bgx.stroke();
                bgx.fillStyle = this.background[j][i];
                bgx.fillRect(i * 80, j * 80 + 50, 80, 80)
            }
        }
    }



}