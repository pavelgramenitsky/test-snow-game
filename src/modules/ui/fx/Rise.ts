import gsap from "gsap/all";
import { Container, Sprite, Ticker } from "pixi.js";
import Star from './Star';

export default class Rise extends Container {
    private riseCont: Container;
    private stars: Star[] = [];
    
    constructor() {
        super();

        this.riseCont = new Container();
        const rise = Sprite.from('rais');
        rise.position.set(-rise.width / 2, -rise.height / 2);
        this.riseCont.addChild(rise);
        this.addChild(this.riseCont);

        const ticker = new Ticker();
        ticker.add(this.update.bind(this));
        ticker.start();

        const position = [-500, -500, -540, -540, -550, -550, -500, -500];
        for (let i = 0; i < 8; i += 2) {
            let star = new Star();
            star.x = position[i]
            star.y = -400 + i * 100;
            this.addChild(star);
            this.stars.push(star);

            star = new Star();
            star.x = Math.abs(position[i]);
            star.y = -400 + i * 100;
            this.addChild(star);
            this.stars.push(star);
        }
    }

    start() {
        this.stars.map((star: Star) => {
            star.alpha = 0;
        });
        this.riseCont.scale.set(0.1);
        gsap.to(this.riseCont.scale, 1, {x : 1, y: 1, onComplete: () => {
            this.stars.map((star: Star) => {
                gsap.to(star, 0.3, {alpha : 1});
            })
        }});
    }

    private update() {
        this.riseCont.rotation += 0.02;
    }
}