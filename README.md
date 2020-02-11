# Guardian - a tower defense variation
[Link to live site](https://xkylesun.github.io/tower-defense/) 

## Features
* Game logic written in Javascript
* Render via HTML5 Canvas
* Host on Github Pages

## Gameplay
* Drag guards to the battlefield to summon them
* Guards have different stats and its unique skills set (ranged attack, heal, etc.)
* Summoning guard will reduce available cost, which will regenerate automatically over time
* Letting minion move past the blue crystal will cost a life; each game start with three lives

## Documentation
### OOP
The design for this game follows the Object-oriented programming pattern. A superclass is created for both Guard and Minion class. Each type of guard is created from a subclass that extends the superclass. In such a way, class instances of the same type will share common attributes / functionalities written in the superclass and have their unique characteristics written on the subclass.

### Pace control
The game pace is controlled by limiting the interval during which a function will be triggered. Cost regeneration, enemy spawn, attack, and play frame are controlled
by its individual interval defined in the constructor
```javascript
// game.js
    let time = new Date().getTime();
    if (time - this.lastCostTime > this.costInterval){
    this.cost += 1;
    this.lastCostTime = time;
    }
```

### 

### Canvas
* Game rendering: 

  draw function are constantly running in requestAnimationFrame loop to create animation effect
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

* Data visualization

  comparison between different types of guards rendered via a radar chart using canvas
  
![](https://lh3.googleusercontent.com/ZIxEPdQNLl_gqQEvbbbcVv-eWOf869152wOsgxpclXg4lELCu9zXON_cyR0FoBxc9NTRJK7NUFO1VsRYW8yWRUwuYE6bCMkrgQI2EZYISdg8iSnDwfwhtMlygWKVU6IbBL6SZo7Pue7VH2Cc6EAJd93F63_XlAnq4lEpGGn2lVG7eYzdYOaNPD5KQ3aDjzSwm9PCM3MLDTcklpJzTwqMZPPFZeaLU-vlfcISYi0khZcIbYB3gnsyNpbunmPoSaasl2wKYTP78tLpP5n20puyVGTjpi30kni6DN530zZd6uFmIE1XEP99Y0wdGmOJFHV-MGI0Dodlp85fzvU-zcp0l3b6inOWBtD06nq-GgyTWSBZHnBMWqGtyD-OGUMMsxiDjqYqkz1kYMKeHrxeeFE6WMN5bM0CpPPOQoqT26v3b0SPCfWuTvuBoxxajbTdbXpQ_9op2v3S-YuORHqSek4Vhdd0ZqFJvhn_pSEroeolxnM0AUwpoeZ3gh3yGK_-JCMJF4sl5wm1wB_9KF_kuwzVXAmeh7oI1ZAv2mJSSR8sNXXnK768zhkvuvz2l176Lag4t852VeBFFuXSlKhVqsFk73t3r2k1PbX_HtS-QoGdTnOTSlNQyiDUirYVCVJEZHr_H7uFf8eN7mXjvZpqBVmZDJl7q15JX0gwuNlgfFEwdYTE689WtBR7GYM=w514-h188-no "radar-chart")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
