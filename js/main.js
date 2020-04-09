
var game;

window.onload = function () {

  FBInstant.initializeAsync().then(function () {

    var progress = 0;
    var inerval = setInterval(function () {
      progress += 10;
      FBInstant.setLoadingProgress(progress);
      if (progress >= 90) {
        clearInterval(inerval);
        FBInstant.startGameAsync().then(function () {

          var contextId = FBInstant.context.getID();

          var contextType = FBInstant.context.getType();

          var playerName = FBInstant.player.getName();
          var playerPic = FBInstant.player.getPhoto();
          var playerId = FBInstant.player.getID();



        });

      }

    }, 100);

  });

  var config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT, //SMOTH
      parent: 'phaser-example',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 360,
      height: 640
    },
    backgroundColor: 0xffefdb,
    scene: [menuScene, startScene, gameScene, gameOverScene, Leaderboard]

  };

  game = new Phaser.Game(config);
}


