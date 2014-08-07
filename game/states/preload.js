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

        this.loadBackground = this.add.sprite(0, 0, 'preload_background');
        this.logo = this.add.sprite(480, 288, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.asset = this.add.sprite(480, 544, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        
        // load menu screen objects
        this.load.image('menu_background', 'assets/textures/menu_screen_background.png');
        this.load.image('menu_title', 'assets/textures/game_title.png');
        this.load.image('menu_play_button', 'assets/textures/menu_screen_button.png');
        this.load.image('menu_help_button', 'assets/textures/menu_screen_help_button.png');

        // load level menu screen objects
        this.load.image('level_menu_bg', 'assets/level_menu_background.png');
        this.load.image('level_menu_btn', 'assets/level_menu_button.png');

        this.load.tilemap('meetup_map', 'assets/tilemaps/meetup_game.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_2', 'assets/tilemaps/meetup_game_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_3', 'assets/tilemaps/meetup_game_3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_4', 'assets/tilemaps/meetup_game_4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_5', 'assets/tilemaps/meetup_game_5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('meetup_tileset', 'assets/textures/tileset.png');

        // load UI buttons
        this.load.image('menu_button', 'assets/textures/to_main_menu.png');
        this.load.image('level_menu_button', 'assets/textures/to_level_menu.png');
        this.load.image('next_button', 'assets/textures/to_next_level.png');
        this.load.image('previous_button', 'assets/textures/to_previous_level.png');
        this.load.image('continue_button', 'assets/textures/continue_button.png');
        this.load.image('exit_button', 'assets/textures/exit_button.png');
        this.load.image('pause_button', 'assets/textures/pause_button.png');
        this.load.image('replay_button', 'assets/textures/replay_button.png');

        this.load.image('level_one', 'assets/textures/level_one.png');
        this.load.image('level_two', 'assets/textures/level_two.png');

        this.load.spritesheet('arrow', 'assets/textures/arrow_panel.png', 64, 64, 24);
        this.load.spritesheet('player_one', 'assets/textures/player_one.png', 64, 64, 32);
        
        this.load.spritesheet('basic_enemy', 'assets/textures/basic_enemy.png', 64, 64, 28);

        this.load.audio('forest_melody', ['assets/music/forest_melody.mp3', 'assets/music/forest_melody.ogg']);
        this.load.audio('arrow', 'assets/sound/arrow.ogg');
        this.load.audio('button', 'assets/sound/button.ogg');
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
