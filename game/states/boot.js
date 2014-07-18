'use strict';

function Boot() {

}

Boot.prototype = {
	preload: function () {
		this.load.image('preloader', 'assets/preloader.gif');
	},
	create: function () {
		this.game.meetupLevels = [
            {
                map: 'meetup_map',
                asset: 'assets/tilemaps/meetup_game.json',
                tileset: 'meetup_tileset',
                layers: {
                    environment: 'Floor',
                    arrows: 'Arrows'
                },
                complete: false,
                stars: 0
            },

            {
                map: 'meetup_map_2',
                asset: 'assets/tilemaps/meetup_game_2.json',
                tileset: 'meetup_tileset',
                layers: {
                    environment: 'Floor',
                    arrows: 'Arrows'
                },
                complete: false,
                stars: 0
            }
		];
        this.game.currentLevel = 1;

		this.game.input.maxPointers = 1;
		this.game.state.start('preload');

		console.log(this.game.meetupLevels);
		console.log(this.game.meetupLevels[this.game.currentLevel - 1]);
	}
};

module.exports = Boot;
