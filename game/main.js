'use strict';

// global variables
window.onload = function () {
	var game = new Phaser.Game(960, 576, Phaser.AUTO, 'meetup');
    

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('level-menu', require('./states/level-menu'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));
	game.state.add('success', require('./states/success'));

	game.state.start('boot');

};