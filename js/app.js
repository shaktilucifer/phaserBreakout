var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

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
    
    //Paddle functions
    
    paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
    
}

function update() {
    
     ball.x += 1;
    ball.y += 1;
}
