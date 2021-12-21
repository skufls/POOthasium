import Phaser from "phaser";

export class enemys2 extends Phaser.Physics.Arcade.Sprite{

    private direction = Direction.RIGHT
    moveEvent: Phaser.Time.TimerEvent;
    enemythrow: Phaser.Time.TimerEvent;
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)


        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,this.handleTileCollision, this)

        this.scene.scan = this.scene.physics.add.sprite(this.x -110, this.y -110, 'enemy')
        .setVisible(false)
        .setCircle(120)
        .setOffset(6);


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
                this.scene.Epoopgroup.poopEthrow(this.scene.enemy.x, this.scene.enemy.y, this.scene.enemy.rotation, this.scene.blockslayer);
                this.enemythrow.paused = true
            },
            loop: true,
            paused: true,

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

        this.scene.physics.moveTo(this.scene.scan, this.x - 110, this.y - 110,200)
        



        super.preUpdate(t, dt)
        
        let speed = 100

        if (this.scene.physics.overlap(this.scene.scan, this.scene.player) {
        this.enemythrow.paused = false,
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