var hiya = {};
hiya.actionstate = function() {};
hiya.actionstate.prototype = {
    
    preload: function(){
        
    },
    create: function() {
        console.log('actionstate');
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeState, null, null, 'victory');
        
    },
    update: function(){
    
    }
    
};

function changeState(i, state) {
    var stateName = 'victory' + 'state';
    console.log(stateName);
    console.log(i);
    console.log(state);
    game.state.start(stateName);
    
}