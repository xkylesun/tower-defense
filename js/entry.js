import Description from "./desc/description";
import Menu from "./menu";

window.addEventListener('load', () => {
    new Menu().start();
    new Description().init();
});
