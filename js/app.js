var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
//Add extra lives
var lives = 3;
var livesText;
//Text when you lose a life
var lifeLostText;
var isPlaying = false;
var startButton;

const ASSETS = ['assets/ball.png', 'assets/ball.png', 'assets/paddle.png', 'assets/brick.png'];
const ASSET_NAME = ['ball', 'ball2', 'paddle', 'brick'];

/**
 * Load the ball,paddle,brick,start button assets 
 */
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = 'grey';
    
    ASSETS.foreach((asset, index) => {
        game.load.image(ASSET_NAME[index], asset);
    });
    // add button separately
    game.load.spritesheet('button', 'assets/button.png', 120, 40);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
    ball1 = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball1');
    ball.anchor.set(0.5);
    ball1.anchor.set(1.0);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    game.physics.enable(ball1, Phaser.Physics.ARCADE);
    ball.body.velocity.set(150, -150);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    //Win - lose conditions
    ball.events.onOutOfBounds.add(function() {
        alert('Game over!');
        location.reload();
    }, this);

    paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;

    initBricks();
    textStyle = { font: '18px Roboto', fill: '#0095DD' };
    scoreText = game.add.text(5, 5, 'Points: 0', textStyle);
    livesText = game.add.text(game.world.width-5, 5, 'Lives: '+lives, textStyle);
    livesText.anchor.set(1,0);
    lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, tap to continue', textStyle);
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;
    startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
    startButton.anchor.set(0.5);
}

function update() {
    game.physics.arcade.collide(ball, paddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if(isPlaying){
        paddle.x = game.input.x || game.world.width * 0.5;
    }
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
    bricks = game.add.group();
    for (c = 0; c < brickInfo.count.col; c++) {
        for (r = 0; r < brickInfo.count.row; r++) {
            var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
            var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
            newBrick = game.add.sprite(brickX, brickY, 'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}

function ballHitBrick(ball, brick) {
    var killTween = game.add.tween(brick.scale);
    killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function(){
        brick.kill();
    }, this);
    killTween.start();
    score += 10;
    scoreText.setText('Points: '+ score);
    if(score === brickInfo.count.row * brickInfo.count.col * 10) {
        alert('You won the game, congratulations!');
        location.reload();
    }
}

function ballLeaveScreen() {
    lives--;
    if(lives) {
        livesText.setText('Lives: '+lives);
        lifeLostText.visible = true;
        ball.reset(game.world.width * 0.5, game.world.height - 25);
        paddle.reset(game.world.width * 0.5, game.world.height - 5);
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    }
    else {
        alert('You lost, game over!');
        location.reload();
    }
}

function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    isPlaying = true;
}
//little bit of tweem and ball bounce calcs
function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
    ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x)
}

