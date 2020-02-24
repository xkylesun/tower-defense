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

Demo: 
![](https://lh3.googleusercontent.com/0Zrn1WibJzV9kPyPFqY0OSEgNT6fveS5XOpt-bIsewC779DqhR2B_nidjDfu-RS2sxS5_xMfcrBsy8rhJXY1FoSRiO8rBHPYDdFWNNgCE3nfJN-ICYrJ9y-OL4rz3xtYNOVPeR5MsQZHHzSiPiUdgfi8JfXTIajIH6i_AF4fiWa12G-n03qmmxI-MzpwniJrbI46JN7fVEw9HjB0_UhZLKWjufu1Ydt1-vaNJM2kt3O0om2xBcUdWem05WyBp2NXHwqfXPO637HA66rrSTP6t-KpLh8MyLYmd3jVW-pk4VmQOfVr1KwW-wtn5Fym7_JROg3Q2Snta3CEDwnVEtsObpPK25kbAhIxn5b8GbhNpnAtvljQeLhG4fQ-JLkx5qZVKDwkFPi_pd0xpYXxoPLm-23nHmZEAtM6N3rZ3Ft_fR29udpCQlBjRYFxWgykX-Fsv17nk9BdSVwkir4PxQAfUNvMLvvVh4qlUuzc7bhrikLksUCl6xwyf6v1j4EyCt-Ja_m5YC17xAwt30BISEQfgi0wcgEWL_1j2MC74McWgDj9a30ObkFDXmshP7HpwOBDpbFFTt8HKLoPUrGZIN2-aa3tUkrlSiKaDAecIHNPIL68u4oPPWI_Zw_PPuKZs2mzVxZQMFewQXHIIZlKsj_mtPhe0RNYoN5ssTL_DuW1PC_kZzFDKEWo5A=w646-h448-no "game-demo")

* Data visualization

  comparison between different types of guards rendered via a radar chart using canvas

![](https://lh3.googleusercontent.com/uxR_R3x9DpzXnrP1veWl0EqWeOL8uZ-6_FgBeFe6W6fwiJjFU9moSFpJCBFLCkZutr8edWKj57eLuZ2E6d0WFJ3uGZEm-7fbk3Dy8IpwJUOwqPRhWe_vdzQGSY-Vst5jGICPLm5JV8OSzBH2ocVG59yzkwODgeGoODdBV7Exw3s5sU7Q8T6zrTyK1a8fL35zPrcAqjeanNK6wV_QpfJ9Kk0fp8Tu0w7PXvITSfboSLQUvioWR9g58V8Y6LBUfrsj7aKsa4nBkXzsxsJknxyQ_GII0PK81HSafyO3mu1j17bJyDCcufE0V-FDHPZeq2qcIEMtzjVJfykKUYoGqihiZ-_JqWUYLVco8G5Ndt1RwROvM_JmCowilyM2ictUKLpHqb-6ZqTFIS3xmONaTRoisikJFYFeleZqCscF3ragONGsmrzfhfnCPY_BWkQqUycBJYiF630XBKeHZcbVFIOA5_WiYiWkSnKGs50EJ3yzi3ph8mECTrcZpe-6Agq9VD_H6kXH9EdUpkp1awa4wPWTqLR5zHYWGtcfZV2Q5y0t46Ymyn1zxmG6Fn265YfUQ99B5ZOajozgvSAjgIP7ppAAtyHTpuvfUfh3AVT7PBDDZKp0ohKZe60dVCwgsQ_TNrKyg3EoUD3lFyXhShfogsEiDde7hZLVGrGMwq2zeXYot0vGed58WmuldA=w514-h188-no "radar-chart")


## Acknowledgements
* Game assets from [GIPHY](https://giphy.com/) and [The Spriter Resource](https://www.spriters-resource.com/pc_computer/maplestory/)
* Game design inspired by [Plants vs. Zombies](https://www.ea.com/studios/popcap/plants-vs-zombies) and [Arknights](https://www.arknights.global/)
