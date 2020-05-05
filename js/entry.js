import Description from "./desc/description";
import Menu from "./menu";
require("../styles/00_reset.css");
require("../styles/game.css");

require('file-loader?name=[name].[ext]!../index.html');


window.addEventListener('load', () => {
    new Menu().start();
    new Description().init();
});
