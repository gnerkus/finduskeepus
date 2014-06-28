(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// global variables
window.onload = function () {
	var game = new Phaser.Game(432, 432, Phaser.AUTO, 'gem-get');

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

        this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('green', 'assets/textures/green.png');
        this.load.image('red', 'assets/textures/red.png');
        this.load.image('yellow', 'assets/textures/yellow.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('tileset', 'assets/textures/tileset.png');
        this.load.spritesheet('panel', 'assets/textures/panel_sheet.png', 48, 48, 4);
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