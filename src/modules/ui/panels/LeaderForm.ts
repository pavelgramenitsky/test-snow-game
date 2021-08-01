import gsap from "gsap/all";
import { Container, Text } from "pixi.js";
import ButtonState from "../buttons/ButtonState";
import BackForm from "./BackForm";
import LeadLine from "./elements/LeadLine";

export default class LeaderForm extends Container {
    private titles = ['Все время', 'Месяц', 'Неделя'];
    private index = 0;
    private periodTxt: Text;
    private back: BackForm;
    private containerList: Container;
    private items = [];
    private isMobile: boolean;

    constructor() {
        super();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
		}
		const isIpad = navigator.userAgent.match(/iPad/i) != null;
		if (isIpad) this.isMobile = true;

		const iPadPro = this.isIpadPro();
		if (iPadPro) {
			this.isMobile = true;
		}


        this.back = new BackForm('Таблица рекордов:')
        this.addChild(this.back);

        const btnOk = new ButtonState(
            'ok_button_active.png',
            'ok_button_press.png',
            'ok_button_hover.png'
        );
        btnOk.x = (this.back.width - btnOk.width) / 2;
        btnOk.y = this.back.height - btnOk.height - (this.isMobile ? 20 : 40);
        btnOk.on('click', this.onOk.bind(this));
        this.addChild(btnOk);

        const arrowLeft = new ButtonState(
            'arrow_btn_active.png',
            'arrow_btn_press.png',
            'arrow_btn_hover.png'
        );

        arrowLeft.x = 80 + arrowLeft.width;
        arrowLeft.y = 110;
        arrowLeft.scale.x = -1;
        arrowLeft.name = 'left';
        arrowLeft.on('click', this.onClickLeft.bind(this));
        this.addChild(arrowLeft);

        const arrowRight = new ButtonState(
            'arrow_btn_active.png',
            'arrow_btn_press.png',
            'arrow_btn_hover.png'
        );

        arrowRight.x = this.back.width - arrowRight.width - 80;
        arrowRight.y = 110;
        arrowRight.on('click', this.onClickRight.bind(this));
        this.addChild(arrowRight);
        
        this.periodTxt = new Text(this.titles[this.index], {
            fontFamily: 'Arial',
            fontSize: 60,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#FF6801',
            align: 'center',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
        });
        this.periodTxt.y = arrowRight.y + arrowRight.height / 2 - this.periodTxt.height / 2;
        
        this.addChild(this.periodTxt);

        this.containerList = new Container();
        this.containerList.y = this.periodTxt.y + this.periodTxt.height;
        this.addChild(this.containerList);
        let py = 0;
        for (let i = 0; i < 10; i++) {
            const item = new LeadLine(i);
            item.x = i < 3 ? this.back.width / 2 - item.width / 2 : this.back.width / 2 - item.width / 2 + 10;
            if (i === 9) {
                item.x -= 10;
            }
            item.y = py;
            py += (item.height + 1); 
            this.containerList.addChild(item);
            this.items.push(item);
        }
    }

    show() {
        this.index = 0;
        this.generatePage();
    }

    private generatePage() {
        this.periodTxt.text = this.titles[this.index];
        this.periodTxt.x = this.back.width / 2 - this.periodTxt.width / 2;

        this.items.map((item: LeadLine, index: number) => {
            gsap.killTweensOf(item);
            item.alpha = 0;
            item.setValue(`Player ${index + 1}`, Math.floor(100 * (10 - index) + Math.random() * 90));
            gsap.to(item, 0.3, {alpha : 1, delay: index * 0.1});
        });
    }

    private onClickLeft() {
        this.index++;
        if (this.index >= this.titles.length) {
            this.index = 0
        }
        this.generatePage();
    }

    private onClickRight() {
        this.index--;
        if (this.index < 0) {
            this.index = this.titles.length - 1;
        }
        this.generatePage();
    }

    private onOk() {
        window.methods.forms.showPage('intro');
    }

    private isIpadPro(): boolean {
		var ratio = window.devicePixelRatio || 1;
		var screen = {
			width : window.screen.width * ratio,
			height : window.screen.height * ratio
		};
		return (screen.width === 2048 && screen.height === 2732) || (screen.width === 2732 && screen.height === 2048) || (screen.width === 1536 && screen.height === 2048) || (screen.width === 2048 && screen.height === 1536);
	}

}