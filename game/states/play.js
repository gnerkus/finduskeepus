'use strict';
var dir = ['right', 'down', 'left', 'up'];
var map;
var layer;
var player;
var detector;
var coin;
var coinDetector;
var arrows;

function Play() {

}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics

        map = this.game.add.tilemap('map');

        map.addTilesetImage('tileset');

        layer = map.createLayer('Floor');

        layer.resizeWorld();

        arrows = this.game.add.group();
        arrows.enableBody = true;

        map.createFromObjects('Arrows', 1, 'panel', 0, true, false, arrows);

        arrows.forEach(function (panel) {
            panel.animations.add('right', [0]);
            panel.animations.add('down', [1]);
            panel.animations.add('left', [2]);
            panel.animations.add('up', [3]);
            panel.animations.play(dir[panel.dirCode]);
            panel.body.setSize(4, 4, 22, 22);
						panel.canClick = true;
            panel.direction = {x: 1, y: 0};
            panel.dirCode = 0;
            panel.inputEnabled = true;
            panel.events.onInputDown.add(this.rotate, this);
						panel.timer = this.game.time.create(false);
          }, this, false);

        player = this.game.add.sprite(24, 24, 'blue');
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(player);
        player.angle = 0;

        detector = this.game.add.sprite(player.x, player.y, 'detector');
        this.game.physics.enable(detector);
        detector.player = player;
        detector.angle = player.angle;

        coin = this.game.add.sprite(216, 216, 'yellow');
        coin.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(coin);
        coin.angle = 0;

        coinDetector = this.game.add.sprite(coin.x, coin.y, 'detector');
        this.game.physics.enable(coinDetector);
        coinDetector.player = coin;
        coinDetector.angle = coin.angle;
	    },
	update: function () {
        this.game.physics.arcade.velocityFromAngle(player.angle, 48, player.body.velocity);
        this.game.physics.arcade.velocityFromAngle(detector.angle, 48, detector.body.velocity);
        this.game.physics.arcade.overlap(detector, arrows, this.detectorOnPanel, null, this);

        this.game.physics.arcade.velocityFromAngle(coin.angle, 48, coin.body.velocity);
        this.game.physics.arcade.velocityFromAngle(coinDetector.angle, 48, coinDetector.body.velocity);
        this.game.physics.arcade.overlap(coinDetector, arrows, this.detectorOnPanel, null, this);

				this.game.physics.arcade.collide(player, coin, this.collisionHandler, null, this);

	    },
	detectorOnPanel: function (detectr, panel) {
        detectr.player.angle = panel.dirCode * 90;
        detectr.angle = panel.dirCode * 90;
      },

  rotate: function (panel) {
		  if (panel.canClick) {
				panel.dirCode = (panel.dirCode >= 3 ? 0 : panel.dirCode + 1);
				panel.animations.play(dir[panel.dirCode]);
				panel.canClick = false;
				panel.timer.add(Phaser.Timer.SECOND, function () { panel.canClick = true; }, this);
				panel.timer.start();
			}

    },
	collisionHandler: function () {
		this.game.state.start('gameover');
	}
};

module.exports = Play;
