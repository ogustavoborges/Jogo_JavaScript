import Chest from "./Chest"

class Chests extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children, spriteArray){
        super(world, scene, children, {})
        this.scene = scene

        this.createChests(scene, spriteArray)
    }

createChests(scene, spriteArray) {

    spriteArray.forEach(sprite => {
      //create an enemy
      const chest = new Chest(scene, sprite.x, sprite.y)
      //add it to the group
      this.add(chest)
      //destroy the sprite
      sprite.destroy()
    })
  }
    
}

export default Chests