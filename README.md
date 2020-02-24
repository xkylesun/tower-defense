# Guardian - a tower defense variation
[Link to live site](https://xkylesun.github.io/tower-defense/) 

## Features
* Game logic written in Javascript
* Render via HTML5 Canvas
* Host on Github Pages

## Documentation
### OOP
The design for this game follows the Object-oriented programming pattern. A superclass is created for guards and minions. Each type of guards is created from a child class that extends the superclass. In such ways, class instances of the same type will share common attributes / functionalities defined in the superclass and have their unique characteristics written on the child class.

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

![](https://lh3.googleusercontent.com/hJgORtrNVB2wevQaSoXomvalWE5RaEf-gnOscvvk9NEFSGG7zWUlNsVO9NXaBJsv1_n6NLkn02ESJ7zBeCk0m9s8PnqB9H3meRKadM5XZ3_aQ41oPwe_Moe0kEmfetB3x0sjcpCL3xlUeMPMynj_GWspdH223E7H6ikbdzLUsNkNgU9ZRLK3cvg1IKTHtQ3mkm9EJxm0875CfALUD9cAFLwSvdzWUq86RDV9t_eVcYOVjfzq9spr5Utv9cBYq_ysnaTgYUzSdUv4K6o41RU1SMG9I3Ry6I42zwBMbxOj1qkpgLkFrx-lvf0LuwbzyCDGglIGFnQvB_Q8WxP0--ASICZlDbs3KcmEABaBQRzh0nfqOuCBDRS45pfIi01-FwJ6_UUd0oVLKC15IRxqOTTjA8vQ3SM7QdQlR8V0J8UIJsAH5xdXy4u7YQKucvL6Cjx9NlqOpeuavET4ZFX0Te-uKZCHazvJLoucXDsmMFMMC_evYFeL8Eqxqasm-YCSqDOATULDUDWTtPq1UPVq2yrWVZJwU7ACpp7VhBU3tOFIA5kYiSw-yfAkzNQV5CgoVDJ3Tuu2W3kNQoDgL1x89UXDUjPieOP8Cx7peO8JV4xplO9lWz7nRtLvgXCShME21h_uVaF4Bm5itwy-65izRaErz1HSAB-vTpf9H6JXw43PKxLuOC3dgJK13Q=w514-h188-no "radar-chart")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
