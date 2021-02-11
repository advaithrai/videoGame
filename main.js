var game = new Phaser.Game(600,400, Phaser.AUTO);
game.state.add('actionstate',hiya.actionstate);
game.state.start('actionstate');