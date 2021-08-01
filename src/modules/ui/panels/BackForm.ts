import { Container, Sprite, Text } from "pixi.js";

export default class BackForm extends Container {
    
    private backTitle = Sprite.from('header_info_plate.png');
    private txt: Text;
    constructor(initTitle: string) {
        super();

        const back = Sprite.from('info_plate_big');
        this.addChild(back);
        
        this.backTitle.x = back.x + (back.width - this.backTitle.width) / 2;
        this.backTitle.y = 4;
        this.addChild(this.backTitle);

        this.txt = new Text( initTitle, {
            fontFamily: 'Arial',
            fontSize: 50,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#003D71'
        });
        this.addChild(this.txt);

        this.setTextPosition();
    }

    private setTextPosition() {
        this.txt.x = this.backTitle.x + (this.backTitle.width  - this.txt.width) / 2;
        this.txt.y = this.backTitle.y + (this.backTitle.height - this.txt.height) / 2;
    }

    set title(value: string) {
        this.txt.text = value;
        this.setTextPosition();
    }
}