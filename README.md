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
  
![alt text](https://lh3.googleusercontent.com/vObyFBgG4p_6BFdaLtkClj-IJadDHjrutc4XddHHKKZEDiS6UdwsBAYb-8vrA7Nzjr8SdMg-ZsCohY5MLTwD7rGAziIbY7mqc46mD6_jSDX7TIpRXL7jaEmtb6CoeslnlIlRRq--rYa87GO5Ebs6u4gsKOAvKLvqkFeNQeh1ZrECeDTtLYjNL3E3pHyJRnWKXhad-wJNzzNs5Fko3uVL_klWoWR2fk9OuNTm0zDG9e7_vxhboz7bhLki1gJh28wiAYyySjaxgerO8qv-bdMgJLZ9lEpag2qDCsl2EkM29ATNPwmj_OEONcEdZ6O7eV6AB9_5nsHfoURxm-cRPiYyTwgrAe0VmIMMonwKZzeWCvkBOlQdzEhsy3pZZGrWwWpc2JwTUmGcPeF4612AGNDZzRxP5bL081BSoYjQIFAiCqASVSrVei2cuK2DmrFZ6naLrLO2MkyvkhqpqpbDxtf4mrqvXVZuL3ka42mA0VW0vXmHoBFlm9zruDoUBILr_v6NIgSUD8uniN3QB3bPxtBmC00a0mpFMqn76obpcRVq861kwcMNR3BcA8ksz2nT_as2jvyHXec-qnHorjMrhKzLluEgMCVfMuaymTaLmGtcbyJqi3jTVGCYMjRCQIGLn7mWKUbv4EkciPQZe_NZz5R-7zNdl4cNmNjXcJPt7XGzf2tP8ahXwWycbJI=w514-h188-no "Radar-chart-ex")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
