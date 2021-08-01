import gsap from "gsap/all";
import { Container, Sprite } from "pixi.js";

export default class Star extends Container {
    private cont: Container;
    
    constructor() {
        super();

        const star = Sprite.from('star.png');
        star.x = -star.width /2 ;
        star.y = -star.height / 2;

        this.cont = new Container();
        this.cont.addChild(star);

        this.addChild(this.cont);

        this.animate();
        
    }

    private animate() {
        const rotation = -0.5 + Math.random() * 1;
        const sc = 0.1 + Math.random() * 0.9;
        gsap.to(this.cont, 1, {rotation});
        gsap.to(this.cont.scale, 1, {x : sc, y: sc, onComplete: this.animate.bind(this)});
    }
}