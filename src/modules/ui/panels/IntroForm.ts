import { Container, Sprite, Text } from "pixi.js";
import ButtonState from "../buttons/ButtonState";
import BackForm from "./BackForm";

export default class IntroForm extends Container{
    
    private scoreTxt: Text;
    private back: BackForm;
    private txtName: Text;
    
    constructor() {
        super();

        this.back = new BackForm('Твои рекорды:');
        this.addChild(this.back);
        
        this.scoreTxt = new Text('Рекорд:\n455', {
            fontFamily: 'Arial',
            fontSize: 60,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#00FD17',
            align: 'center',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
        });

        this.addChild(this.scoreTxt);
        this.setTextPosition();

        const btnLead = new ButtonState(
            'leadboard_button_active.png',
            'leadboard_button_press.png',
            'leadboard_button_hover.png'
        );
        btnLead.on('click', this.onBtnLead.bind(this));
        btnLead.y = this.back.y + this.back.height - btnLead.height - 60;
        btnLead.x = this.back.x + 40;
        this.addChild(btnLead);

        const btnPlay = new ButtonState(
            'play_button_active.png',
            'play_button_press.png',
            'play_button_hover.png'
        );

        btnPlay.on('click', this.onBtnPlay.bind(this));
        btnPlay.y = btnLead.y;
        btnPlay.x = this.back.x + this.back.width - btnPlay.width - 40;
        this.addChild(btnPlay);

        const nameBack = Sprite.from('user_name_bar.png');
        nameBack.x = this.back.x + (this.back.width - nameBack.width) / 2;
        nameBack.y = this.back.y + (this.back.height - nameBack.height) / 2;
        this.addChild(nameBack);

        this.txtName = new Text('Guest 123', {
            fontFamily: 'Arial',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        this.txtName.x = nameBack.x + 20;
        this.txtName.y = nameBack.y + (nameBack.height - this.txtName.height) / 2;
        this.addChild(this.txtName);

        const e = new Text('кнопри MI в ассетах не нашел', {
            fontFamily: 'Arial',
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#ff0000'
        });
        e.x = this.back.x + this.back.width / 2 - e.width / 2;
        e.y = nameBack.y - 50;
        this.addChild(e);
    }

    private onBtnLead() {
        window.methods.forms.showPage('leader');
    }

    private onBtnPlay() {
        window.methods.gameStage.reset();
        window.methods.forms.hide();
    }

    private setTextPosition() {
        this.scoreTxt.x = this.back.x + (this.back.width - this.scoreTxt.width) / 2;
        this.scoreTxt.y = 120;
    }

    set score(value: number) {
        this.scoreTxt.text = `Рукорд:\n${value}`;
        this.setTextPosition();
    }

}