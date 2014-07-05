'use strict';
var dir = ['right', 'down', 'left', 'up'];
var directionToAngle = {
    'right': 0,
    'down': 90,
    'left': 180,
    'up': 270
};
var map;
var layer;
var player;
var playerTwo;
var enemy;
var detector;
var detectorTwo;
var enemyDetector;
var arrows;
var topLeftArrows;
var topArrows;
var topRightArrows;
var markers;

function Play() {
    
}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics

        map = this.game.add.tilemap('meetup_map');

        map.addTilesetImage('meetup_tileset');

        layer = map.createLayer('Floor');

        // layer.resizeWorld();

        ////////// REGULAR ARROWS ////////////////
        arrows = this.game.add.group();
        arrows.enableBody = true;

        map.createFromObjects('Regular-Arrows', 10, 'arrow', 0, true, false, arrows);

        arrows.forEach(function (panel) {
            panel.dirList = ['right', 'down', 'left', 'up'];
            panel.animations.add('right', [0, 1, 2, 3, 4, 5]);
            panel.animations.add('down', [6, 7, 8, 9, 10, 11]);
            panel.animations.add('left', [12, 13, 14, 15, 16, 17]);
            panel.animations.add('up', [18, 19, 20, 21, 22, 23]);
            panel.dirCode = 0;
            panel.animations.play(panel.dirList[panel.dirCode]);
            panel.body.setSize(8, 8, 28, 28);
            panel.canClick = true;
            panel.inputEnabled = true;
            panel.events.onInputDown.add(this.rotate, this);
            panel.marker = null;
			panel.timer = this.game.time.create(false);
          }, this, false);


        ////////// TOP_LEFT ARROWS ////////////////
        topLeftArrows = this.game.add.group();
        topLeftArrows.enableBody = true;

        map.createFromObjects('Top-Left-Arrows', 2, 'arrow', 0, true, false, topLeftArrows);

        topLeftArrows.forEach(function (panel) {
            panel.dirList = ['right', 'down'];
            panel.animations.add('right', [0, 1, 2, 3, 4, 5]);
            panel.animations.add('down', [6, 7, 8, 9, 10, 11]);
            panel.animations.add('left', [12, 13, 14, 15, 16, 17]);
            panel.animations.add('up', [18, 19, 20, 21, 22, 23]);
            panel.dirCode = 0;
            panel.animations.play(panel.dirList[panel.dirCode]);
            panel.body.setSize(8, 8, 28, 28);
            panel.canClick = true;
            panel.inputEnabled = true;
            panel.events.onInputDown.add(this.rotate, this);
            panel.marker = null;
            panel.timer = this.game.time.create(false);
          }, this, false);


        ////////// TOP ARROWS ////////////////
        topArrows = this.game.add.group();
        topArrows.enableBody = true;

        map.createFromObjects('Top-Arrows', 7, 'arrow', 0, true, false, topArrows);

        topArrows.forEach(function (panel) {
            panel.dirList = ['right', 'down', 'left'];
            panel.animations.add('right', [0, 1, 2, 3, 4, 5]);
            panel.animations.add('down', [6, 7, 8, 9, 10, 11]);
            panel.animations.add('left', [12, 13, 14, 15, 16, 17]);
            panel.animations.add('up', [18, 19, 20, 21, 22, 23]);
            panel.dirCode = 0;
            panel.animations.play(panel.dirList[panel.dirCode]);
            panel.body.setSize(8, 8, 28, 28);
            panel.canClick = true;
            panel.inputEnabled = true;
            panel.events.onInputDown.add(this.rotate, this);
            panel.marker = null;
            panel.timer = this.game.time.create(false);
          }, this, false);


        ////////// TOP RIGHT ARROWS ////////////////
        topRightArrows = this.game.add.group();
        topRightArrows.enableBody = true;

        map.createFromObjects('Top-Right-Arrows', 3, 'arrow', 0, true, false, topRightArrows);

        topRightArrows.forEach(function (panel) {
            panel.dirList = ['left', 'down'];
            panel.animations.add('right', [0, 1, 2, 3, 4, 5]);
            panel.animations.add('down', [6, 7, 8, 9, 10, 11]);
            panel.animations.add('left', [12, 13, 14, 15, 16, 17]);
            panel.animations.add('up', [18, 19, 20, 21, 22, 23]);
            panel.dirCode = 0;
            panel.animations.play(panel.dirList[panel.dirCode]);
            panel.body.setSize(8, 8, 28, 28);
            panel.canClick = true;
            panel.inputEnabled = true;
            panel.events.onInputDown.add(this.rotate, this);
            panel.marker = null;
            panel.timer = this.game.time.create(false);
          }, this, false);

        player = this.game.add.sprite(32, 32, 'player_one');
        player.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(player);
        player.angle = 0;
        player.animations.add('right', [0, 1, 2, 3, 4, 5]);
        player.animations.add('down', [6, 7, 8, 9, 10, 11]);
        player.animations.add('left', [12, 13, 14, 15, 16, 17]);
        player.animations.add('up', [18, 19, 20, 21, 22, 23]);
        player.animations.play(dir[0], 6, true);

        detector = this.game.add.sprite(player.x, player.y, 'detector');
        this.game.physics.enable(detector);
        detector.player = player;
        detector.angle = player.angle;



        playerTwo = this.game.add.sprite(928, 32, 'player_two');
        playerTwo.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(playerTwo);
        playerTwo.angle = 180;
        playerTwo.animations.add('right', [0, 1, 2, 3, 4, 5]);
        playerTwo.animations.add('down', [6, 7, 8, 9, 10, 11]);
        playerTwo.animations.add('left', [12, 13, 14, 15, 16, 17]);
        playerTwo.animations.add('up', [18, 19, 20, 21, 22, 23]);
        playerTwo.animations.play(dir[2], 6, true);

        detectorTwo = this.game.add.sprite(playerTwo.x, playerTwo.y, 'detector');
        this.game.physics.enable(detectorTwo);
        detectorTwo.player = playerTwo;
        detectorTwo.angle = playerTwo.angle;

        markers = this.game.add.group();
	    },
	update: function () {
        this.game.physics.arcade.velocityFromAngle(player.angle, 64, player.body.velocity);
        this.game.physics.arcade.velocityFromAngle(detector.angle, 64, detector.body.velocity);

        this.game.physics.arcade.velocityFromAngle(playerTwo.angle, 64, playerTwo.body.velocity);
        this.game.physics.arcade.velocityFromAngle(detectorTwo.angle, 64, detectorTwo.body.velocity);

        this.game.physics.arcade.overlap(detector, arrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topRightArrows, this.detectorOnPanel, null, this);

        this.game.physics.arcade.overlap(detectorTwo, arrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topRightArrows, this.detectorOnPanel, null, this);

		this.game.physics.arcade.collide(player, playerTwo, this.collisionHandler, null, this);

	    },
	detectorOnPanel: function (detectr, panel) {
        detectr.player.angle = directionToAngle[panel.dirList[panel.dirCode]];
        detectr.angle = directionToAngle[panel.dirList[panel.dirCode]];
        detectr.player.animations.play(panel.dirList[panel.dirCode], 6, true);
      },

  rotate: function (panel) {
		  if (panel.canClick) {
				panel.dirCode = (panel.dirCode >= panel.dirList.length - 1 ? 0 : panel.dirCode + 1);
				panel.animations.play(panel.dirList[panel.dirCode]);
				panel.canClick = false;
				panel.timer.add(Phaser.Timer.SECOND * 0.5, function () { panel.canClick = true; panel.marker.destroy(); }, this);
				panel.timer.start();
                panel.marker = markers.create(panel.x, panel.y, 'player_one-select');
			}

    },
	collisionHandler: function () {
		this.game.state.start('gameover');
	}
};

module.exports = Play;
