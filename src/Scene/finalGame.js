
import background2 from '../assets/images/teste.gif'
import gameOver from '../assets/images/over.png'
export default class finalGame extends Phaser.Scene {
  constructor() {
    super('finalGame')
  }

  preload() {
    this.load.image('background2', background2);
    this.load.image('gameOver', gameOver);

  }

  create() {
    this.input.setDefaultCursor('auto');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.image(screenCenterX, screenCenterY, 'background2').setDisplaySize(320, 220)
    const finalButton = this.add.image(screenCenterX, screenCenterY, 'gameOver').setScale(2).setDisplaySize(90, 40)
    finalButton.setInteractive({ cursor: 'pointer' });

    finalButton.once('pointerdown', () => {
      this.scene.start('gameJS')
    });

   
  }

}