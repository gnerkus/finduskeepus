'use strict';

// * move to Success when user causes both players to collide with themselves
// * show pauseOverlay when 'pause' button is clicked
// * move to Play when user causes a player to collide with an enemy. 

var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');
var BasicEnemy = require('../prefabs/basicEnemy');


function Play() {

}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.map = this.game.add.tilemap(this.game.meetupLevels[this.game.currentLevel - 1].map);
        this.map.addTilesetImage(this.game.meetupLevels[this.game.currentLevel - 1].tileset);
        this.layer = this.map.createLayer('Floor');
        this.layer.resizeWorld();

        this.detectors = this.game.add.group(); 

        this.arrowPanels = this.game.add.group();
        this.map.createFromObjects('Arrows', 10, 'arrow', null, true, false, this.arrowPanels, Panel, true);
        this.arrowPanels.forEach(function (panel) {
           panel.addDirections(panel.directions);
        });

        this.player = new Player(this.game, 96, 96);
        console.log('Added player to game.');
        console.log(this.player);

        this.game.add.existing(this.player);

        this.detectors.add(this.player.detector);
        console.log(this.detectors);

        this.playerTwo = new Player(this.game, 736, 480);
        console.log('Added player to game.');
        console.log(this.player);

        this.game.add.existing(this.playerTwo);

        this.detectors.add(this.playerTwo.detector);
        console.log(this.detectors);

        this.enemy = new BasicEnemy(this.game, 352, 480);
        console.log('Added enemy to game.');
        console.log(this.enemy);

        this.game.add.existing(this.enemy);

        this.detectors.add(this.enemy.detector);
        console.log(this.detectors);

	    },
	update: function () {
        this.game.physics.arcade.overlap(this.detectors, this.arrowPanels, this.shareBehaviours, null, this);
        this.game.physics.arcade.collide(this.player, this.playerTwo, this.levelClear, null, this);
        this.game.physics.arcade.collide(this.player, this.enemy, this.levelFail, null, this);
        this.game.physics.arcade.collide(this.playerTwo, this.enemy, this.levelFail, null, this);
	},

    shareBehaviours: function (detector, panel) {
        detector.player.changeState(panel.getBehaviour());
        console.log(panel);
        console.log(detector);
    },

    levelClear: function (playerOne, playerTwo) {
        this.game.state.start('success');
    },

    levelFail: function (player, enemy) {
        this.game.state.start('play');
    }
};

module.exports = Play;
