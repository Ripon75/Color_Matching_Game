 class gameOverScene extends Phaser.Scene
 {
    constructor()
    {
        super('gameOverScene');
    }

    preload()
    {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('gameOver', 'assets/images/gameOver.png');
        this.load.image('homeButton', 'assets/images/Home.png');
        this.load.image('retryButton', 'assets/images/Retry.png');
        this.load.image('leaderboard', 'assets/images/leaderboard.png'); 
       
    }

    init (data)
   {
    //console.log('init', data);
    this.finalScore = data.score;
   }

    create()
     {
         this.score = this.finalScore;

        
         // add background
         this.background = this.add.sprite(0, 0, 'background');
         this.background.displayHeight = this.sys.game.config.height;
         this.background.scaleX = this.background.scaleY;
         this.background.y = game.config.height / 2;
         this.background.x = game.config.width / 2;
         //this.background.x = this.background.displayWidth*.5;


         // add game over menu
         this.gameOver = this.add.sprite(game.config.width / 2, game.config.height / 2, 'gameOver');
         this.gameOver.setScale(.45);
         this.gameOver.scaleY = .8;


         //show score
         this.finalScore = this.add.text(game.config.width /2-30, game.config.height / 2 + 20, this.finalScore,{
             fontFamily: 'myFont', color: "#656565", fontSize: 42
         });

         

        //leaderboard
        this.leaderboard = this.add.sprite(game.config.width / 2 + 5, game.config.height / 2 + 120, 'leaderboard');
        this.leaderboard.setScale(.25);
    
        //add event leaderboard
        this.leaderboard.setInteractive();
        this.leaderboard.on('pointerdown', function () {
            this.myParticleLeaderboard();
            this.time.addEvent({ delay: 600, callback: this.addEventLeaderboard, callbackScope: this, repeat: 0 });

        }, this);


         //home button
         this.homeButton = this.add.sprite(game.config.width / 2 - 90, game.config.height / 2 + 200, 'homeButton');
         this.homeButton.setScale(.25);

         // add event with home button
         this.homeButton.setInteractive();
         this.homeButton.on('pointerdown', function () {

             this.myParticleHome();
             this.time.addEvent({ delay: 600, callback: this.addEventHome, callbackScope: this, repeat: 0 });

         }, this);


         // retry button
         this.retryButton = this.add.sprite(game.config.width / 2 + 85, game.config.height / 2 + 200, 'retryButton');
         this.retryButton.setScale(.25);


         // add event with retry button
         this.retryButton.setInteractive();
         this.retryButton.on('pointerdown', function () {
             this.myParticleRetry();
             this.time.addEvent({ delay: 600, callback: this.addEventRetry, callbackScope: this, repeat: 0 });

         }, this);


     }


     addEventLeaderboard() {
        game.scene.start('Leaderboard', { finalScore: this.score});
        this.finalScore.visible = false;
        this.gameOver.visible = false;
        this.background.visible = false;
        this.retryButton.visible = false;
        this.homeButton.visible = false;

    }

    myParticleLeaderboard() {

        this.tweens.add({
            targets: this.leaderboard,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            y: '+=64',
            ease: 'Power3',
            duration: 1000,
        });

    }


    addEventHome() {
         game.scene.start('menuScene');
         this.finalScore.visible = false;
         this.gameOver.visible = false;
         this.background.visible = false;
         this.retryButton.visible = false;
         this.leaderboard.visible = false;

     }

     myParticleHome() {

         this.tweens.add({
             targets: this.homeButton,
             scaleX: 0,
             scaleY: 0,
             alpha: 0,
             y: '+=64',
             ease: 'Power3',
             duration: 1000,
         });

     }


     addEventRetry() {
         game.scene.start('startScene');
         this.finalScore.visible = false;
         this.gameOver.visible = false;
         this.background.visible = false;
         this.homeButton.visible = false;
         this.leaderboard.visible = false;
     }

     myParticleRetry() {

         this.tweens.add({
             targets: this.retryButton,
             scaleX: 0,
             scaleY: 0,
             alpha: 0,
             y: '+=64',
             ease: 'Power3',
             duration: 1000,
         });

     }

}