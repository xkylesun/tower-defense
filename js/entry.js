import Description from "./desc/description";
import Menu from "./menu";
require("../styles/00_reset.css");
require("../styles/game.css");

require('file-loader?name=[name].[ext]!../index.html');
// require('file-loader?name=styles/[name].[ext]!../styles/game.css');
// require('file-loader?name=styles/[name].[ext]!../styles/00_reset.css');

window.addEventListener('load', () => {
    new Menu().start();
    new Description().init();
});
