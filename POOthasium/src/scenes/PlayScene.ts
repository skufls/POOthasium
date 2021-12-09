import { ALL } from "dns";
import { World } from "matter";
import { Game, Scene } from "phaser";
import { start } from "repl";
import { CST } from "../CST";
import Monkey from "../enemys/Monkey";
import { GameOverScene } from "./GameOverScene";
export class PlayScene extends Phaser.Scene{

   constructor(){
        super({
            key: CST.SCENES.PLAY
        });
        this.poopgroup,
        this.poop
        this.Epoop
        this.Epoopgroup
        this.enemy
    }

    [x: string]: object;
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private monkeyhead!: Phaser.GameObjects.Sprite
    player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    poop!: Phaser.Types.Physics.Arcade.PhysicsGroupConfig;
    blockslayer!: Phaser.Tilemaps.TilemapLayer
    enemy!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    scan!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    moveEvent!: Phaser.Time.TimerEvent;

  

    preload(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }


    create(){

       //tilemap
       const map = this.make.tilemap({ key: 'lvl1'});
       const tileset = map.addTilesetImage('poop_sheet', 'tiles');

       map.createLayer('background', tileset);
       this.blockslayer = map.createLayer('blocked', tileset);
       this.blockslayer.setCollisionBetween(1, 7, true);
       this.physics.world.bounds.width = 800
       this.physics.world.bounds.height = 800
       
       //player
       this.player = this.physics.add.sprite(400, 300,'monkey_head')
       .setCircle(10)
       .setOffset(6);
       this.player.setDepth(2);  
       this.physics.add.existing(this.player, true);
       this.player.setCollideWorldBounds(true);
       this.physics.add.collider(this.player, this.blockslayer);
       this.cameras.main.startFollow(this.player, false);
       this.cameras.main.zoom = 2;
       this.cameras.main.setBounds(0, 0, 800, 800);
       this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
       this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);}, this);

       //enemys
       const enemy = this.physics.add.group({ classType: enemys, createCallback: (go)=> {
           const enmGo = go as enemys
           enmGo.body.onCollide = true
       }})
       this.enemy = enemy.get(200, 250, 'enemy')
       .setCircle(10)
       .setOffset(6);

       this.physics.add.collider(enemy, this.blockslayer);
       this.physics.add.collider(enemy, this.player, this.handlePlayerEnemyCollision, undefined, this);
       this.enemy.setCollideWorldBounds(true);

    //scan
       this.scan = this.physics.add.sprite(this.enemy.x -110, this.enemy.y -110, 'enemy')
       .setVisible(false)
       .setCircle(120)
       .setOffset(6);

       //projectile
       this.poopgroup = new poopgroup(this);
       this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
       this.poopgroup.poopthrow(this.player.x, this.player.y, this.player.rotation, this.blockslayer);
        });

        this.Epoopgroup = new Epoopgroup(this);





       
       //keybinds
       this.cursors=this.input.keyboard.createCursorKeys()
       this.inputKeys = this.input.keyboard.addKeys({
           up: Phaser.Input.Keyboard.KeyCodes.W,
           down:  Phaser.Input.Keyboard.KeyCodes.S,
           left: Phaser.Input.Keyboard.KeyCodes.A,
           right: Phaser.Input.Keyboard.KeyCodes.D,
       })
             
    }
    
    private handlePlayerEnemyCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {

  

    }

    update(){

        
        //fireanim
        this.input.once('pointerdown', () => {
            this.player.play("monkey_head");
        },this);

        //scan
        this.physics.moveTo(this.scan, this.enemy.x - 110, this.enemy.y - 110,200)
        if (this.physics.overlap(this.scan, this.player))
        this.enemy.rotation = Phaser.Math.Angle.Between(this.enemy.x, this.enemy.y, this.player.x, this.player.y,)

        //move
        const speed = 150
        
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        } 

        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        } 
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x,playerVelocity.y)
        
        
    

    }
}

//classes


class Epoop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: PlayScene, x:number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'poop_projectile');    
    }
    preUpdate(time: number, delta: number){

        if (this.scene.physics.collide(this, this.scene.player)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            this.scene.scene.start(CST.SCENES.GAMEOVER)
        }


        if (this.scene.physics.collide(this, this.scene.blockslayer)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2");
        }
        

    }
    Ethrow(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
    
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.play('poop_projectile');
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
        this.rotation = Phaser.Math.Angle.Between(this.scene.enemy.x, this.scene.enemy.y, this.scene.player.x, this.scene.player.y,);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.setCollideWorldBounds(true);

    }

}

class poop extends Phaser.Physics.Arcade.Sprite {
    enemys: any;

    constructor(scene: PlayScene, x: number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'poop_projectile');    
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);    

        if (this.scene.physics.collide(this, this.scene.enemy)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            this.scene.enemy.destroy();
            }
   
        
        if (this.scene.physics.collide(this, this.scene.blockslayer)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2");
        }
    }
    fling(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
    
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.play('poop_projectile');
        this.scene.physics.moveTo(this, this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY, 250);
        this.setRotation(rotation);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.setCollideWorldBounds(true);

    }

}

class poopgroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: PlayScene){
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 50,
            classType: poop,
            active: false,
            visible: false,
            key: "poop_projectile"
            

        })
        
    }

    poopthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let poop = this.getFirstDead(false);
        if (poop) {
            poop.fling(x, y, rotation, blockslayer)
            poop.preUpdate(x, y, rotation)
        }
    }
}

class Epoopgroup extends Phaser.Physics.Arcade.Group{
    constructor(scene: PlayScene){
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 50,
            classType: Epoop,
            active: false,
            visible: false,
            key: "poop_projectile"
            

        })
        
    }

    poopthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let poop = this.getFirstDead(false);
        if (poop) {
            poop.fling(x, y, rotation, blockslayer)
            poop.preUpdate(x, y, rotation)
        }
    }

    poopEthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let Epoop = this.getFirstDead(false);
        if (Epoop) {
            Epoop.Ethrow(x, y, rotation, blockslayer),
            Epoop.preUpdate(x, y, rotation)

        }
    }

}

enum Direction{
    UP,
    DOWN,
    LEFT,
    LEFTDOWN,
    LEFTUP,
    RIGHT,
    RIGHTDOWN,
    RIGHTUP,
    STOP
}

const randomDirection = (exclude: Direction) => {
    let newDirection = Phaser.Math.Between(0, 7)
   
    while (newDirection === exclude){
        newDirection = Phaser.Math.Between(0, 7)
    }

    return newDirection
}

class enemys extends Phaser.Physics.Arcade.Sprite{

    private direction = Direction.RIGHT
    moveEvent: Phaser.Time.TimerEvent;
    enemythrow: Phaser.Time.TimerEvent;
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)


        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,this.handleTileCollision, this)


        

        this.moveEvent = scene.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.direction = randomDirection(this.direction)
            },
            loop: true,
        })


        this.enemythrow = scene.time.addEvent({
            delay: 600,
            callback: ()=>{
                this.scene.Epoopgroup.poopEthrow(this.scene.enemy.x, this.scene.enemy.y, this.scene.enemy.rotation, this.scene.blockslayer);
                this.enemythrow.paused = true
            },
            loop: true,
            paused: true

        })

    }

  

    destroy(fromScene?:boolean){
        this.moveEvent.destroy(),
        this.enemythrow.destroy(),
        super.destroy(fromScene);
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile){
        
        if (go !== this){
            return
        }

        this.direction = randomDirection(this.direction)

    }

    preUpdate(t: number, dt: number){



        super.preUpdate(t, dt)
        
        let speed = 100

        if (this.scene.physics.overlap(this.scene.scan, this.scene.player) {
        //speed = 0,
        this.enemythrow.paused = false
        }
        

        switch (this.direction){
            case Direction.UP:
                this.setVelocity(0, -speed)
                this.setAngle(-90)
                break
            
            case Direction.DOWN:
                this.setVelocity(0, speed)
                this.setAngle(90)
                break
            
            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                this.setAngle(180)
                break

            case Direction.LEFTDOWN:
                this.setVelocity(-speed, speed)
                this.setAngle(135)
                break
                
            case Direction.LEFTUP:
                this.setVelocity(-speed, -speed)
                this.setAngle(-135)
                break
            
            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                this.setAngle(0)
                break
            
            case Direction.RIGHTDOWN:
                this.setVelocity(speed, speed)
                this.setAngle(45)
                break
            
            case Direction.RIGHTUP:
                this.setVelocity(speed, -speed)
                this.setAngle(-45)
                break
        }

    }


}

