# Guardian - a tower defense variation
[Link to live site](https://xkylesun.github.io/tower-defense/) 

## Features
* Game logic written in Javascript
* Render via HTML5 Canvas
* Host on Github Pages

## Documentation
### OOP
The design for this game follows the Object-oriented programming pattern. A superclass is created for guards and minions. Each type of guards is created from a child class that extends the superclass. In such ways, class instances of the same type will share common attributes / functionalities defined in the superclass and have their unique characteristics written on the child class.

```Javascript
// minion.js
// SUPER CLASS FOR MINION
export default class Minion {
...
}

// dragon.js
import Minion from "./minion";

export default class Dragon extends Minion {
...
}

```

### HTML5 Canvas
* Game rendering: 

  requestAnimationFrame loop is used to create animation effect within canvas at 60FPS. Within every run of animate(), serveral tasks (update positions, update health, update cost, etc) are performed to update the current game state, and the resulting frame is drawn to canvas via ctx.draw function.
  
```javascript
    animate(){
        if (this.paused){
            this.drawPaused();
            this.drawControl();
        } else {
            this.update();
            if (!this.gameOver){
                requestAnimationFrame(this.animate.bind(this))
            } 
        }
    }
```


* Data visualization:

  Comparison between different types of guards rendered via a interactive radar chart using canvas
  
 ```Javascript
     drawPolygon () {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.save();
        ctx.strokeStyle = "#137BBE";
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
 ```
  Demo:

![](https://lh3.googleusercontent.com/tVuyAvVvDzfGf_F5PeF9Ferthlkcwrf9KFiSfOYQzHYEo7ccfuKShBxY3hIc0jqdjRzrwAmnNh7iwZUkt2pbWw44emtHvXYmNosKU43lMMGucpOikM0C8H0S92EoyguRkeSO06RYDp-ur14UGSf45CNGegp7bG9RxC3-RwINTKyprOpfNo6wz7iguCTlPaVH40_cEKvSOrySp4aA2047o3klU4IuI7xNljTU1mTaCXHKJ3qeEE-sitPBM6yuwt3shZjMwlw6xYVmM-gnF9LbUnE0sC9HUBmuQxBATkG1t5X1MuN3tiVgz-L3mErMBhcsOk3QPqra0He8K106tM0dLLHyDiyy71IvbGDDKpHvOtccurJdYr33IuS5-Px5SgEvwqZp3o10cIpC3wg0R8QDzgDCIboDAkGCQxfNhUgnWncwJF25K6H4RjpzWkTzPSHAo97tIHyPRzSvSuJAVUeHEMGJihRUdScuSk7jNHee4oKxdobDTI-B-MDSnaoMAoHsqZrCAMvMkD0_3EosKEHhpr3oisdVgMROdquzVcwZYkJCqwJpoHeutJUbvcNPtrMYV0MsgPUye_CW9f7zpfMvcoSXnM_CLof1MufBqg9hBo17EiTW2c6Mwhj1aM8nk1VNEsKinah9FZgNLr9KcHjUQNlyu7_mZyNSQVmIQIkqwruUeOYe5YlS3Rjoyw5YvwISr_d7axDUvfJoAQ1G0W3Wz4yh3ZWrYd9BcQoWlsUMMZzXV4E=w514-h188-no "radar-chart")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
