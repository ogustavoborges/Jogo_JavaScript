class Enemy extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y){

        //pegar nosso monstrinho chamado slime para aplicar no game
        super(scene,x,y,'enemy', 0)
        this.scene = scene
  

        // habilitando as fisicas do mundo
        this.scene.physics.world.enable(this)

        //adiciona nosso player na cena
        this.scene.add.existing(this)
  
        //setting time to enemy moves
       this.timeEvent = this.scene.time.addEvent({
        delay: 300,
        callback: this.movel,
        loop: true,
        callbackScope: this
       })
    }

    movel(){
       
        const randNumber  = Math.floor(Math.random() * 4 + 1)
        switch(randNumber){
            case 1:
                this.setVelocityX(50);
                break;
            case 2:
                this.setVelocityX(-50);
                break;
            case 3:
                this.setVelocityY(50);
                break;
            case 4: 
                this.setVelocityY(-50);
                break; 
            default:
                this.setVelocityX(50);
        }
           
     
        
  this.scene.time.addEvent({
    delay: 500,
    callback: () => {
        this.setVelocityX(0)
    },
    callbackScope: this
  })
    };


}

export default Enemy