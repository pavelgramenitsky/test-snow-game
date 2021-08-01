import gsap from "gsap/all";
import { Container, Graphics } from "pixi.js";
import config from "../../config";
import Rise from "./fx/Rise";
import IntroForm from "./panels/IntroForm";
import LeaderForm from "./panels/LeaderForm";
import ResultForm from "./panels/ResultForm";

export default class Forms extends Container {
    
    private back: Graphics;
    private forms = [];
    private rise = new Rise();
    private intro = new IntroForm();
    private result = new ResultForm();
    private leader = new LeaderForm();

    constructor() {
        super();

        this.back = new Graphics();
        this.back.beginFill(0x000000, 0.3);
        this.back.drawRect(0, 0, config.WIDTH, config.HEIGHT);
        this.back.interactive = true;
        this.addChild(this.back);

        this.rise.scale.set(0.7);
        this.rise.x = config.WIDTH / 2;
        this.rise.y = config.HEIGHT / 2;
        this.rise.visible = false;
        this.addChild(this.rise);

        this.intro.name = 'intro';
        this.forms.push(this.intro);
        
        this.result.name = 'result';
        this.forms.push(this.result);

        this.leader.name = 'leader';
        this.forms.push(this.leader);

        for (let i = 0; i < this.forms.length; i++) {
            this.forms[i].scale.set(0.7);
            this.forms[i].visible = i === 0;
            this.forms[i].x = (config.WIDTH - this.forms[i].width) / 2;
            this.forms[i].y = (config.HEIGHT - this.forms[i].height) / 2;
            this.addChild(this.forms[i]);
        }

    }

    showPage(pageName: string) {
        this.visible = true;
        for (let i = 0; i < this.forms.length; i++) {
            this.forms[i].visible = this.forms[i].name === pageName;
        }
        
        if (pageName === 'leader') {
            this.leader.show();
        }

        this.rise.visible = pageName === 'result';
        if (pageName === 'result') {
            this.back.alpha = 0.01;
            gsap.to(this.back, 0.5, {alpha : 1});
            this.result.y = -this.result.height;
            this.rise.visible = false;
            gsap.to(this.result, 0.5, {y: (config.HEIGHT - this.result.height) / 2, onComplete: () => {
                this.rise.visible = true;
                this.rise.start();
            }});
        }
    }

    hide() {
        this.visible = false;
    }
}