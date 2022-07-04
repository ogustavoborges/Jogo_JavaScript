class Chest extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y){

        super(scene,x,y,'chest', 0)
        this.scene = scene

        // habilitando as fisicas do mundo
        this.scene.physics.world.enable(this)

        this.scene.add.existing(this)

    }

}

export default Chest