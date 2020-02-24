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

![](https://lh3.googleusercontent.com/uxR_R3x9DpzXnrP1veWl0EqWeOL8uZ-6_FgBeFe6W6fwiJjFU9moSFpJCBFLCkZutr8edWKj57eLuZ2E6d0WFJ3uGZEm-7fbk3Dy8IpwJUOwqPRhWe_vdzQGSY-Vst5jGICPLm5JV8OSzBH2ocVG59yzkwODgeGoODdBV7Exw3s5sU7Q8T6zrTyK1a8fL35zPrcAqjeanNK6wV_QpfJ9Kk0fp8Tu0w7PXvITSfboSLQUvioWR9g58V8Y6LBUfrsj7aKsa4nBkXzsxsJknxyQ_GII0PK81HSafyO3mu1j17bJyDCcufE0V-FDHPZeq2qcIEMtzjVJfykKUYoGqihiZ-_JqWUYLVco8G5Ndt1RwROvM_JmCowilyM2ictUKLpHqb-6ZqTFIS3xmONaTRoisikJFYFeleZqCscF3ragONGsmrzfhfnCPY_BWkQqUycBJYiF630XBKeHZcbVFIOA5_WiYiWkSnKGs50EJ3yzi3ph8mECTrcZpe-6Agq9VD_H6kXH9EdUpkp1awa4wPWTqLR5zHYWGtcfZV2Q5y0t46Ymyn1zxmG6Fn265YfUQ99B5ZOajozgvSAjgIP7ppAAtyHTpuvfUfh3AVT7PBDDZKp0ohKZe60dVCwgsQ_TNrKyg3EoUD3lFyXhShfogsEiDde7hZLVGrGMwq2zeXYot0vGed58WmuldA=w514-h188-no "radar-chart")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
