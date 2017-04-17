var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = 'grey';
}

function create() {
     var graphics = game.add.graphics(0, 0);

    // graphics.lineStyle(2, 0xffd900, 1);

    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(300, 300, 100);

}

function update() {
}
