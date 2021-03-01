var hiya = {}, centerX = 1500 / 2, centerY = 1000 / 2, centerX_1 = 1500, centerY_1 = 1000 / 2,  bruce, masterone,  speed = 7, score = 0, h_health = 100, e_health = 100;
hiya.actionstate = function() {};
hiya.actionstate.prototype = {
    
    preload: function(){
        game.load.spritesheet('bruce', 'assets/spritesheets/brucewalk.png', 320, 320);
        game.load.spritesheet('masterone', 'assets/spritesheets/masterone.png', 320, 320)
        game.load.image('background', 'assets/backgrounds/dojo.png');
        
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('actionstate');
        game.stage.backgroundColor = '#6D6214';
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 'victory');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0, 'background');
        
        //adds bruce into the game
        bruce = game.add.sprite(centerX, centerY, 'bruce');
        bruce.anchor.setTo(0.5,0.1);
        bruce.scale.setTo(1.25,1.25);
        game.physics.enable(bruce);
        bruce.body.collideWorldBounds = true;
        bruce.animations.add('walk', [0,1,2,3]);
        
        
        masterone = game.add.sprite(centerX_1, centerY_1, 'masterone');
        masterone.anchor.setTo(0.5,0.1);
        masterone.scale.setTo(1.25,1.25);
        game.physics.enable(masterone);
        masterone.body.collideWorldBounds = true;
        masterone.animations.add('walk', [0,1,2,3]);
        
        
        
        
        
        //game.add.text(1300,80, 'Steps: ' + score, {fontSize: 500, fill:'#DA420A'});
        game.add.text(100,10, 'Your Health: ' + h_health, {fontSize: 500, fill:'#DA420A'});
        game.add.text(1200,10, 'Master one Health: ' + e_health, {fontSize: 500, fill:'#DA420A'});
 

        

       
       
        
    },
    update: function(){
        
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            bruce.x += speed;
            score += 1;
            bruce.scale.setTo(1.25,1.25);
            bruce.animations.play('walk', 14, true);
            if (bruce.x > 1300) {
                game.state.start('victorystate');
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            bruce.x -= speed;
            score += 1;
            bruce.scale.setTo(-1.25,1.25);
            bruce.animations.play('walk', 14, true);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            bruce.y -= speed;
            score += 1;
            if (bruce.y < 360) {
                bruce.y = 360;
                bruce.animations.play('walk', 14,true);
            }
            
            
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            bruce.y += speed;
            score += 1;
            bruce.animations.play('walk', 14, true);
            
        }
        else {
            bruce.animations.stop('walk');
            bruce.frame = 0;
        }
        
        //Code what masterone has to do 
        
        
        
        
    }
    
};

function changeState(i, state) {
    var stateName = 'victory' + 'state';
    console.log(stateName);
    console.log(i);
    console.log(state);
    game.state.start(stateName);
    
}