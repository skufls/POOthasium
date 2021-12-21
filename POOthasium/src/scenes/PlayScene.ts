import { group } from "console";
import { ALL } from "dns";
import { World } from "matter";
import { Game, Scene } from "phaser";
import { start } from "repl";
import { CST } from "../CST";
import { enemys2 } from "./enemys2";
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
       this.enemy = enemy.get(300, 20, 'enemy')
       .setCircle(10)
       .setOffset(6);

       this.scan = this.physics.add.sprite(this.enemy.x -110, this.enemy.y -110, 'enemy')
       .setVisible(false)
       .setCircle(120)
       .setOffset(6);

       this.enemy2 = enemy.get(200, 300, 'enemy')
       .setCircle(10)
       .setOffset(6);

       this.scan2 = this.physics.add.sprite(this.enemy2.x -110, this.enemy2.y -110, 'enemy')
       .setVisible(false)
       .setCircle(120)
       .setOffset(6);


     

       this.physics.add.collider(enemy, this.blockslayer);
       this.physics.add.collider(enemy, this.player, this.handlePlayerEnemyCollision, undefined, this);
       this.enemy.setCollideWorldBounds(true);


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
        super(scene, x, y, 'poopE_projectile');    
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
        this.play('poopE_projectile');
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
        this.rotation = Phaser.Math.Angle.Between(this.scene.enemy.x, this.scene.enemy.y, this.scene.player.x, this.scene.player.y,);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.play('poopE_projectile');

    }

    Ethrow2(x: number, y: number, rotation: number, pointer:Phaser.Input.Pointer){
        this.play('poopE_projectile');
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setScale(0.1);
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 250);
        this.rotation = Phaser.Math.Angle.Between(this.scene.enemy2.x, this.scene.enemy2.y, this.scene.player.x, this.scene.player.y,);
        this.setBodySize(20,20);
        this.scene.sound.play("woesh");
        this.play('poopE_projectile');

    }

}

class poop extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: PlayScene, x: number,y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        super(scene, x, y, 'poop_projectile');    
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time, delta);    

        if (this.scene.physics.collide(this, this.scene.enemy)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            this.scene.enemy.setActive(false),
            this.scene.enemy.setVisible(false);
            
        }

        if (this.scene.physics.collide(this, this.scene.enemy2)){
            this.setVisible(false),
            this.setActive(false),
            this.scene.sound.play("splet2"),
            this.scene.enemy2.setActive(false),
            this.scene.enemy2.setVisible(false);
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
            key: "poopE_projectile"
            

        })
        
    }

    poopEthrow(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let Epoop = this.getFirstDead(false);
        if (Epoop) {
            Epoop.Ethrow(x, y, rotation, blockslayer),
            Epoop.preUpdate(x, y, rotation)

        }
    }

    poopEthrow2(x: number, y: number, rotation: number, blockslayer: Phaser.Tilemaps.TilemapLayer){
        let Epoop = this.getFirstDead(false);
        if (Epoop) {
            Epoop.Ethrow2(x, y, rotation, blockslayer),
            Epoop.preUpdate(x, y, rotation)

        }
    }

}

enum Direction {
    UP,
    DOWN,
    LEFT,
    LEFTDOWN,
    LEFTUP,
    RIGHT,
    RIGHTDOWN,
    RIGHTUP,
    FOLLOW
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
    enemythrow2: Phaser.Time.TimerEvent;
    

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
            delay: 500,
            callback: ()=>{
                this.scene.Epoopgroup.poopEthrow(this.scene.enemy.x, this.scene.enemy.y, this.scene.enemy.rotation, this.scene.blockslayer),
                this.enemythrow.paused = true;
        
            },
            loop: true,
            paused: true,

        })

        this.enemythrow2 = scene.time.addEvent({
            delay: 500,
            callback: ()=>{
                this.scene.Epoopgroup.poopEthrow2(this.scene.enemy2.x, this.scene.enemy2.y, this.scene.enemy2.rotation, this.scene.blockslayer);
                this.enemythrow2.paused = true
            },
            loop: true,
            paused: true,

        })


    }

    pause(){
        this.enemythrow.paused = true
    }


    destroy(fromScene?:boolean){
        this.moveEvent.destroy(),
        super.destroy(fromScene);
    }

    private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile){
        
        if (go !== this){
            return
        }

        this.direction = randomDirection(this.direction)

    }

    preUpdate(t: number, dt: number){
        

        this.scene.physics.moveTo(this.scene.scan, this.scene.enemy.x - 110, this.scene.enemy.y - 110,200)
        this.scene.physics.moveTo(this.scene.scan2, this.scene.enemy2.x - 110, this.scene.enemy2.y - 110,200)

        if (this.scene.physics.collide(this.scene.poopgroup, this.scene.enemy)){
            this.enemythrow.destroy()
        }

        if (this.scene.physics.collide(this.scene.poopgroup, this.scene.enemy2)){
            this.enemythrow2.destroy()
        }


        super.preUpdate(t, dt)
        
        let speed = 100

        if (this.scene.physics.overlap(this.scene.scan, this.scene.player) {
        this.enemythrow.paused = false,
        this.direction = 8;
        }

        if (this.scene.physics.overlap(this.scene.scan2, this.scene.player) {
        this.enemythrow2.paused = false,
        this.direction = 8;
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
            
            case Direction.FOLLOW:
                this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 100);
                this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y,)
                break
        }

    }


}

