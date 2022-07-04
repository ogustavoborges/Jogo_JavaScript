
import background from '../assets/menu/backgroundMenu.png'
import btnPlay from '../assets/menu/btnPlay.png'

export default class menuScene extends Phaser.Scene {
	constructor() {
		super({ key: 'MenuGame' })
	}

	preload() {
		this.load.image('background', background);
		this.load.image('play', btnPlay);

	}
	create() {

		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.add.image(screenCenterX, screenCenterY, 'background').setDisplaySize(300, 140)
		const helloButton = this.add.image(screenCenterX, screenCenterY, 'play').setScale(2, 2).setDisplaySize(80, 25)
		helloButton.setInteractive({ cursor: 'pointer' });


		helloButton.once('pointerdown', () => {
			this.scene.start('gameJS');
		});
	}
}

