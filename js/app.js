var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = 'grey';
    //TO DO add paddle image 
    game.load.image('paddle', 'img/paddle.png');

}

function create() {
     var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF0000, 1);
    ball = graphics.drawCircle(300, 300, 100);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.set(150, 150);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ///Win lose conditions
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(function(){
        alert('Game over!');
        location.reload();
    }, this);
    //Paddle functions
    
    paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
    
}

function update() {
     game.physics.arcade.collide(ball, paddle);
    paddle.x = game.input.x || game.world.width*0.5;
}

function initBricks() {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };
}
