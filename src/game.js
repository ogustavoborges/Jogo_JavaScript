import Phaser from 'phaser';
import mapPNG from './assets/images/spritesheet.png';
import mapJSON from './assets/map/map.json';
import map2JSON from './assets/map/map2.json';
import chestPNG from './assets/images/chest.png';
import playerPNG from './assets/images/player1.png';
import Chests from './Classes/Chests';
import Enemies from './Classes/Enemies';
import enemyPNG from './assets/images/enemy.png';
import spawnPNG from './assets/images/spawn.png';

let fase = 0;
let keys;
let score = 0;
let health = 100;
let healthText = document.getElementById("health")
let scoreText = document.getElementById("score")

export default class gameJS extends Phaser.Scene {
  constructor() {
    super('gameJS')
   
  }

  preload() {
    this.load.image('tiles', mapPNG);
    this.load.image('chest', chestPNG);
    this.load.image('sand', spawnPNG);
    this.load.spritesheet('enemy', enemyPNG, { frameWidth: 32, frameHeight: 32 });

      this.load.tilemapTiledJSON('map', mapJSON);
 
      this.load.tilemapTiledJSON('map2', map2JSON);
 
    this.load.spritesheet('player', playerPNG, { frameWidth: 16, frameHeight: 16 });
  }


  create() {

    // Cria o mapa
    let pointer = this.input.setDefaultCursor('url(../src/assets/images/sword.cur), pointer');
    var map;
    if(fase == 0){
        map = this.make.tilemap({ key: 'map' });
    }else{
        map = this.make.tilemap({ key: 'map2' });
    }
    
  
    // o primeiro parâmetro é o nome do tilemap em tile
    let tiles = map.addTilesetImage('spritesheet', 'tiles');
    let sand = map.addTilesetImage('chao', 'sand')
    //Cria as layer
    let grass = map.createLayer('Grass', tiles, 0, 0);
    let grassSpawn = map.createLayer('Spawn', sand, 0, 0);
    let obstacles = map.createLayer('Obstacles', tiles, 0, 0);

    //Spawn player
    const spawnPoint = map.findObject('player', objects => objects.name === 'spawning point')

    obstacles.setCollisionByExclusion([-1]);

    //Cria score e HEALTH
    scoreText.innerHTML = "SCORE: " + score;
    healthText.innerHTML = "HP: " + health;

    //Animações
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 10, 4, 16] }),
      frameRate: 10,
      repeat: -1
    });

    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 10, 4, 16] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [5, 11, 5, 17] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [3, 9, 3, 15] }),
      frameRate: 10,
      repeat: -1
    });


    //Cria player
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player', 3)

    //Cria baus
    this.chests = map.createFromObjects("chest", "chest", {});
    this.chestsGroup = new Chests(this.physics.world, this, [], this.chests);

    //Cria inimigos
    this.enemy = map.createFromObjects("inimigo", "enemy", {});
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemy);


    // Não sair do mapa
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);


    // Colisões
    this.physics.add.collider(this.player, obstacles);
    this.physics.add.overlap(this.player, this.chestsGroup, collectChest, null, this);
    this.physics.add.collider(this.enemiesGroup, obstacles)
    this.physics.add.collider(this.enemiesGroup)
    this.physics.add.collider(this.enemiesGroup, this.player, onMeetEnemy, null, this);


    // limita a câmera ao mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile blee

    //Criar teclas de movimentação além das setas
    keys = this.input.keyboard.addKeys("W,A,S,D");

  }



  update() {

    this.player.body.setVelocity(0);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Horizontal movement
    if (this.cursors.left.isDown || keys.A.isDown) {
      this.player.body.setVelocityX(-55);
    }
    else if (this.cursors.right.isDown || keys.D.isDown) {
      this.player.body.setVelocityX(55);
    }

    // Vertical movement
    if (this.cursors.up.isDown || keys.W.isDown) {
      this.player.body.setVelocityY(-55);
    }
    else if (this.cursors.down.isDown || keys.S.isDown) {
      this.player.body.setVelocityY(55);
    }

    if (this.cursors.left.isDown || keys.A.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;

    }
    else if (this.cursors.right.isDown || keys.D.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;

    }
    else if (this.cursors.up.isDown || keys.W.isDown) {
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown || keys.S.isDown) {
      this.player.anims.play('down', true);
    }
    else {
      this.player.anims.stop();
    }
  }

}


function collectChest(player, chestsGroup) {

  score += 5;
  chestsGroup.disableBody(true, true);
  if (score <= 95) {
    scoreText.innerHTML = 'SCORE: ' + score;
  } else {
    if(fase == 0){
      this.scene.restart();
        fase = 1;
    }else{
      this.scene.start('winScene')
    }
    score = 0;
    health = 100;
  }
}

function onMeetEnemy() {
  health -= 1;
  if (health >= 0) {
    healthText.innerHTML = "HP: " + health;
  } else {
    this.scene.start('finalGame');
    health = 100;
    score=0

  }
}