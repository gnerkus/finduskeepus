'use strict';

function Boot() {

}

Boot.prototype = {
	preload: function () {
		this.load.image('preloader', 'assets/preloader.gif');
        this.load.image('preload_background', 'assets/loader_bg.png');
        this.load.image('logo', 'assets/logo.png');
	},
	create: function () {
        this.game.currentChapter = 0;
        this.game.chapters = [
            {
                chapterNumber: 1,
                title: 'the woods',
                currentLevel: 0,
                levels: [
                    {
                        levelNumber: 1,
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
                        levelNumber: 2,
                        map: 'meetup_map_2',
                        asset: 'assets/tilemaps/meetup_game_2.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 3,
                        map: 'meetup_map_3',
                        asset: 'assets/tilemaps/meetup_game_3.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 4,
                        map: 'meetup_map_4',
                        asset: 'assets/tilemaps/meetup_game_4.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 5,
                        map: 'meetup_map_5',
                        asset: 'assets/tilemaps/meetup_game_5.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },
                ]
            },

            {
                chapterNumber: 2,
                title: 'woods at night',
                currentLevel: 0,
                levels: []
            }
        ];
		
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');

	}
};

module.exports = Boot;
