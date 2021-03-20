var hiya = {}, centerX = 1500 / 2, centerY = 1000 / 2, centerX_1 = 1500, centerY_1 = 1000 / 2,  bruce, masterone, platform, b_music, v_music,   speed = 7, score = 0, h_health = 100, e_health = 100, master_left = true, in_action = false, masterScore, blocked = false;

var counter = 0;
var text = 0;

hiya.actionstate = function() {};
hiya.actionstate.prototype = {
    
    preload: function(){
        game.load.spritesheet('bruce', 'assets/spritesheets/brucefull.png', 320, 320);
        game.load.spritesheet('masterone', 'assets/spritesheets/masterone.png', 320, 320)
        game.load.image('background', 'assets/backgrounds/dojo.png');
        game.load.image('platform', 'assets/backgrounds/platform.png');
        game.load.image('end', 'assets/backgrounds/end.png');
        game.load.audio('b_music', 'assets/sounds/b.mp3')
        
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        console.log('actionstate');
        game.stage.backgroundColor = '#6D6214';
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 'victory');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        
        
        var background = game.add.sprite(0,0, 'background');
        platform = game.add.sprite(0,340, 'platform');
        
        game.physics.enable(platform);
        
        //adds bruce into the game
        bruce = game.add.sprite(centerX, centerY, 'bruce');
        bruce.anchor.setTo(0.5,0.1);
        bruce.scale.setTo(1.25,1.25);
        game.physics.enable(bruce);
        bruce.body.gravity.y = 1000;
        bruce.body.collideWorldBounds = true;
        bruce.animations.add('walk', [0,1,2,3]);
        bruce.animations.add('kick', [4,5,6,7,8,9,10,11]);
        bruce.animations.add('punch',[12,13,14,15,16,17,18]);
        
        
        
        
        masterone = game.add.sprite(centerX_1, centerY_1, 'masterone');
        masterone.anchor.setTo(0.5,0.1);
        masterone.scale.setTo(1.25,1.25);
        game.physics.enable(masterone);
        masterone.body.gravity.y = 1000;
        masterone.body.collideWorldBounds = true;
        masterone.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12]);
        masterone.animations.add('block', [13,14,15,16,17]);
        masterone.animations.add('surprise', [18,19,20,21]);
        masterone.animations.add('die', [22,23,24,25]);
        
        
        platform.body.immovable = true;
        
        //game.add.text(1300,80, 'Steps: ' + score, {fontSize: 500, fill:'#DA420A'});
        game.add.text(100,10, 'Your Health: ' + h_health, {fontSize: 500, fill:'#DA420A'});
        masterScore = game.add.text(1200,10, 'Master one Health: ' + e_health, {fontSize: 500, fill:'#DA420A'});
        
        //Timer
        text = game.add.text(centerX, 30, 'Time Left: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
        game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

 

       
       
        
    },
    update: function(){
        
        game.physics.arcade.collide(bruce,platform);
        

        
        game.physics.arcade.overlap(bruce, masterone, touchEnemy, null, this);
        
        //MUSIC
        audioVariable = game.sound.add('b_music');
        audioVariable.play();
        
    
        //TIMER
        //game.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
        //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
        counter++;
        var num = 3000 - counter;


        text.setText('Time Left: ' +  parseInt(num/100) + ' seconds');
        
        if (num <= 0) {
            var end = game.add.sprite(0,0, 'end');

        }
        
        
        
        
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            bruce.x += speed;
            score += 1;
            bruce.scale.setTo(1.25,1.25);
            bruce.animations.play('walk', 14, true);
            if (bruce.x > 1300 && e_health <= 0) {
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
            bruce.y -= speed + 20;
            score += 1;
           if (bruce.y < 360) {
               bruce.y = 360;
                bruce.animations.play('walk', 14,true);
           }
            
            
        }
        
        
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            
            bruce.animations.play('kick', 24, false)
            in_action = true;
            masterScore.destroy();
            masterScore = game.add.text(1200,10, 'Master one Health: ' + e_health, {fontSize: 500, fill:'#DA420A'});
            ;        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            
            bruce.animations.play('punch', 24, false);
            in_action = true;
            masterScore.destroy();
            masterScore = game.add.text(1200,10, 'Master one Health: ' + e_health, {fontSize: 500, fill:'#DA420A'});
 
        }
        
        
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            bruce.y += speed;
            score += 1;
            if (bruce.y > 450) {
                bruce.y = 450;
                bruce.animations.play('walk', 14, true);
            }
            bruce.animations.play('walk', 14, true);
            
        }
        else {
            bruce.animations.stop('walk');
            bruce.frame = 0;
            in_action = false;
        }

        
        
        //Code what masterone has to do
        if (e_health > 0) {
        
        if (masterone.x < 500) {
            master_left = false;
        }
        else if (masterone.x >= 1200) {
            master_left = true;
        }

        
        if (master_left == true) {
            masterone.animations.play('walk', 14, false);
            masterone.x -= speed;
            //masterone.animations.stop('walk');
            masterone.frame = 0;
            masterone.animations.play('block', 14, false);
        }
        else if (master_left == false) {
            masterone.animations.play('walk', 14, false);
            masterone.x += speed;
            masterone.frame = 0;
           
        } 
        if (masterone.x == 600) {
            masterone.animations.play('block', 30, false);
            in_action = false;  
            masterone.frame = 0;

        }
        
        
        }
        
        // this is when the master dies 
        else if (e_health <= 0) {
            masterone.animations.play('die', 14, false);
            masterone.x = masterone.x;
            masterone.frame = 23;
            in_action = false;
            masterone.body.immovable = true;

        }
        
        
        //this is when hiya has 0 health
        //shows the end credits
        //should it be < 0?
        //ENDD SCENE
        else if (h_health <= 0){
            var end = game.add.sprite(0,0, 'end');
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

function touchEnemy(player, enemy) {
    if (in_action == true && e_health > 0) {
        e_health -= 10;
    }
enemy.x *= -1;

}