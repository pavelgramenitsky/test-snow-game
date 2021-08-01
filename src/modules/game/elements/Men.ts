import { Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { gsap, PixiPlugin, MotionPathPlugin, Power2 } from "gsap/all";
export default class Men extends Container {
    private men: Sprite;
    private power = 0;
    private ticker = new Ticker();
    private downPosition = 510;
    private inc = 0;

    constructor() {
        super();

        gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

        this.ticker.add(this.update.bind(this));
        this.men = Sprite.from('men.png');
        this.men.scale.set(0.5);
        this.men.anchor.set(0.5);
        this.addChild(this.men);
    }

    start() {
        this.men.name = 'normal';
        gsap.to(this, 1.5, {
            motionPath: {
                path: 'M42,247l28,3c12.9,6.8,21.2,14.2,26,19c26.1,26.2,22.2,51.1,58,106c1.7,2.5,2.8,4.3,4,6 c29.3,43.3,52.6,77.6,91,98c40.3,21.4,88.2,22.7,108,14c2.3-1,15.4-7.1,34-14c7.3-2.7,13.3-4.8,17-6',
                autoRotate: true,
                useRadians: true,
                type: 'cubic',
            },
            ease: Power2.easeIn,
            onComplete: () => { 
                this.rotation = 0;
                this.emit('start.complete');
                this.ticker.start();
            }
        });
    }

    addPower(value: number) {
        if (this.power === 0 && this.men.name !== 'fly') {
            this.power = value;
            this.men.texture = Texture.from('men_fly.png');
            this.men.name = 'fly';
            this.inc = 0;
        }
    }

    stop() {
        this.ticker.stop();
        this.rotation = 0.4;
        this.power = 0;
        this.y = this.downPosition;
        this.men.name = 'normal';
        this.men.texture = Texture.from('men.png');
    }

    private update() {
        if (this.power > 0) {
            this.power--;
            this.y -= 4;
        } else if (this.y < this.downPosition) {
            if (this.inc < 4) {
                this.inc += 0.05;
            }
            this.y += this.inc;
        }

        if (this.y >= this.downPosition) {
            this.y = this.downPosition;
            if (this.men.name === 'fly') {
                this.men.name = 'normal';
                this.men.texture = Texture.from('men.png');
            }
        }
        
    }
}