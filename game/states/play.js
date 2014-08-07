'use strict';

// * move to Success when user causes both players to collide with themselves
// * show pauseOverlay when 'pause' button is clicked
// * move to Play when user causes a player to collide with an enemy. 

var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');
var BasicEnemy = require('../prefabs/basicEnemy');
var detectors = null;

function Play() {

}

Play.prototype = {
	create: function () {
        this.chapter = this.game.chapters[this.game.currentChapter];
        this.level = this.chapter.levels[this.chapter.currentLevel];

        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.map = this.game.add.tilemap(this.level.map);
        this.map.addTilesetImage(this.level.tileset);
        this.layer = this.map.createLayer('Floor');
        this.layer.resizeWorld();

        detectors = this.game.add.group(); 

        this.arrowPanels = this.game.add.group();
        this.map.createFromObjects('Arrows', 10, 'arrow', null, true, false, this.arrowPanels, Panel, true);
        this.arrowPanels.forEach(function (panel) {
           panel.addDirections(panel.directions);
        });

        this.players = this.game.add.group();
        this.map.createFromObjects('Players', 9, null, null, true, false, this.players, Player, false);
        this.players.forEach(function (player) {
           detectors.add(player.detector);
        });

        this.enemies = this.game.add.group();
        this.map.createFromObjects('Enemies', 11, null, null, true, false, this.enemies, BasicEnemy, false);
        this.enemies.forEach(function (enemy) {
           detectors.add(enemy.detector);
        });

        this.music = this.game.add.audio('forest_melody');
        this.music.play();

        
	    },
	update: function () {
        this.game.physics.arcade.overlap(detectors, this.arrowPanels, this.shareBehaviours, null, this);
        this.game.physics.arcade.collide(this.players, this.players, this.levelClear, null, this);
        this.game.physics.arcade.collide(this.players, this.enemies, this.levelFail, null, this);
	},

    shareBehaviours: function (detector, panel) {
        detector.player.changeState(panel.getBehaviour());
        console.log(panel);
        console.log(detector);
    },

    levelClear: function (playerOne, playerTwo) {
        this.music.stop();
        this.game.state.start('success');
    },

    levelFail: function (player, enemy) {
        this.music.stop();
        this.game.state.start('play');
    }
};

module.exports = Play;
