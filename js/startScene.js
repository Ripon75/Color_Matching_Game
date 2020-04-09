class startScene extends Phaser.Scene 
{
   constructor(){
        super('startScene');
    }

 preload ()
    {
        // load image
         this.load.image('one', 'assets/images/1.png');
         this.load.image('two', 'assets/images/2.png');
         this.load.image('three', 'assets/images/3.png');
         this.load.image('go', 'assets/images/go.png');
         this.load.image('bG', 'assets/images/BG.png');

         this.load.image('pauseButton','assets/images/pauseB.png'); 
         this.load.image('homeButton', 'assets/images/Home.png');
         this.load.image('offSound' ,'assets/images/offSound.png');


         // load audio
         this.load.audio('startSound' , 'assets/sound/start.mp3');
         this.load.audio('goSound' , 'assets/sound/go.mp3');
         
    }

     create()
     {

     //add background
    this.bg = this.add.image(0,0,'bG');
    this.bg.displayHeight = this.sys.game.config.height;
    this.bg.setScale(.7);
    this.bg.scaleX = this.bg.scaleY; 
    this.bg.x = game.config.width/2;
    this.bg.y = game.config.height/2;
    //this.bg.x = this.bg.displayWidth*.5; 

    var homeButton = this.add.sprite(50,50, 'homeButton');
    homeButton.setScale(.18);

    var resumeButton = this.add.image(100,50,'pauseButton');
    resumeButton.setScale(.18);


   var offSoundButton = this.add.image(150,50,'offSound');
   offSoundButton.setScale(.18);


    var score = 0;
    var scoreText;
    scoreText = this.add.text(72, 115, score, {
        fontFamily: 'myFont',color: "#656565",fontSize: 22
    });

    this.counter = 0; 

     //add image
         this.go = this.add.image(game.config.width/2,game.config.height/2, 'go');      
         this.one = this.add.image(game.config.width/2,game.config.height/2, 'one');
         this.two = this.add.image(game.config.width/2,game.config.height/2, 'two');
         this.three = this.add.image(game.config.width/2,game.config.height/2, 'three');

         //setScale
         this.three.setScale(.5);
         this.go.setScale(.5);
         this.one.setScale(.5);
         this.two.setScale(.5);

         this.go.visible = false;
         this.one.visible = false;
         this.two.visible = false;

         //load sound
         this.startSound = this.sound.add('startSound');
         this.goSound = this.sound.add('goSound');

         this.startSound.volume = .5;
         this.startSound.play(); 

         //add timer
      this.time.addEvent({delay: 800,callback:this.addEvent,callbackScope:this,repeat: 4 });

      }


      addEvent()
      {      

         this.counter++;     

         if(this.counter===1)
         {

             this.startSound.play(); 
             this.tweens.add({
                targets: this.three,
                scaleX: 0,
                scaleY: 0,
                alpha: 0,
                y: '+=64',
                ease: 'Power3',
                duration: 1000,
            });

             this.two.visible = true;
         }

        if(this.counter===2)
         {
            this.startSound.play();

             this.tweens.add({
            targets: this.two,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            y: '+=64',
            ease: 'Power3',
            duration: 1000,
        });

             this.one.visible = true;
         }

         if(this.counter===3)
         {
            this.startSound.play(); 

            this.tweens.add({
                targets: this.one,
                scaleX: 0,
                scaleY: 0,
                alpha: 0,
                y: '+=64',
                ease: 'Power3',
                duration: 1000,
            });

             this.go.visible = true;
         }


         if(this.counter ===4)
         {
            this.goSound.play(); 
            this.tweens.add({
                targets: this.go,
                scaleX: 0,
                scaleY: 0,
                alpha: 0,
                y: '+=64',
                ease: 'Power3',
                duration: 1000,
            });
           
         }

    if(this.counter ===5)
    {
        this.scene.start('gameScene');
    }

      }

}