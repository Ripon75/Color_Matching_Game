class menuScene extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload(){
      // load image
      this.load.image('background', 'assets/images/background.png');
      this.load.image('mainMenu', 'assets/images/mainMenu.png');
      this.load.image('play', 'assets/images/play.png');
      this.load.image('quit', 'assets/images/quit.png');
      this.load.image('leaderboard', 'assets/images/leaderboard.png');     

    }

    create()
    {   
      // add background
      this.background = this.add.image(0, 0, 'background');
      this.background.displayHeight = this.sys.game.config.height;
      this.background.scaleX = this.background.scaleY; 
      this.background.x = game.config.width/2;
      this.background.y = game.config.height/2;

      // add main menu
      this.mainMenu = this.add.sprite(game.config.width/2, game.config.height/2, 'mainMenu');
      this.mainMenu.setScale(.45);
      this.mainMenu.scaleY = .6;
      
      // add play button
      this.playButton = this.add.sprite(game.config.width/2,game.config.height/2, 'play');
      this.playButton.setScale(.3);
 
       // add event with play button
       this.playButton.setInteractive();
       this.playButton.on('pointerdown', function()
       {
       
        
        this.myParticle();
        this.time.addEvent({delay: 600,callback:this.addEvent,callbackScope:this,repeat: 0 });
       },this);
      

   

    }

    addEvent(){
      game.scene.start('startScene');
      this.background.visible = false;
      this.mainMenu.visible = false;
    }

    myParticle(){
 
      this.tweens.add({
              targets: this.playButton,
                  scaleX: 0,
                  scaleY: 0,
                  alpha: 0,
                  y: '+=64',
                  ease: 'Power3',
                  duration: 1000,
          });
  
    }
      
}