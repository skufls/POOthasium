import { time } from "console";
import { ALL } from "dns";
import { LEFT } from "phaser";
import { CST } from "../CST";
import { MenuScene } from "./MenuScene";
export class LoadScene extends Phaser.Scene{    
    
    constructor(){
    super({
        key: CST.SCENES.LOAD
    })
}
init(){

}

loadImages() {
    this.load.setPath("./assets/image");

    for (let prop in CST.IMAGE) {
        //@ts-ignore
        this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
    }
}

preload(){

    this.load.image("tiles", "./assets/maps/tile_sheet.png");
    this.load.tilemapTiledJSON('lvl1', "./assets/maps/lvl1.json")

    this.load.audio("splet", "./assets/sound/splet.mp3");
    this.load.audio("splet2", "./assets/sound/splet2.mp3");
    this.load.audio("woesh", "./assets/sound/woesh.mp3");

    this.load.image("logo", "./assets/logo.png");

    this.load.image("gameover", "./assets/gameover.png");

    this.load.image("play", "./assets/play.png");

    this.load.spritesheet("monkey_hand", "./assets/monkey_hand.png",{
        frameWidth: 32,
        frameHeight: 32
    });

    this.load.spritesheet("monkey_head", "./assets/monkey_head.png",{
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.image("enemy", "./assets/enemy.png");

    this.load.image("options", "./assets/options.png");


    this.load.spritesheet("poop_projectile", "./assets/poop_projectile.png", {
        frameWidth: 232,
        frameHeight: 232
    });
    this.load.spritesheet("poopE_projectile", "./assets/poopE_projectile.png", {
        frameWidth: 232,
        frameHeight: 232
    });
    
    this.load.spritesheet("poop_load", "./assets/poop_load.png", {
        frameWidth: 512,
        frameHeight: 512
    });

    this.load.spritesheet("poop_select", "./assets/poop_select.png", {
        frameWidth: 512,
        frameHeight: 512
    });

    this.load.image("load1", "./assets/load/load1.png");
    this.load.image("load2", "./assets/load/load2.png");
    this.load.image("load3", "./assets/load/load3.png");
    this.load.image("load4", "./assets/load/load4.png");
    this.load.image("load5", "./assets/load/load5.png");
    this.load.image("load6", "./assets/load/load6.png");
    this.load.image("load7", "./assets/load/load7.png");
    this.load.image("load8", "./assets/load/load8.png");
    this.load.image("load9", "./assets/load/load9.png");
    this.load.image("load10", "./assets/load/load10.png");
    
}

create(){
    this.anims.create({
        key: "poop_load",
        frames: this.anims.generateFrameNumbers ("poop_load", {}),
        frameRate: 15,
        repeat: 0
    
    })

    this.anims.create({
        key: "poop_projectile",
        frames: this.anims.generateFrameNumbers ("poop_projectile",{frames:
             [0,1,2,3,4]}),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: "poopE_projectile",
        frames: this.anims.generateFrameNumbers ("poopE_projectile",{frames:
             [0,1,2,3,4]}),
        frameRate: 10,
        repeat: -1
    })
    
    this.anims.create({
        key: "monkey_head",
        frames: this.anims.generateFrameNumbers ("monkey_head", {start: 1, end: 12}),
        frameRate: 30,
        repeat: 0,
        hideOnComplete: false,
        showOnStart: true,
    
    })


    this.anims.create({
        key: 'load',
        frames: [
            { key: 'load1' },        
            { key: 'load2' },
            { key: 'load3' },
            { key: 'load4' },
            { key: 'load5' },
            { key: 'load6' },
            { key: 'load7' },
            { key: 'load8' },
            { key: 'load9' },
            { key: 'load10', duration: 100 }
        ],
        frameRate: 2,
        repeat: 0
    });
   
    this.add.sprite(250, 600, 'poop_load')
    .play('poop_load')
    .setDepth(2)
    this.add.sprite(300, 600, 'poop_load')
    .playAfterDelay('poop_load', 500)
    .setDepth(2)
    this.add.sprite(350, 600, 'poop_load')
    .playAfterDelay('poop_load', 1000)
    .setDepth(2)
    this.add.sprite(400, 600, 'poop_load')
    .playAfterDelay('poop_load', 1500)
    .setDepth(2)
    this.add.sprite(450, 600, 'poop_load')
    .playAfterDelay('poop_load', 2000)
    .setDepth(2)
    this.add.sprite(500, 600, 'poop_load')
    .playAfterDelay('poop_load', 2500)
    .setDepth(2)
    this.add.sprite(550, 600, 'poop_load')
    .playAfterDelay('poop_load', 3000)
    .setDepth(2)
    this.add.sprite(600, 600, 'poop_load')
    .playAfterDelay('poop_load', 3500)
    .setDepth(2)
    this.add.sprite(650, 600, 'poop_load')
    .playAfterDelay('poop_load', 4000)
    .setDepth(2)
    this.add.sprite(400, 300, 'load1')
   .play('load')
   .setDepth(1)
    
    this.input.once('pointerdown', () => {
    this.scene.start(CST.SCENES.MENU, );
            
      }, this);
  
    setTimeout(() => this.scene.start(CST.SCENES.MENU), 5500);

    
}}

