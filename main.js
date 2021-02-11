var game = new Phaser.Game(1500,1000, Phaser.AUTO);
game.state.add('actionstate',hiya.actionstate);
game.state.add('victorystate', hiya.victorystate);
game.state.start('actionstate');