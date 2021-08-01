import { Container, Sprite, Text } from "pixi.js";

export default class LeadLine extends Container {
    private colors = ['#C16001', '#205CAF', '#8A1A00', '#000000'];
    private textName: Text;
    private textResult: Text;
    private backResult: Sprite;

    constructor (id: number){
        super();

        if (id < 3) {
            const backLine = Sprite.from(`place_${id + 1}.png`);
            this.addChild(backLine);

            this.textName = new Text('123', {
                fontFamily: 'Arial',
                fontSize: 40,
                fontWeight: 'bold',
                fill: this.colors[id]
           });

           this.textName.x = backLine.x + 80;
           this.textName.y = backLine.y + backLine.height / 2 - this.textName.height / 2;
           this.addChild(this.textName);

           this.backResult = Sprite.from('highleader_scores_plate.png');
           this.backResult.x = backLine.x + backLine.width + 10;
           this.backResult.y = backLine.y + backLine.height / 2 - this.backResult.height / 2;
           this.addChild(this.backResult);

           this.textResult = new Text('123', {
                fontFamily: 'Arial',
                fontSize: 40,
                fontWeight: 'bold',
                fill: this.colors[id],
                align: 'center'
           });

           
           this.textResult.x = this.backResult.x + this.backResult.width / 2 - this.textResult.width / 2;
           this.textResult.y = this.backResult.y + this.backResult.height / 2 - this.textResult.height / 2;
           this.addChild(this.textResult);
        } else {
            const textId = new Text(`${id + 1}`, {
                fontFamily: 'Arial',
                fontSize: 38,
                fontWeight: 'bold',
                fill: '#ffffff',
            });
            this.addChild(textId);

            const backLine = Sprite.from('midleader_name_plate.png');
            backLine.x = textId.x + textId.width + 10;
            backLine.y = textId.y + textId.height / 2 - backLine.height / 2;
            this.addChild(backLine);

            this.textName = new Text('123', {
                fontFamily: 'Arial',
                fontSize: 32,
                fontWeight: 'bold',
                fill: this.colors[3]
           });
           this.textName.x = backLine.x + 20;
           this.textName.y = backLine.y + backLine.height / 2 - this.textName.height / 2;
           this.addChild(this.textName);

           this.backResult = Sprite.from('midleader_scores_plate.png');
           this.backResult.x = backLine.x + backLine.width + 30;
           this.backResult.y = backLine.y + backLine.height / 2 - this.backResult.height / 2;
           this.addChild(this.backResult);

           this.textResult = new Text('123', {
                fontFamily: 'Arial',
                fontSize: 40,
                fontWeight: 'bold',
                fill: this.colors[3],
                align: 'center'
           });

           
           this.textResult.x = this.backResult.x + this.backResult.width / 2 - this.textResult.width / 2;
           this.textResult.y = this.backResult.y + this.backResult.height / 2 - this.textResult.height / 2;
           this.addChild(this.textResult);
        }
    }

    setValue(playerName: string, result: number) {
        this.textName.text = playerName;
        this.textResult.text = `${result}`;
        this.textResult.x = this.backResult.x + this.backResult.width / 2 - this.textResult.width / 2;
    }
}