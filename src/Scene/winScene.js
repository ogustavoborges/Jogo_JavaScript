import background from '../assets/menu/backgroundMenu.png'
import win from '../assets/images/win.png'
export default class winScene extends Phaser.Scene {
  constructor() {
    super('winScene')
  }

  preload() {
    this.load.image('background2', background);
    this.load.image('win', win);

  }

  create() {
    let pointer = this.input.setDefaultCursor('auto');
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		this.add.image(screenCenterX, screenCenterY, 'background').setDisplaySize(300, 140)
        const finalButton = this.add.image(screenCenterX, screenCenterY, 'win').setScale(2).setDisplaySize(150, 90)
        finalButton.setInteractive({ cursor: 'pointer' });
    
        finalButton.once('pointerdown', () => {

          this.scene.start('gameJS')
         
        });
  }

}