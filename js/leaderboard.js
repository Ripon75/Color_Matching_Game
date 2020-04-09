class Leaderboard extends Phaser.Scene 
{
   constructor(){
        super('Leaderboard');
    }

 preload ()
    {
        
    }


    init(data) {
        //console.log('init', data);
        this.finalScore = data.finalScore;
    }

    create() {

        FBInstant.getLeaderboardAsync('Color_Matching')
            .then(leaderboard => {
                return leaderboard.setScoreAsync(this.finalScore);
            })
            .then(() => this.getLeaderboardScore())
            .catch(error => console.error(error));




       

    }

    getLeaderboardScore() {
        FBInstant.getLeaderboardAsync('Color_Matching')
            .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
            .then(entries => {
                for (var i = 1; i < entries.length + 1; i++) {

                    this.add.text(100, 100 * i, entries[i - 1].getRank() + '. ' + entries[i - 1].getPlayer().getName() + ' : ' + entries[i - 1].getScore(),{
                        fontFamily: 'myFont',color: "#656565",fontSize:42 });
                }
            }).catch(error => console.error(error));
    }


}