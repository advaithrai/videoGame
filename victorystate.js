hiya.victorystate = function() {};
hiya.victorystate.prototype = {
    
    preload: function(){
                game.load.spritesheet('bruce', 'assets/spritesheets/brucewalk.png', 320, 320);
        game.load.image('outside', 'assets/backgrounds/outside.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('victorystate');
        game.stage.backgroundColor = '#DA3D1B';
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        var background = game.add.sprite(0,0, 'outside');
        
        bruce = game.add.sprite(centerX, centerY, 'bruce');
        bruce.anchor.setTo(0.1,0.1);
        bruce.scale.setTo(1.25,1.25);
        game.physics.enable(bruce);
        bruce.body.collideWorldBounds = true;
        bruce.animations.add('walk', [0,1,2,3]);
        
        game.add.text(1300,80, 'Steps: ' + score, {fontSize: 100, fill:'#DA420A'});
        
        
    },
    update: function(){
                if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            bruce.x += speed;
            score += 1;
            bruce.scale.setTo(1.25,1.25);
            bruce.animations.play('walk', 14, true);

        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            bruce.x -= speed;
            score += 1;
            bruce.scale.setTo(-1.25,1.25);
            bruce.animations.play('walk', 14, true);
            if (bruce.x < 100) {
                game.state.start('actionstate');
            }
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            bruce.y -= speed;
            score += 1;
            console.log(score);
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
    }

    };
    
