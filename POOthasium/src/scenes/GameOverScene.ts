import { CST } from "../CST";
import { PlayScene } from "./PlayScene";
export class GameOverScene extends Phaser.Scene{    
    
    constructor(){
    super({
        key: CST.SCENES.GAMEOVER
    })

    }

    create(){
    this.add.image(400,300, 'gameover')
    .setScale(10)

    this.input.once('pointerdown', () => {
        this.scene.start(CST.SCENES.MENU, );
                
          }, this);

    }


}