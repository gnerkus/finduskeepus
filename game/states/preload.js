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
