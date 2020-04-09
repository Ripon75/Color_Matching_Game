class gameScene extends Phaser.Scene
{
    constructor(){
        super('gameScene');
    }


 preload(){

//load backgroung image
this.load.image('bg','assets/images/BG.png'); 
//load colour image
this.load.image('redI','assets/images/red.png');
this.load.image('greenI','assets/images/green.png');
this.load.image('purpleI','assets/images/purple.png');
this.load.image('yellowI','assets/images/yellow.png');
this.load.image('pinkI','assets/images/pink.png');
this.load.image('violetI','assets/images/violet.png');
this.load.image('blueI','assets/images/blue.png');

//load pause button image
this.load.image('pauseButton','assets/images/pauseB.png'); 
this.load.image('resumeButton','assets/images/playB.png');
this.load.image('homeButton', 'assets/images/Home.png');

//load input image
this.load.image('vartical' ,'assets/images/v.png');
this.load.image('horizontal' ,'assets/images/h.png');

//load sound button image
this.load.image('offSound' ,'assets/images/offSound.png');
this.load.image('onSound' ,'assets/images/onSound.png');

//load audio
this.load.audio('gameSound' , 'assets/sound/gameSound.mp3');
this.load.audio('moveSound' , 'assets/sound/move.mp3');
this.load.audio('gameOverSound' , 'assets/sound/gameOver.mp3');
this.load.audio('winSound' , 'assets/sound/win.mp3');
this.load.audio('lockSound' , 'assets/sound/lock.mp3');

// add particle
//this.load.atlas('flares', 'assets/images/flares.png',  'assets/images/flares.json');

}


//create function
 create()
 {

    const ROW = 9;
    const COL  = 7;
    const SQ  = 60;
    const moveImageY = 44.65;
    const moveImageLR = 45;
    const imagePositionX = 157;
    const imagePositionY = 150.5;
    const imageSize = .36;
    const VACANT = "0xffefdb"; // color of an empty square

    const PIECES = 
    [
        ["redI"],
        ["greenI"],
        ["purpleI"],
        ["yellowI"],
        ["pinkI"],
        ["violetI"],
        ["blueI"]
    ];


    var board = [];
    var imageHolder = [];
    var score = 0;
    var scoreText;
    
    for(var r = 0; r < ROW; r++)
    {
        // create board
        board[r] = [];
        imageHolder[r] = [];

        for( var c = 0; c < COL; c++)
        {
            board[r][c] = "";
            imageHolder[r][c] = null;
        }
    }
    
     this.drawSquare = function(x,y,color) 
     {
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(color, 1.0);
        this.graphics.fillRect(x*SQ, y*SQ, SQ, SQ);
        this.graphics.lineStyle(1, 0xffefdb, 1);
        this.graphics.strokeRect(x*SQ, y*SQ, SQ, SQ);    
    }
    
    //drow board
    this.drawBoard = function()
    {
        for( r = 0; r < ROW; r++)
        {
            for(c = 0; c < COL; c++)
            {
               this.drawSquare.call(this,c,r,VACANT);
               
            }
        }
    }

    //this.drawBoard();

    //background
    let bg = this.add.image(0,0,'bg');
    bg.displayHeight = this.sys.game.config.height;
    bg.setScale(.7);
    bg.scaleX = bg.scaleY; 
    bg.y = game.config.height/2;
    bg.x = game.config.width/2;
    //bg.x = bg.displayWidth*.5;

    

    //add input image
    this.horizontalImage = this.add.image(bg.x,bg.y+195,'horizontal');
    this.horizontalImage.scaleY = 1.4;
    
    this.varticalImage1 = this.add.image(bg.x-105,bg.y-20,'vartical');
    this.varticalImage1.scaleX = 1.1;

    this.varticalImage2 = this.add.image(bg.x+100,bg.y-20,'vartical');
    this.varticalImage2.scaleX=1.1;

     // game state
     this.gameState = true;
    
    // move state
    this.downClick = false;
    this.leftClick = false;
    this.rightClick = false;

    //set interactive
    this.horizontalImage.setInteractive();
      this.horizontalImage.on('pointerdown', function(){
        this.downClick = true;
     },this);

     this.varticalImage1.setInteractive();
     this.varticalImage1.on('pointerdown', function(){
        this.leftClick = true;
     },this);

      this.varticalImage2.setInteractive();
      this.varticalImage2.on('pointerdown', function(){
        this.rightClick = true;
     },this);

     this.varticalImage1.alpha= .01;
     this.varticalImage2.alpha= .01;
     this.horizontalImage.alpha= .01;


     
    // score
    scoreText = this.add.text(72, 115, score, {
        fontFamily: 'myFont',color: "#656565",fontSize: 22
    });
    


    // add sound
    this.gameSound=this.sound.add('gameSound');
    this.moveSound=this.sound.add('moveSound');
    this.winSound=this.sound.add('winSound');
    this.gameOverSound=this.sound.add('gameOverSound');
    this.lockSound=this.sound.add('lockSound');

// home button
var homeButton = this.add.sprite(50,50, 'homeButton');
homeButton.setScale(.18);

// add event with home button
homeButton.setInteractive();
homeButton.on('pointerdown', function()
{
    this.scene.start('menuScene');
    this.gameSound.stop();
    
},this);
       
// resume button 
var resumeButton = this.add.image(100,50,'resumeButton');
resumeButton.setScale(.18);
resumeButton.visible = false;
resumeButton.setInteractive();
resumeButton.on('pointerdown',function ()
{
    this.gameState = true;
    pauseButton.visible = true;
    resumeButton.visible = false;

}, this);


// pause button
var pauseButton = this.add.image(100,50,'pauseButton');
pauseButton.setScale(.18);
pauseButton.setInteractive();
pauseButton.on('pointerdown',function ()
{
 this.gameState = false;
 pauseButton.visible = false;
 resumeButton.visible = true;

 }, this);


//gameSound play
    this.gameSound.loop = true;
    this.gameSound.volume = .1;
    this.gameSound.play();

// sound on
var onSoundButton = this.add.image(150,50,'onSound');
onSoundButton.setScale(.18);
onSoundButton.visible = false;
onSoundButton.setInteractive();
onSoundButton.on('pointerdown',function ()
{
    this.gameSound.play();
    this.moveSound.volume = 1;
    this.winSound.volume = 1;
    this.gameOverSound.volume = 1;
    this.lockSound.volume = 1;
    onSoundButton.visible = false;
    offSoundButton.visible = true;
 }, this);




// sound off
var offSoundButton = this.add.image(150,50,'offSound');
offSoundButton.setScale(.18);
offSoundButton.setInteractive();
offSoundButton.on('pointerdown',function ()
{
    this.gameSound.stop();
    this.moveSound.volume = 0;
    this.winSound.volume = 0;
    this.gameOverSound.volume = 0;
    this.lockSound.volume = 0;
    offSoundButton.visible = false;
    onSoundButton.visible = true;

 }, this);
 

  // particle configaration
   this.particlesConfig = {
    x: 400,
    y: 300,
    speed: 100,
    lifespan: 500,
    blendMode: 'NORMAL',
    scale: {start: .5, end: 0},
    alpha: { start: 1, end: 0},
    on: false,
       
   }

   // random image
     let rN = Math.floor(Math.random() * PIECES.length);
     this.color = PIECES[rN];
     this.x = 3;
     this.y = 0; 
     this.randomImage =this.add.image(imagePositionX,imagePositionY,this.color).setScale(imageSize);

     this.randomImage.setDataEnabled();
   
     switch(rN)
     {
        case 0:
            this.randomImage.data.set('Color', 'redC');
            break;
        case 1:
            this.randomImage.data.set('Color', 'greenC');
            break;
        case 2:
            this.randomImage.data.set('Color', 'purpleC');
            break;
        case 3:
            this.randomImage.data.set('Color', 'yellowC');
            break;
        case 4:
            this.randomImage.data.set('Color', 'pinkC');
            break;
        case 5:
            this.randomImage.data.set('Color', 'blueC');
            break;
        case 6:
            this.randomImage.data.set('Color', 'violetC');
            break;
     }


     this.moveDown = function()
     {
        if(!this.collision(0,1))
        {   
            this.moveSound.play();
            this.y++;
            this.randomImage.y+= moveImageY;            
           
        }
        else
        {
            // we lock the piece and generate a new one
            this.lock();
            let  rN = Math.floor(Math.random() * PIECES.length);
            this.color = PIECES[rN];
            this.x = 3;
            this.y = 0;
            this.randomImage =this.add.image(imagePositionX,imagePositionY,this.color).setScale(imageSize);
           
            this.randomImage.setDataEnabled();

       switch(rN)
       {
        case 0:
            this.randomImage.data.set('Color', 'redC');
            break;
        case 1:
            this.randomImage.data.set('Color', 'greenC');
            break;
        case 2:
            this.randomImage.data.set('Color', 'purpleC');
            break;
        case 3:
            this.randomImage.data.set('Color', 'yellowC');
            break;
        case 4:
            this.randomImage.data.set('Color', 'pinkC');
            break;
        case 5:
            this.randomImage.data.set('Color', 'blueC');
            break;
        case 6:
            this.randomImage.data.set('Color', 'violetC');
            break;
     }
             
            //console.log(this.red.data.get('Color'));

        }
        
    }
    

    this.moveRight = function()
    {
        if(!this.collision(1,0))
        {  
            this.moveSound.play();  
            this.x++;
            this.randomImage.x+= moveImageLR;  
             
        }
    }


    this.moveLeft = function()
    {
        this.moveSound.play();
        if(!this.collision(-1,0))
        {   
            this.x--;
            this.randomImage.x-= moveImageLR;   
            
        }
    }
    

    this.collision = function(x,y)
    {    
        for( r = 0; r < 1; r++)
        {
            for(c = 0; c < 1; c++)
            {
               // coordinates of the piece after movement

                let newX = this.x + c + x;
                let newY = this.y + r + y;

                // conditions
                if(newX <= 0 || newX >= COL || newY >= ROW){
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if(newY < 0){
                    continue;
                }
                // check if there is a locked piece alrady in place
                if( board[newY][newX] != ""){
                    return true;
                }

                if( imageHolder[newY][newX] != null){
                    return true;
                }
            }
    
        }
        return false;
    }

    this.lock = function()
    {
        for( r = 0; r < 1; r++)
        { 
            for(c = 0; c < 1; c++)
            {
             
                // pieces to lock on top = game over
                if(this.y + r < 1){

                    this.gameSound.pause();
                    this.gameOverSound.play();

                    this.scene.start('gameOverScene', { score: score });

                    //alert("Game Over");
                    // stop request animation frame
                    this.gameOver = true;
                    this.gameSound.pause();
                    this.gameOverSound.play();
                    break;
                }
                // we lock the piece               
                this.lockSound.play();
                board[this.y+r][this.x+c] =  this.randomImage.data.get('Color');//this.red;  
                imageHolder[this.y+r][this.x+c] = this.randomImage;
                this.image = this.randomImage;
                   
            }
           
        }

       // for COL check

        for(r=0; r<ROW; r++)
        {

            for(c = 0; c < COL-2; c++)
            {

                // for Red

                if((board[r][c]==="redC") && (board[r][c+1]==="redC") && (board[r][c+2]==="redC"))
                { 
                
                   // destroy imageHolder
                    imageHolder[r][c].destroy();
                    imageHolder[r][c+1].destroy();
                    imageHolder[r][c+2].destroy();


                    // add particle
                    this.particleR = this.add.particles('redI');
                    this.emitterR = this.particleR.createEmitter(this.particlesConfig);
                    this.particleR.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
                    this.particleR.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
                    this.particleR.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);

                                 
                  // null imageHolder
                   imageHolder[r][c]=null;
                   imageHolder[r][c+1]=null;
                   imageHolder[r][c+2]=null;
            
                   // null board
                    board[r][c]="";
                    board[r][c+1]="";
                    board[r][c+2]="";

                    // update score
                    this.winSound.play();
                    score += 3;

                    // fall above block
                    for(var y=r; y>0; y--)
                    {
                        //console.log('y = '+y);
                        board[y][c]=board[y-1][c];
                        board[y][c+1]=board[y-1][c+1];
                        board[y][c+2]=board[y-1][c+2];
                        
                        if(imageHolder[y-1][c] !=null )
                        {
                            imageHolder[y-1][c].y += moveImageY;
                            imageHolder[y][c] = imageHolder[y-1][c];
                            imageHolder[y-1][c] = null;
                           
                        }

                        
                        if(imageHolder[y-1][c+1] !=null )
                        {
                            imageHolder[y-1][c+1].y += moveImageY;
                            imageHolder[y][c+1] =imageHolder[y-1][c+1];
                            imageHolder[y-1][c+1] = null;
                        }

                        if(imageHolder[y-1][c+2] !=null )
                        {
                            imageHolder[y-1][c+2].y += moveImageY;
                            imageHolder[y][c+2] = imageHolder[y-1][c+2];
                            imageHolder[y-1][c+2] = null;                          
                            
                        }
                        
                     }       
            }

            //for Green
            if((board[r][c]==="greenC") && (board[r][c+1]==="greenC") && (board[r][c+2]==="greenC"))
            {

                imageHolder[r][c].destroy();
                imageHolder[r][c+1].destroy();
                imageHolder[r][c+2].destroy();


                this.particleG = this.add.particles('greenI');
                this.particleG = this.particleG.createEmitter(this.particlesConfig);
                this.particleG.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
                this.particleG.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
                this.particleG.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);

                
                imageHolder[r][c]=null;
                imageHolder[r][c+1]=null;
                imageHolder[r][c+2]=null;


                board[r][c]="";
                board[r][c+1]="";
                board[r][c+2]="";

                this.winSound.play();
                score += 3;

                for(var y=r; y>0; y--)
                {
                    
                    board[y][c]=board[y-1][c];
                    board[y][c+1]=board[y-1][c+1];
                    board[y][c+2]=board[y-1][c+2];
                    
                    if(imageHolder[y-1][c] !=null )
                    {
                        imageHolder[y-1][c].y += moveImageY;
                        imageHolder[y][c] = imageHolder[y-1][c];
                        imageHolder[y-1][c] = null;
                    }

                    
                    if(imageHolder[y-1][c+1] !=null )
                    {
                        imageHolder[y-1][c+1].y += moveImageY;
                        imageHolder[y][c+1] = imageHolder[y-1][c+1];
                        imageHolder[y-1][c+1] = null;
                    }

                    if(imageHolder[y-1][c+2] !=null )
                    {
                        imageHolder[y-1][c+2].y += moveImageY;
                        imageHolder[y][c+2] = imageHolder[y-1][c+2];
                        imageHolder[y-1][c+2] = null;
                    }
                    
                 } 



            }

            //for yellow
            if((board[r][c]==="yellowC") && (board[r][c+1]==="yellowC") && (board[r][c+2]==="yellowC"))
            { 

                imageHolder[r][c].destroy();
                imageHolder[r][c+1].destroy();
                imageHolder[r][c+2].destroy();

                this.particleY = this.add.particles('yellowI');
                this.particleY = this.particleY.createEmitter(this.particlesConfig);
                this.particleY.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
                this.particleY.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
                this.particleY.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);  


                imageHolder[r][c]=null;
                imageHolder[r][c+1]=null;
                imageHolder[r][c+2]=null;

                board[r][c]="";
                board[r][c+1]="";
                board[r][c+2]="";

                this.winSound.play();
                score += 3;

                for(var y=r; y>0; y--)
                {
                    
                    board[y][c]=board[y-1][c];
                    board[y][c+1]=board[y-1][c+1];
                    board[y][c+2]=board[y-1][c+2];
                    
                    if(imageHolder[y-1][c] !=null )
                    {
                        imageHolder[y-1][c].y += moveImageY;
                        imageHolder[y][c] = imageHolder[y-1][c];
                        imageHolder[y-1][c] = null;
                        
                    }

                    
                    if(imageHolder[y-1][c+1] !=null )
                    {
                        imageHolder[y-1][c+1].y += moveImageY;
                        imageHolder[y][c+1] = imageHolder[y-1][c+1];
                        imageHolder[y-1][c+1] = null;
                       
                    }

                    if(imageHolder[y-1][c+2] !=null )
                    {
                        imageHolder[y-1][c+2].y += moveImageY;
                        imageHolder[y][c+2] = imageHolder[y-1][c+2];
                        imageHolder[y-1][c+2] = null;   
                    }
                    
                 } 
              

               
        }

        // for Purple
        if((board[r][c]==="purpleC") && (board[r][c+1]==="purpleC") && (board[r][c+2]==="purpleC"))
        { 

            imageHolder[r][c].destroy();
            imageHolder[r][c+1].destroy();
            imageHolder[r][c+2].destroy();


            this.particleP = this.add.particles('purpleI');
            this.particleP = this.particleP.createEmitter(this.particlesConfig);
            this.particleP.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
            this.particleP.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
            this.particleP.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y); 


            imageHolder[r][c]=null;
            imageHolder[r][c+1]=null;
            imageHolder[r][c+2]=null;

            board[r][c]="";
            board[r][c+1]="";
            board[r][c+2]="";

            this.winSound.play();
            score += 3;

            for(var y=r; y>0; y--)
            {
                
                board[y][c]=board[y-1][c];
                board[y][c+1]=board[y-1][c+1];
                board[y][c+2]=board[y-1][c+2];
                
                if(imageHolder[y-1][c] !=null )
                {
                    imageHolder[y-1][c].y += moveImageY;
                    imageHolder[y][c] = imageHolder[y-1][c];
                    imageHolder[y-1][c] = null;
                }

                
                if(imageHolder[y-1][c+1] !=null )
                {
                    imageHolder[y-1][c+1].y += moveImageY;
                    imageHolder[y][c+1] = imageHolder[y-1][c+1];
                    imageHolder[y-1][c+1] = null;
                }

                if(imageHolder[y-1][c+2] !=null )
                {
                    imageHolder[y-1][c+2].y += moveImageY;
                    imageHolder[y][c+2] = imageHolder[y-1][c+2];
                    imageHolder[y-1][c+2] = null;
                }
                
             } 
            
        }

      // pink
      if((board[r][c]==="pinkC") && (board[r][c+1]==="pinkC") && (board[r][c+2]==="pinkC"))
      { 
   
        imageHolder[r][c].destroy();
        imageHolder[r][c+1].destroy();
        imageHolder[r][c+2].destroy();


        this.particleP = this.add.particles('pinkI');
        this.particleP = this.particleP.createEmitter(this.particlesConfig);
        this.particleP.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
        this.particleP.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
        this.particleP.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);


        imageHolder[r][c]=null;
        imageHolder[r][c+1]=null;
        imageHolder[r][c+2]=null;


        board[r][c]="";
        board[r][c+1]="";
        board[r][c+2]="";

        this.winSound.play();
        score += 3;

        for(var y=r;y>0;y--)
        {
            
            board[y][c]=board[y-1][c];
            board[y][c+1]=board[y-1][c+1];
            board[y][c+2]=board[y-1][c+2];
            
            if(imageHolder[y-1][c] !=null )
            {
                imageHolder[y-1][c].y += moveImageY;
                imageHolder[y][c] = imageHolder[y-1][c];
                imageHolder[y-1][c] = null;
            }

            
            if(imageHolder[y-1][c+1] !=null )
            {
                imageHolder[y-1][c+1].y += moveImageY;
                imageHolder[y][c+1] = imageHolder[y-1][c+1];
                imageHolder[y-1][c+1] = null;
            }

            if(imageHolder[y-1][c+2] !=null )
            {
                imageHolder[y-1][c+2].y += moveImageY;
                imageHolder[y][c+2] = imageHolder[y-1][c+2];
                imageHolder[y-1][c+2] = null;
            }
            
         } 
        
    }

    // blue
    if((board[r][c]==="blueC") && (board[r][c+1]==="blueC") && (board[r][c+2]==="blueC"))
    { 
   
        imageHolder[r][c].destroy();
        imageHolder[r][c+1].destroy();
        imageHolder[r][c+2].destroy();


        this.particleB = this.add.particles('violetI');
        this.particleB = this.particleB.createEmitter(this.particlesConfig);
        this.particleB.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
        this.particleB.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
        this.particleB.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);
        

        imageHolder[r][c]=null;
        imageHolder[r][c+1]=null;
        imageHolder[r][c+2]=null;

        board[r][c]="";
        board[r][c+1]="";
        board[r][c+2]="";

        this.winSound.play();
        score += 3;

        for(var y=r;y>0;y--)
        {
            
            board[y][c]=board[y-1][c];
            board[y][c+1]=board[y-1][c+1];
            board[y][c+2]=board[y-1][c+2];
            
            if(imageHolder[y-1][c] !=null )
            {
                imageHolder[y-1][c].y += moveImageY;
                imageHolder[y][c] = imageHolder[y-1][c];
                imageHolder[y-1][c] = null;
            }

            
            if(imageHolder[y-1][c+1] !=null )
            {
                imageHolder[y-1][c+1].y += moveImageY;
                imageHolder[y][c+1] = imageHolder[y-1][c+1];
                imageHolder[y-1][c+1] = null;
            }

            if(imageHolder[y-1][c+2] !=null )
            {
                imageHolder[y-1][c+2].y += moveImageY;
                imageHolder[y][c+2] = imageHolder[y-1][c+2];
                imageHolder[y-1][c+2] = null;
            }
            
         } 
        
    }

    // violet
    if((board[r][c]==="violetC") && (board[r][c+1]==="violetC") && (board[r][c+2]==="violetC"))
    { 
 
        imageHolder[r][c].destroy();
        imageHolder[r][c+1].destroy();
        imageHolder[r][c+2].destroy();


        this.particleV = this.add.particles('blueI');
        this.particleV = this.particleV.createEmitter(this.particlesConfig);
        this.particleV.emitParticleAt(imageHolder[r][c].x, imageHolder[r][c].y);
        this.particleV.emitParticleAt(imageHolder[r][c+1].x, imageHolder[r][c+1].y);
        this.particleV.emitParticleAt(imageHolder[r][c+2].x, imageHolder[r][c+2].y);


        imageHolder[r][c]=null;
        imageHolder[r][c+1]=null;
        imageHolder[r][c+2]=null;

        board[r][c]="";
        board[r][c+1]="";
        board[r][c+2]="";

        this.winSound.play();
        score += 3;

        for(var y=r;y>0;y--)
        {
            
            board[y][c]=board[y-1][c];
            board[y][c+1]=board[y-1][c+1];
            board[y][c+2]=board[y-1][c+2];
            
            if(imageHolder[y-1][c] !=null )
            {
                imageHolder[y-1][c].y += moveImageY;
                imageHolder[y][c] = imageHolder[y-1][c];
                imageHolder[y-1][c] = null;
            }

            
            if(imageHolder[y-1][c+1] !=null )
            {
                imageHolder[y-1][c+1].y += moveImageY;
                imageHolder[y][c+1] = imageHolder[y-1][c+1];
                imageHolder[y-1][c+1] = null;
            }

            if(imageHolder[y-1][c+2] !=null )
            {
                imageHolder[y-1][c+2].y += moveImageY;
                imageHolder[y][c+2] = imageHolder[y-1][c+2];
                imageHolder[y-1][c+2] = null;
            }
            
         } 
        
    }

        
        } //COL
    
    } //ROW


   
        //for ROW check 
        for(c = 0; c<COL;c++)
        {
                
            for( var j=0; j<ROW-2; j++)
            {
              
                if(board[j][c]!=VACANT){
                // for Red
                if(board[j][c]==="redC" && board[j+1][c]==="redC" && board[j+2][c]==="redC")
                {                      

                    // destroy imageHolder
                    imageHolder[j][c].destroy();
                    imageHolder[j+1][c].destroy();
                    imageHolder[j+2][c].destroy();
                         
                    // add particle
                    this.particleR = this.add.particles('redI');
                    this.particleR = this.particleR.createEmitter(this.particlesConfig);
                    this.particleR.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
                    this.particleR.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
                    this.particleR.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);
              
                      // null imageHolder
                      imageHolder[j][c]=null;
                      imageHolder[j+1][c]=null;
                      imageHolder[j+2][c]=null;
  

                    // null board
                    board[j][c]="";
                    board[j+1][c]="";
                    board[j+2][c]="";

                    // play win sound
                    this.winSound.play();
                    // update score
                    score += 3; 
                      
                }
                
                //for Green
                if(board[j][c]==="greenC" && board[j+1][c]==="greenC" && board[j+2][c]==="greenC")
                { 
                    
                    
                    imageHolder[j][c].destroy();
                    imageHolder[j+1][c].destroy();
                    imageHolder[j+2][c].destroy();


                    this.particleG = this.add.particles('greenI');
                    this.particleG = this.particleG.createEmitter(this.particlesConfig);
                    this.particleG.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
                    this.particleG.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
                    this.particleG.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);
                  
                    
                    imageHolder[j][c]=null;
                    imageHolder[j+1][c]=null;
                    imageHolder[j+2][c]=null;
                    
                    board[j][c]="";
                    board[j+1][c]="";
                    board[j+2][c]="";

                    this.winSound.play();
                    score += 3;     
                }

            // for Yellow
            if(board[j][c]==="yellowC" && board[j+1][c]==="yellowC" && board[j+2][c]==="yellowC")
            {
                
                
                    imageHolder[j][c].destroy();
                    imageHolder[j+1][c].destroy();
                    imageHolder[j+2][c].destroy();


                    this.particleY = this.add.particles('yellowI');
                    this.particleY = this.particleY.createEmitter(this.particlesConfig);
                    this.particleY.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
                    this.particleY.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
                    this.particleY.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);
                    
                    imageHolder[j][c]=null;
                    imageHolder[j+1][c]=null;
                    imageHolder[j+2][c]=null;


                    board[j][c]="";
                    board[j+1][c]="";
                    board[j+2][c]="";

                    this.winSound.play();
                    score += 3;     
            }

            // for Purple
            if(board[j][c]==="purpleC" && board[j+1][c]==="purpleC" && board[j+2][c]==="purpleC")
            {  
                imageHolder[j][c].destroy();
                imageHolder[j+1][c].destroy();
                imageHolder[j+2][c].destroy();

                this.particleP = this.add.particles('purpleI');
                this.particleP = this.particleP.createEmitter(this.particlesConfig);
                this.particleP.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
                this.particleP.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
                this.particleP.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);
                    
                imageHolder[j][c]=null;
                imageHolder[j+1][c]=null;
                imageHolder[j+2][c]=null;


                board[j][c]="";
                board[j+1][c]="";
                board[j+2][c]="";

                this.winSound.play();
                score += 3;     
           }

        // for blue
        if(board[j][c]==="blueC" && board[j+1][c]==="blueC" && board[j+2][c]==="blueC")
        {  
                          
            imageHolder[j][c].destroy();
            imageHolder[j+1][c].destroy();
            imageHolder[j+2][c].destroy();


            this.particleB = this.add.particles('violetI');
            this.particleB = this.particleB.createEmitter(this.particlesConfig);
            this.particleB.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
            this.particleB.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
            this.particleB.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);


            imageHolder[j][c]=null;
            imageHolder[j+1][c]=null;
            imageHolder[j+2][c]=null;

            board[j][c]="";
            board[j+1][c]="";
            board[j+2][c]="";
            
            this.winSound.play();
            score += 3;     
        }

        // for pink
        if(board[j][c]==="pinkC" && board[j+1][c]==="pinkC" && board[j+2][c]==="pinkC")
        {  
                          
            imageHolder[j][c].destroy();
            imageHolder[j+1][c].destroy();
            imageHolder[j+2][c].destroy();


            this.particleP = this.add.particles('pinkI');
            this.particleP = this.particleP.createEmitter(this.particlesConfig);
            this.particleP.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
            this.particleP.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
            this.particleP.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);


            imageHolder[j][c]=null;
            imageHolder[j+1][c]=null;
            imageHolder[j+2][c]=null;

            board[j][c]="";
            board[j+1][c]="";
            board[j+2][c]="";
            
            this.winSound.play();
            score += 3;     
        }

        // for violet
        if(board[j][c]==="violetC" && board[j+1][c]==="violetC" && board[j+2][c]==="violetC")
        {  

            imageHolder[j][c].destroy();
            imageHolder[j+1][c].destroy();
            imageHolder[j+2][c].destroy();


            this.particleV = this.add.particles('blueI');
            this.particleV = this.particleV.createEmitter(this.particlesConfig);
            this.particleV.emitParticleAt(imageHolder[j][c].x, imageHolder[j][c].y);
            this.particleV.emitParticleAt(imageHolder[j+1][c].x, imageHolder[j+1][c].y);
            this.particleV.emitParticleAt(imageHolder[j+2][c].x, imageHolder[j+2][c].y);

            imageHolder[j][c]=null;
            imageHolder[j+1][c]=null;
            imageHolder[j+2][c]=null;


            board[j][c]="";
            board[j+1][c]="";
            board[j+2][c]="";
            
            this.winSound.play();
            score += 3;     
        }

     }
    } //COL
           
   }  //ROW
         
        // show score
        scoreText.setText(score);

}
   
    // key event
   this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
   this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
   this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

   this.dropStart = Date.now();
   this.gameOver = false;
  
   
}
   
   // update methode
   update()
  
   {   

   
        let now = Date.now();
        let delta = now - this.dropStart;

        if(this.gameState){
            if(delta > 500)
            {
    
            this.moveDown.call(this);
           
            this.dropStart = Date.now();
            }
        } 
   
    if (Phaser.Input.Keyboard.JustDown(this.left))
       {
        if(this.gameState)
        {
            this.moveLeft.call(this);
        
            this.dropStart = Date.now(); 
        }       
              
       }
      
       if (Phaser.Input.Keyboard.JustDown(this.right))
          {
              if(this.gameState)
              {
                this.moveRight.call(this);
        
                this.dropStart = Date.now();   
              }
              
           }
  
  
          if (Phaser.Input.Keyboard.JustDown(this.down)) 
           {
            if(this.gameState)
            {
                this.moveDown.call(this) ;
        
                this.dropStart = Date.now();   
            }  
              
            }

           
            if(this.downClick)
            {
                if(this.gameState)
              {
                this.moveDown.call(this) ;
                this.downClick = false;
                this.dropStart = Date.now();   
              }
                
            }


            if(this.leftClick)
            {
                if(this.gameState)
              {
                this.moveLeft.call(this);
                this.leftClick = false;
                this.dropStart = Date.now();  
                  
              }
                
            }


            if(this.rightClick)
            {
                if(this.gameState)
              {
                this.moveRight.call(this);
                this.rightClick = false;
                this.dropStart = Date.now();   
              }
                
            }
   
   }

}

