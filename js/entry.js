import Game from "./game";

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game;
    game.play();
});
