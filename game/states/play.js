'use strict';
var dir = ['right', 'down', 'left', 'up'];
var directionToAngle = {
    'right': 0,
    'down': 90,
    'left': 180,
    'up': 270
};
var health = 100;
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
var rightArrows;
var bottomRightArrows;
var bottomArrows;
var bottomLeftArrows;
var leftArrows;
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

        ////////// RIGHT ARROWS ////////////////
        rightArrows = this.game.add.group();
        rightArrows.enableBody = true;

        map.createFromObjects('Right-Arrows', 8, 'arrow', 0, true, false, rightArrows);

        rightArrows.forEach(function (panel) {
            panel.dirList = ['down', 'left', 'up'];
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


        ////////// BOTTOM RIGHT ARROWS ////////////////
        bottomRightArrows = this.game.add.group();
        bottomRightArrows.enableBody = true;

        map.createFromObjects('Bottom-Right-Arrows', 4, 'arrow', 0, true, false, bottomRightArrows);

        bottomRightArrows.forEach(function (panel) {
            panel.dirList = ['up', 'left'];
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


        ////////// BOTTOM ARROWS ////////////////
        bottomArrows = this.game.add.group();
        bottomArrows.enableBody = true;

        map.createFromObjects('Bottom-Arrows', 9, 'arrow', 0, true, false, bottomArrows);

        bottomArrows.forEach(function (panel) {
            panel.dirList = ['left', 'up', 'right'];
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

        ////////// BOTTOM LEFT ARROWS ////////////////
        bottomLeftArrows = this.game.add.group();
        bottomLeftArrows.enableBody = true;

        map.createFromObjects('Bottom-Left-Arrows', 5, 'arrow', 0, true, false, bottomLeftArrows);

        bottomLeftArrows.forEach(function (panel) {
            panel.dirList = ['up', 'right'];
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

        ////////// LEFT ARROWS ////////////////
        leftArrows = this.game.add.group();
        leftArrows.enableBody = true;

        map.createFromObjects('Left-Arrows', 10, 'arrow', 0, true, false, leftArrows);

        leftArrows.forEach(function (panel) {
            panel.dirList = ['up', 'right', 'down'];
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

        enemy = this.game.add.sprite(288, 288, 'yellow_enemy');
        enemy.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(enemy);
        enemy.angle = 180;
        enemy.animations.add('right', [0, 1, 2, 3, 4]);
        enemy.animations.add('down', [5, 6, 7, 8, 9]);
        enemy.animations.add('left', [10, 11, 12, 13, 14]);
        enemy.animations.add('up', [15, 16, 17, 18, 19]);
        enemy.animations.play(dir[2], 6, true);

        enemyDetector = this.game.add.sprite(enemy.x, enemy.y, 'detector');
        this.game.physics.enable(enemyDetector);
        enemyDetector.player = enemy;
        enemyDetector.angle = enemy.angle;

        markers = this.game.add.group();
	    },
	update: function () {
        this.game.physics.arcade.velocityFromAngle(player.angle, 64, player.body.velocity);
        this.game.physics.arcade.velocityFromAngle(detector.angle, 64, detector.body.velocity);

        this.game.physics.arcade.velocityFromAngle(playerTwo.angle, 64, playerTwo.body.velocity);
        this.game.physics.arcade.velocityFromAngle(detectorTwo.angle, 64, detectorTwo.body.velocity);

        this.game.physics.arcade.velocityFromAngle(enemy.angle, 64, enemy.body.velocity);
        this.game.physics.arcade.velocityFromAngle(enemyDetector.angle, 64, enemyDetector.body.velocity);

        this.game.physics.arcade.overlap(detector, arrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, topRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, rightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, bottomRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, bottomArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, bottomLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detector, leftArrows, this.detectorOnPanel, null, this);


        this.game.physics.arcade.overlap(detectorTwo, arrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, topRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, rightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, bottomRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, bottomArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, bottomLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(detectorTwo, leftArrows, this.detectorOnPanel, null, this);


        this.game.physics.arcade.overlap(enemyDetector, arrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, topLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, topArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, topRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, rightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, bottomRightArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, bottomArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, bottomLeftArrows, this.detectorOnPanel, null, this);
        this.game.physics.arcade.overlap(enemyDetector, leftArrows, this.detectorOnPanel, null, this);


        this.game.physics.arcade.collide(player, playerTwo, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(player, enemy, this.collisionHandler, null, this);
		this.game.physics.arcade.collide(playerTwo, enemy, this.collisionHandler, null, this);

	    },
	detectorOnPanel: function (detectr, panel) {
        detectr.player.angle = directionToAngle[panel.dirList[panel.dirCode]];
        detectr.angle = directionToAngle[panel.dirList[panel.dirCode]];
        detectr.player.animations.play(panel.dirList[panel.dirCode], 6, true);
      },

  rotate: function (panel) {
		  if (panel.canClick && health > 0) {
                health -= 20;
				panel.dirCode = (panel.dirCode >= panel.dirList.length - 1 ? 0 : panel.dirCode + 1);
				panel.animations.play(panel.dirList[panel.dirCode]);
				panel.canClick = false;
				panel.timer.add(Phaser.Timer.SECOND * 0.25, function () { panel.canClick = true; panel.marker.destroy(); health += 20; }, this);
				panel.timer.start();
                panel.marker = markers.create(panel.x, panel.y, 'player_one-select');
			}

    },
	collisionHandler: function () {
		this.game.state.start('gameover');
	}
};

module.exports = Play;
