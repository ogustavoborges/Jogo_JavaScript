import menuScene from './Scene/menuScene.js';
import gameJS from './game';
import finalGame from './Scene/finalGame.js';
import winScene from './Scene/winScene.js';

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 250,
  height: 130,
  zoom: 4,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [menuScene,gameJS,finalGame,winScene]
};

const game = new Phaser.Game(config);


//Nome: Gustavo Borges
// Comandos para rodar
//NPM install
//NPM install phaser
//NPM start
