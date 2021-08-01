import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import { gsapTimer } from "../../../helpers";

export default class Floor extends Container {
    private floors = [];
    private stoppers = [];
    private ticker = new Ticker();
    private speed = 20;
    private slide = Sprite.from('slide_img');
    
    constructor() {
        super();

        this.addChild(this.slide);

        for (let i = 0; i < 3; i++) {
            const f = PIXI.Sprite.from('floor_img');
            f.x = i * f.width;
            this.addChild(f);
            this.floors.push(f);
        }

        this.ticker.add(this.update.bind(this));

        this.reset();
    }

    reset() {
        for (let i = 0; i < this.stoppers.length; i++) {
            this.removeChild(this.stoppers[i]);
            this.stoppers[i].destroy();
        }
        this.stoppers = [];

        this.slide.y = -250;
        this.slide.x = -30;
        this.slide.visible = true;
    }

    start() {
        this.ticker.start();
        gsapTimer({fast : 1, normal: 4 + Math.random()  * 2}, () => {
            this.addStopper();
        });
    }

    stop() {
        this.ticker.stop();
        
    }

    private addStopper() {
        if (this.ticker.started) {
            const stopper = Sprite.from('stopper_idle.png');
            stopper.scale.set(0.5);
            stopper.y = -stopper.height + 10;
            stopper.x = this.floors[0].width;
            this.addChildAt(stopper, 0);
            this.stoppers.push(stopper);

            gsapTimer({fast : 1, normal: 2 + Math.random()  * 2}, () => {
                this.addStopper();
            });
        }
    }

    private update() {
        this.floors.map( (floor) => {
            floor.x -= this.speed;
        });
        this.floors.map( (floor) => {
            if (floor.x + floor.width < 0) {
                floor.x = this.floors[this.floors.length - 1].x + this.floors[this.floors.length - 1].width;
                this.floors.shift();
                this.floors.push(floor);
            }
        });

        this.stoppers.map( (stopper) => {
            stopper.x -= this.speed;
            if (stopper.x + stopper.width < 0) {
                this.removeChild(stopper);
                this.stoppers.shift();
                stopper.destroy();
            }
        });

        if (this.slide.visible) {
            this.slide.x -= this.speed;
            if (this.slide.x + this.slide.width < 0) {
                this.slide.visible = false;
            }
        }
    }

    get barriers() {
        return this.stoppers;
    }
}