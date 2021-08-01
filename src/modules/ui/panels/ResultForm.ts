import { Container, Sprite, Text } from "pixi.js";
import ButtonState from "../buttons/ButtonState";
import BackForm from "./BackForm";

export default class ResultForm extends Container {
    private back: BackForm;
    private score: Text;
    private coins: Text;
    private distance: Text;
    private flagIco: Sprite;
    private coinIco: Sprite;
    
    constructor() {
        super();

        this.back = new BackForm('Твои очки:');
        this.addChild(this.back);

        this.score = new Text('345', {
            fontFamily: 'Arial',
            fontSize: 140,
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

        this.addChild(this.score);

        this.coinIco = Sprite.from('collect_coin_icon.png');
        this.coinIco.x = this.back.x + 100;
        this.coinIco.y = 340;
        this.addChild(this.coinIco);

        this.coins = new Text('345', {
            fontFamily: 'Arial',
            fontSize: 80,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#F4AD25',
            align: 'center',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
        });

        this.addChild(this.coins);

        this.flagIco = Sprite.from('collect_distance_icon.png');
        this.flagIco.x = this.coinIco.x + (this.coinIco.width - this.flagIco.width) / 2;
        this.flagIco.y = this.coinIco.y + this.coinIco.height + 120;
        this.addChild(this.flagIco);

        this.distance = new Text('345 м', {
            fontFamily: 'Arial',
            fontSize: 90,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#9AC6FF',
            align: 'center',
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 4,
        });

       this.addChild(this.distance);

        const btnOk = new ButtonState(
            'ok_button_active.png',
            'ok_button_press.png',
            'ok_button_hover.png'
        );
        btnOk.x = (this.back.width - btnOk.width) / 2;
        btnOk.y = this.back.height - btnOk.height - 40;
        btnOk.on('click', this.onOk.bind(this));
        this.addChild(btnOk);

        this.setTextPosition();

    }

    private onOk() {
        window.methods.forms.showPage('leader');
    }

    private setTextPosition() {
        this.score.x = this.back.x + (this.back.width - this.score.width) / 2;
        this.score.y = this.back.y + 120;

        this.coins.y = this.coinIco.y + (this.coinIco.height - this.coins.height) / 2;
        this.coins.x = (this.back.width - this.coinIco.x - this.coinIco.width) / 2 + this.coinIco.x + this.coinIco.width - this.coins.width / 2 - 40;
        
        this.distance.x = (this.back.width - this.coinIco.x - this.coinIco.width) / 2 + this.coinIco.x + this.coinIco.width - this.distance.width / 2 - 40;
        this.distance.y = this.flagIco.y + (this.flagIco.height - this.distance.height) / 2;
        
    }

    setValues(score: number, coins: number, distance: number) {
        this.score.text = `${score}`;
        this.coins.text = `${coins}`;
        this.distance.text = `${distance}`;

        this.setTextPosition();
    }

    
}