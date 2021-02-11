var hiya = {}, centerX = 1500 / 2, centerY = 1000 / 2, bruce, speed = 7;
hiya.actionstate = function() {};
hiya.actionstate.prototype = {
    
    preload: function(){
        game.load.image('bruce', 'assets/sprites/Dragon_1.png');
        game.load.image('background', 'assets/backgrounds/dojo.png');
        
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('actionstate');
        game.stage.backgroundColor = '#6D6214';
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 'victory');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0, 'background');
        
        bruce = game.add.sprite(centerX, centerY, 'bruce');
        bruce.anchor.setTo(0.5,0.1);
        bruce.scale.setTo(1.25,1.25);
        game.physics.enable(bruce);
        bruce.body.collideWorldBounds = true;
        
       
       
        
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            bruce.x += speed;
            bruce.scale.setTo(1.25,1.25);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            bruce.x -= speed;
            bruce.scale.setTo(-1.25,1.25);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            bruce.y -= 1;
            
        }
    }
    
};

function changeState(i, state) {
    var stateName = 'victory' + 'state';
    console.log(stateName);
    console.log(i);
    console.log(state);
    game.state.start(stateName);
    
}