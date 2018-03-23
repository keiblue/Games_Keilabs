

var game = new Phaser.Game(500,500);



var box = function(options){
    var bmd =game.add.bitmapData(options.length,options.width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,options.length,options.width);
    bmd.ctx.fillStyle = options.color;
    bmd.ctx.fill();
    return bmd;
};

var mainState = {
    create: function(){
        game.stage.backgroundColor = '#BDC2C5';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        this.player = game.add.sprite(64,game.world.height-64,box({
            length: 32,
            width: 32,
            color: '#4F616E'
        }));

        this.player2 = game.add.sprite(128,game.world.height-64,box({
            length: 32,
            width: 32,
            color: '#A96262'
        }));

        this.player.score =0 ;
        this.player2.score =0;
        this.player.lives =3;
        this.player2.lives =3 ;

        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor2 = game.input.keyboard.addKeys( { 
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D } );

        this.player.body.collideWorldBounds =true;
        this.player2.body.collideWorldBounds =true;

        labelScore1 = game.add.text(20,20,'score p1:'+ this.player.score+' lives:'+this.player.lives,{
            font: '22px Arial',
            fill: '·fff',
            align: 'center'
        });

        labelScore2 = game.add.text(20,45, 'score p2:'+ this.player2.score+' lives:'+this.player2.lives ,{
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
        game.physics.arcade.overlap(this.player2,this.walls,this.handlePlayerDeath,null,this);
        collide1= game.physics.arcade.collide(this.player,this.walls);
        collide2= game.physics.arcade.collide(this.player2,this.walls);


        var speed =250;
        this.player.body.velocity.y =0;
        this.player.body.velocity.x =0;
 
        this.player2.body.velocity.y =0;
        this.player2.body.velocity.x =0;

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
        }

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

       


    },
    handlePlayerDeath: function(player,walls){
        player.revive();
        player.lives --;
        player.reset(64,64);
        console.log(player.lives);
        if(player.lives == 0){
            player.kill();
            game.state.start("gameOver");
        }
       
    }
};

gameOverState = {
    create: function(){

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
        labe3 = game.add.text(game.world.width/2,game.world.height -game.world.height/4,labelScore2.text,{
            font: '40px Arial',
            fill: '#fff',
            align: 'center'
        });
        label.anchor.setTo(0.5,0.5);
        labe2.anchor.setTo(0.5,0.5);
        labe3.anchor.setTo(0.5,0.5);
        this.spacebar = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    },
    update: function(){
        if(this.spacebar.isDown){
            game.state.start('main');
        }

    }
};
MenuStartState = {
    create: function(){
        var isp2 = true;
        label = game.add.text(game.world.width/2,game.world.height/2, 'Test Game',{
            font:'40px Arial',
            fill: '#fff',
            align: 'center'
        });
        label2 = game.add.text(game.world.width/2,game.world.height -game.world.height/3, 'players??',{
            font:'30px Arial',
            fill: '#fff',
            align: 'center'
        });
        label.anchor.setTo(0.5,0.5);
        label2.anchor.setTo(0.5,0.75);

   /* this.addMenuOption('singlePlayer', function () {
        isp2 = false;
      game.state.start("main");

    });
    this.addMenuOption('twoPlayers', function () {

      game.state.start("main");
    });*/
    },
    update: function(){

    }
}
game.state.add('start',MenuStartState);
game.state.add('gameOver',gameOverState);
game.state.add('main', mainState);
game.state.start('start');
