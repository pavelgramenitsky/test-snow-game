import { Container, Sprite, Texture } from "pixi.js";

export default class ButtonState extends Container {
    private up: Texture;
    private down: Texture;
    private roll: Texture;
    private btn: Sprite;
    private isOutSide: boolean;

    constructor(up: string, down: string, roll: string) {
        super();

        this.up = Texture.from(up);
        this.down = Texture.from(down);
        this.roll = Texture.from(roll);

        this.btn = new Sprite();
        this.btn.texture = this.up;
        this.addChild(this.btn);

        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerup', this.onButton.bind(this))
            .on('pointerdown', this.onButton.bind(this))
            .on('pointerover', this.onButton.bind(this))
            .on('pointerout', this.onButton.bind(this));

        this.isOutSide = false;
    }

    private onButton(event: PIXI.interaction.InteractionEvent) {
        switch (event.type) {
            case 'pointerover' : {
                this.btn.texture = this.roll;
                break;
            }
            case 'pointerout' : {
                this.btn.texture = this.up;
                this.isOutSide = true;
                break;
            }
            case 'pointerdown' : {
                this.btn.texture = this.down;
                this.isOutSide = false;
                break;
            }
            case 'pointerup' : {
                this.btn.texture = this.up;
                if (!this.isOutSide) {
                    this.emit('click');
                }
                break;
            }
        }
    }
}