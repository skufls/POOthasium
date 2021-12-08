import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    
    create(){
    
    this.anims.create({
        key: "poop_select",
        frames: this.anims.generateFrameNumbers("poop_select", {}),
        frameRate: 20,
        repeat: 0
        })
    
    this.add.image(400, 150, "logo")
    .setScale(2);

    let playButton = this.add.image(400, 300, 'play');


    let optionsButton = this.add.image(400, 400, 'options');


    this.input.on('pointerdown',  (pointer: { x: number; y: number; }) => {
        this.add.sprite(pointer.x + 30, pointer.y + 240, 'poop_select')
        .play('poop_select');
        this.sound.play("splet");
            
    }, this);

    playButton.setInteractive();

    playButton.on("pointerup", ()=>{
        console.log("weeeee")
        setTimeout(() => this.scene.start(CST.SCENES.PLAY), 1500)
        },
   

    optionsButton.setInteractive())

    optionsButton.on("pointerup", ()=>{
        console.log("woooo")
    });
    }

}