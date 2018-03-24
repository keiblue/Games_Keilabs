let mainMenu,
    newGameMenu,
    config;

mainMenu = [{
    text: '1 Player',
    targetState: 'main',
    ispl2: 'false'
}, {
    text: '2 Player',
    targetState: 'main',
    ispl2: 'true'
}, {
    text: 'Options',
    targetState: 'OptionsMenu'
}];


optionsMenu = [{
    text: 'Text speed: ',
    value: 1,
    options: [
        'slow',
        'medium',
        'fast'
    ],
    configProperty: 'textSpeed'
}, {
    text: 'Music: ',
    value: 1,
    options: [
        'off',
        'on'
    ],
    configProperty: 'music'
}, {
    text: 'Sound FX: ',
    value: 1,
    options: [
        'off',
        'on'
    ],
    configProperty: 'soundFx'
}, {
    text: 'Back',
    targetState: 'MainMenu'
}];

config = {
    textStyle: {
        font: "20px monospace",
        fill: "#888"
    },
    textStyleFocused: {
        font: '20px monospace',
        fill: '#000',
        backgroundColor: '#888'
    }
};

var game = new Phaser.Game(500,500,Phaser.AUTO,'gameScreen');

var isp2 = false ;

var box = function(options){
    var bmd =game.add.bitmapData(options.length,options.width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,options.length,options.width);
    bmd.ctx.fillStyle = options.color;
    bmd.ctx.fill();
    return bmd;
};

var mainState = {
    preload: function () {
        game.load.audio('player1','/assets/audio/music/8-bit-ducky.mp3');
        game.load.audio('player2','/assets/audio/music/Retro1-140.wav');
    },
    create: function(){
        game.stage.backgroundColor = '#BDC2C5';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.player = game.add.sprite(64,game.world.height-64,box({
            length: 32,
            width: 32,
            color: '#4F616E'
        }));
        if (isp2){
            this.player2 = game.add.sprite(128,game.world.height-64,box({
                length: 32,
                width: 32,
                color: '#A96262'
            }));
            this.player2.score =0;
            this.player2.lives =3 ;
            this.cursor2 = game.input.keyboard.addKeys( { 
                'up': Phaser.KeyCode.W,
                'down': Phaser.KeyCode.S,
                'left': Phaser.KeyCode.A,
                'right': Phaser.KeyCode.D } );
            labelScore2 = game.add.text(20,45, 'score p2:'+ this.player2.score+' lives:'+this.player2.lives ,{
                font: '22px Arial',
                fill: '·fff',
                align: 'center'
            });
            this.player2.lives =3 ;
            this.player2.body.collideWorldBounds =true;
            music = game.add.audio('player2');
        }else{
            music = game.add.audio('player1');
        }

        music.volume = 0.2;
        music.play();

        this.player.score =0 ;
        
        this.player.lives =3;
        

        this.cursor = game.input.keyboard.createCursorKeys();
       

        this.player.body.collideWorldBounds =true;
        

        labelScore1 = game.add.text(20,20,'score p1:'+ this.player.score+' lives:'+this.player.lives,{
            font: '22px Arial',
            fill: '·fff',
            align: 'center'
        });
        this.walls = game.add.group();
        this.walls.enableBody = true;
        var top = this.walls.create(0,0,box({
            length: game.world.width,
            width: 16,
            color: '#374A59'
        }));
        top.body.immovable = true;
        var bottom = this.walls.create(0,game.world.height-16,box({
            length: game.world.width,
            width: 16,
            color: '#374A59'
        }));
        bottom.body.immovable = true;
        var left = this.walls.create(0,0,box({
            length: 16,
            width: game.world.height,
            color: '#374A59'
        }));
        left.body.immovable = true;
        /*var right = this.walls.create(game.world.width-16,0,box({
            length: 16,
            width: game.world.height,
            color: '#374A59'
        }));*/
        //right.body.immovable = true;

        var line1 = this.walls.create(game.world.width/3,128,box({
            length: 16,
            width: game.world.height - game.world.height /4,
            color: '#374A59'
        }));
        line1.body.immovable = true;

        var line2 = this.walls.create(game.world.width-200,0,box({
            length: 16,
            width: game.world.height - game.world.height /3,
            color: '#374A59'
        }));
        line2.body.immovable = true;


    },
    update: function(){

        game.physics.arcade.overlap(this.player,this.walls,this.handlePlayerDeath,null,this);
        ;
        collide1= game.physics.arcade.collide(this.player,this.walls);
        


        var speed =250;
        this.player.body.velocity.y =0;
        this.player.body.velocity.x =0;
 
        

        if (this.cursor.up.isDown){
            this.player.body.velocity.y -= speed;
            if( !collide1){
                this.player.score++;
                labelScore1.text = 'score p1:'+ this.player.score+' lives:'+this.player.lives;  
            };
        }else if (this.cursor.down.isDown) {
            this.player.body.velocity.y += speed;
            if( !collide1){
                this.player.score++;
                labelScore1.text = 'score p1:'+ this.player.score+' lives:'+this.player.lives;  
            };
        };
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x -= speed;
            if( !collide1){
                this.player.score++;
                labelScore1.text = 'score p1:'+ this.player.score+' lives:'+this.player.lives;  
            };
        }else if (this.cursor.right.isDown) {
            this.player.body.velocity.x += speed;
            if( !collide1){
                this.player.score++;
                labelScore1.text = 'score p1:'+ this.player.score+' lives:'+this.player.lives;  
            };
        };
        if (isp2) {
            game.physics.arcade.overlap(this.player2,this.walls,this.handlePlayerDeath,null,this)
            collide2= game.physics.arcade.collide(this.player2,this.walls);
            this.player2.body.velocity.y =0;
            this.player2.body.velocity.x =0;
            if (this.cursor2.up.isDown){
                this.player2.body.velocity.y -= speed;
                if( !collide2){
                    this.player2.score++;
                    labelScore2.text = 'score p2:'+ this.player2.score+' lives:'+this.player2.lives;  
                };
            }else if (this.cursor2.down.isDown) {
                this.player2.body.velocity.y += speed;
                if( !collide2){
                    this.player2.score++;
                    labelScore2.text = 'score p2:'+ this.player2.score+' lives:'+this.player2.lives;  
                };
            };
            if (this.cursor2.left.isDown) {
                this.player2.body.velocity.x -= speed;
                if( !collide2){
                    this.player2.score++;
                    labelScore2.text = 'score p2:'+ this.player2.score+' lives:'+this.player2.lives;   
                };
            }else if (this.cursor2.right.isDown) {
                this.player2.body.velocity.x += speed;
                if( !collide2){
                    this.player2.score++;
                    labelScore2.text = 'score p2:'+ this.player2.score+' lives:'+this.player2.lives;   
                };
            }   
        }

       


    },
    handlePlayerDeath: function(player,walls){
        player.revive();
        player.lives --;
        player.reset(64,64);
        console.log(player.lives);
        if(player.lives == 0){
            player.kill();
            music.stop();
            game.state.start("gameOver");
        }
       
    }
};

gameOverState = {
    create: function(){
        game.stage.backgroundColor = '#000';
        label = game.add.text(game.world.width/2,game.world.height/4,'GAME OVER\nPress SPACE to restart',{
            font: '40px Arial',
            fill: '#fff',
            align: 'center'
        });
        labe2 = game.add.text(game.world.width/2,game.world.height/2,labelScore1.text,{
            font: '40px Arial',
            fill: '#fff',
            align: 'center'
        });
        if(isp2){
            labe3 = game.add.text(game.world.width/2,game.world.height -game.world.height/4,labelScore2.text,{
                font: '40px Arial',
                fill: '#fff',
                align: 'center'
            });
            labe3.anchor.setTo(0.5,0.5);
        }

        label.anchor.setTo(0.5,0.5);
        labe2.anchor.setTo(0.5,0.5);

        this.spacebar = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },
    update: function(){
        if(this.spacebar.isDown){
        
            game.state.start('start');
        }

    }
};
MenuStartState = {

    preload: function () {
        game.load.audio('mainMusic','/assets/audio/music/Arcade_Funk.mp3');
    },

    create: function(){
        music = game.add.audio('mainMusic');
        music.volume = 0.2;
        music.play();
        var isp2 = true;
        this.focused = 0;

        this.keyboard = this.game.input.keyboard;

        this.controls = this.keyboard.addKeys({
            up: Phaser.Keyboard.UP,
            down: Phaser.Keyboard.DOWN,
            left: Phaser.Keyboard.LEFT,
            right: Phaser.Keyboard.RIGHT,
            interact: Phaser.Keyboard.SPACEBAR
        });

        this.game.add.text(20, 20, this.heading, config.textStyle);

        this.menuItems = [];

        for (let i = 0; i < mainMenu.length; i++) {
            let options,
                menuItem;

            options = mainMenu[i];

            menuItem = new MenuItem(this.game, 20, (((i + 1) * 40) + 40), options.text, options.targetState,options.ispl2, options.value, options.options, options.configProperty);

            this.menuItems.push(menuItem);
        };

        this.menuItems[this.focused].focus(true);

        this.controls.interact.onDown.add(this.activateFocusedItem, this);
        this.controls.up.onDown.add(this.selectItem, this, 0, -1);
        this.controls.down.onDown.add(this.selectItem, this, 0, 1);
        this.controls.left.onDown.add(this.selectOption, this, 0, -1);
        this.controls.right.onDown.add(this.selectOption, this, 0, 1);


        label = game.add.text(game.world.width/2,50, 'Test Game',{
            font:'40px monospace',
            fill: '#fff',
            align: 'center'
        });

        label.anchor.setTo(0.5,0);

    },
    update: function(){

    },

    selectItem: function(key, delta) {
        this.menuItems[this.focused].focus(false);

        this.focused += delta;

        if (this.focused >= this.menuItems.length) {
            this.focused -= this.menuItems.length;
        } else if (this.focused < 0) {
            this.focused += this.menuItems.length;
        }

        this.menuItems[this.focused].focus(true);
    },

    selectOption: function(key, delta) {
        let menuItem;

        menuItem = this.menuItems[this.focused];
        menuItem.value += delta;

        if (menuItem.value >= menuItem.options.length) {
            menuItem.value -= menuItem.options.length;
        } else if (menuItem.value < 0) {
            menuItem.value += menuItem.options.length;
        }

        menuItem.select();
    },

    activateFocusedItem: function() {
        this.menuItems[this.focused].navigate();
    }

}

class MenuItem extends Phaser.Text {
    constructor(game, x, y, text, targetState,ispl2, value, options, configProperty, focused = false) {
        super(game, x, y, text, config.textStyle);

        this.baseText = text;
        this.targetState = targetState;
        this.ispl2 = ispl2;
        this.value = config[configProperty] >= 0 ? config[configProperty] : value;
        this.options = options;
        this.configProperty = configProperty;
        this.focused = focused;

        if (this.value >= 0) {
            this.text += this.options[this.value];
        }

        this.game.world.addChild(this);
    }

    focus(focused) {
        if (focused) {
            this.focused = true;
            this.setStyle(config.textStyleFocused);
        } else {
            this.focused = false;
            this.setStyle(config.textStyle);
        }
    }

    navigate() {
        if (this.targetState) {
            if(this.ispl2=='true'){
                isp2 = true;
            } if (this.ispl2 =='false'){
                isp2 = false;
            }
            music.stop();
            this.game.state.start(this.targetState);
        }
    }

    select() {
        this.text = this.baseText + this.options[this.value];
        config[this.configProperty] = this.value;
    }
}
game.state.add('start',MenuStartState);
game.state.add('gameOver',gameOverState);
game.state.add('main', mainState);
game.state.start('start');
