import Phaser from "phaser"


enum Direction{
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export default class enemys extends Phaser.Physics.Arcade.Sprite{

    private direction = Direction.RIGHT

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string){
        super(scene, x, y, texture)
        

    }

    preUpdate(t: number, dt: number){
        super.preUpdate(t, dt)

        const speed = 100

        switch (this.direction){
            case Direction.UP:
                this.setVelocity(0, -speed)
                break
            
            case Direction.DOWN:
                this.setVelocity(0, speed)
                break
            
            case Direction.LEFT:
                this.setVelocity(-speed, 0)
                break
            
            case Direction.RIGHT:
                this.setVelocity(speed, 0)
                break
        }

    }
}
