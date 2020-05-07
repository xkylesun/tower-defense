export const toCanvasX = (c, e) => {
        let posX = 0;
        if (e.pageX) {
            posX = e.pageX;
        } else if (e.clientX) {
            posX = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
        }
        posX = posX - c.offsetLeft;
        return posX;
}

export const toCanvasY = (c, e) => {
        let posY = 0;
        if (e.pageY) {
            posY = e.pageY;
        } else if (e.clientY) {
            posY = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        posY = posY - c.offsetTop;
        return posY;
}

// export const addSound = (src) => {
//     this.sound = document.createElement("audio");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     document.body.appendChild(this.sound);
//     this.play = function () {
//         this.sound.play();
//     }
//     this.stop = function () {
//         this.sound.pause();
//     }
// }