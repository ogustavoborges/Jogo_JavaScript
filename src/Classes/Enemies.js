import Enemy from "./Enemy"
var vida = 100;
class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children, spriteArray) {
    super(world, scene, children, {})
    this.scene = scene

    this.createEnemies(scene, spriteArray)
  }

  createEnemies(scene, spriteArray) {

    spriteArray.forEach(sprite => {
      //create an enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y).setInteractive()
      //add it to the group
      this.add(enemy)
      //destroy the sprite
      sprite.destroy()
      enemy.on('pointerdown', () => {
        vida -= 20

        enemy.setTint(0xff0000)

        if (vida <= 0) {
          enemy.disableBody(true, true)
          vida = 100;
        }

      });

      enemy.on('pointerout', () => {
        enemy.clearTint();
      });

    })

  }

}

export default Enemies