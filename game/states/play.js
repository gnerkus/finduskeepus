'use strict';
var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');


function Play() {

}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.panel = new Panel(this.game, this.game.width / 2, this.game.height / 2);
        this.panel.addDirections ([0, 1, 2, 3]);
        console.log('Added panel to game.');
        console.log(this.panel);

        this.game.add.existing(this.panel);

        this.player = new Player(this.game, this.game.width / 2, 32);
        console.log('Added player to game.');
        console.log(this.player);

        this.game.add.existing(this.player);


	    },
	update: function () {
        this.game.physics.arcade.overlap(this.player, this.panel, this.shareBehaviours, null, this);

	},

    shareBehaviours: function (player, panel) {
        player.changeState(panel.getBehaviour());
        console.log(this.panel);
        console.log(this.player);
    }
};

module.exports = Play;
