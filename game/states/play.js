'use strict';
var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');


function Play() {

}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.map = this.game.add.tilemap('meetup_map');
        this.map.addTilesetImage('meetup_tileset');
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

	    },
	update: function () {
        this.game.physics.arcade.overlap(this.detectors, this.arrowPanels, this.shareBehaviours, null, this);

	},

    shareBehaviours: function (detector, panel) {
        detector.player.changeState(panel.getBehaviour());
        console.log(panel);
        console.log(detector);
    }
};

module.exports = Play;
