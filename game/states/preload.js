'use strict';

// * move to Menu after assets have been loaded.

function Preload() {
	this.asset = null;
	this.ready = false;
}

Preload.prototype = {
	preload: function () {
		console.log(this.game.meetupLevels);
		console.log(this.game.currentLevel);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        this.load.tilemap('meetup_map', 'assets/tilemaps/meetup_game.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_2', 'assets/tilemaps/meetup_game_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('meetup_tileset', 'assets/textures/tileset.png');

        this.load.image('menu_button', 'assets/textures/to_main_menu.png');
        this.load.image('next_button', 'assets/textures/to_next_level.png');
        this.load.image('previous_button', 'assets/textures/to_previous_level.png');

        this.load.image('level_one', 'assets/textures/level_one.png');
        this.load.image('level_two', 'assets/textures/level_two.png');

        this.load.spritesheet('arrow', 'assets/textures/arrow_panel.png', 64, 64, 24);
        this.load.spritesheet('player_one', 'assets/textures/player_one.png', 64, 64, 32);
        
        this.load.spritesheet('basic_enemy', 'assets/textures/basic_enemy.png', 64, 64, 28);
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
