import { Graphics, Point, Rectangle, Ticker } from 'pixi.js';
import config from '../../config';
import { gsapTimer } from '../../helpers';
import Floor from './elements/Floor';
import Men from './elements/Men';

export default class GameStage extends PIXI.Container {
    
    private men = new Men();
    private floor = new Floor();
    private ticker = new Ticker();
    private state = 'idle';

    constructor() {
        super();

        const back = new Graphics();
        back.beginFill(0xffffff, 0.01);
        back.drawRect(0, 0, config.WIDTH, config.HEIGHT);
        this.addChild(back);

        this.floor.y = 550;
        this.floor.rotation = 0.05;
        this.addChild(this.floor);

        this.men.position.set(42, 247);
        this.men.on('start.complete', () => {
            this.men.addPower(80);
            this.ticker.start();
            this.floor.start();
        });
        this.addChild(this.men);

        this.interactive = true;
        this.on('pointerdown', this.onStartGame.bind(this));
        this.ticker.add(this.update.bind(this));
    }

    reset() {
        this.interactive = true;
        this.men.position.set(42, 247);
        this.floor.reset();
        this.state = 'idle';
        this.men.rotation = 0;
    }

    private onStartGame() {
       switch (this.state) {
           case 'idle' : {
            this.state = 'start';
            this.men.start();
            break;
           }
           case 'start' : {
               this.men.addPower(40);
               break;
           }
           default : {
            this.state = 'start';
            break;
           }
       }
        
    }

    private update() {
        for (let i = 0; i < this.floor.barriers.length; i++) {
            const barrier = this.floor.barriers[i];
            const barrierPosition = new Point(this.toLocal(new Point(0, 0), barrier).x,
            this.toLocal(new PIXI.Point(0, 0), barrier).y);

            const rect0 = new Rectangle(
                barrierPosition.x, barrierPosition.y,
                this.floor.barriers[0].width, this.floor.barriers[0].height
            );
            
            const rect1 = new Rectangle(
                this.men.x - (this.men.width / 2 + 20),
                this.men.y - (this.men.height / 2 + 20),
                this.men.width / 2 + 20,
                this.men.height / 2 + 20
            );

            if (this.testForAABB(rect0, rect1)) {
                this.floor.stop();
                this.men.stop();
                barrier.rotation = -0.1;
                this.ticker.stop();
                this.interactive = false;
                gsapTimer({normal: 1, fast: 1}, () => {
                    window.methods.forms.showPage('result');
                });
            }
        }
    }

    private testForAABB(bounds1: Rectangle, bounds2: Rectangle) {
        return (bounds1.x) < bounds2.x + bounds2.width
          && (bounds1.x + bounds1.width) > bounds2.x
          && (bounds1.y) < bounds2.y + bounds2.height
          && bounds1.y + bounds1.height > bounds2.y;
    } 
}