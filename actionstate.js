var hiya = {}, centerX = 1500 / 2, centerY = 1000 / 2, bruce, speed = 4;
hiya.actionstate = function() {};
hiya.actionstate.prototype = {
    
    preload: function(){
        game.load.image('bruce', 'assets/sprites/Dragon_1.png')
        
    },
    create: function() {
        console.log('actionstate');
        game.stage.backgroundColor = '#6D6214';
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 'victory');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        bruce = game.add.sprite(centerX, centerY, 'bruce');
        bruce.anchor.setTo(0.5,0.5);
        
       
       
        
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            bruce.x += speed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            bruce.x -= speed;
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