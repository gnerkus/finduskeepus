(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// global variables
window.onload = function () {
	var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'gem-get');

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('gameover', require('./states/gameover'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));

	game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){
'use strict';

function Boot() {

}

Boot.prototype = {
	preload: function () {
		this.load.image('preloader', 'assets/preloader.gif');
	},
	create: function () {
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');
	}
};

module.exports = Boot;

},{}],3:[function(require,module,exports){
'use strict';

function GameOver() {

}

GameOver.prototype = {
	preload: function () {

	},
	create: function () {
		var style = {font: '65px Arial', fill: '#ffffff', align: 'center'};
		this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
		this.titleText.anchor.setTo(0.5, 0.5);

		this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', style);
		this.congratsText.anchor.setTo(0.5, 0.5);

		this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click to play again!', style);
		this.instructionText.anchor.setTo(0.5, 0.5);
	},
	update: function () {
		if (this.game.input.activePointer.justPressed()) {
			this.game.state.start('play');
		}
	}
};

module.exports = GameOver;

},{}],4:[function(require,module,exports){
'use strict';
function Menu() {

}

Menu.prototype = {
	preload: function () {

	},
	create: function () {
		this.startButton = this.game.add.button(this.game.width / 2, 300, 'blue',
			this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	},
	startClick: function () {
		this.game.state.start('play');
	},
	update: function () {

	}
};

module.exports = Menu;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

function Preload() {
	this.asset = null;
	this.ready = false;
}

Preload.prototype = {
	preload: function () {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        this.load.tilemap('meetup_map', 'assets/tilemaps/meetup_map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('meetup_tileset', 'assets/textures/tileset.png');
        this.load.image('player_one-select', 'assets/textures/player_one-select.png');
        this.load.image('player_two-select', 'assets/textures/player_two-select.png');
        this.load.spritesheet('arrow', 'assets/textures/arrow.png', 64, 64, 24);
        this.load.spritesheet('player_one', 'assets/textures/player_one.png', 48, 48, 24);
        this.load.spritesheet('player_two', 'assets/textures/player_two.png', 48, 48, 24);
        this.load.spritesheet('yellow_enemy', 'assets/textures/yellow_enemy.png', 48, 48, 20);
	    },
	create: function () {
		this.asset.cropEnabled = false;
	},
	update: function () {
		if (!!this.ready) {
			this.game.state.start('menu');
		}
	},
	onLoadComplete: function () {
		this.ready = true;
	}
};

module.exports = Preload;

},{}]},{},[1])