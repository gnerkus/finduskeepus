'use strict';

// * move to LevelMenu when user clicks 'play'

function Menu() {

}

Menu.prototype = {
	preload: function () {

	},
	create: function () {
		this.game.add.image(0, 0, 'menu_background');
		this.title = this.game.add.image(this.game.width / 2, 144, 'menu_title');
		this.title.anchor.setTo(0.5, 0.5);
		this.startButton = this.game.add.button(this.game.width / 2, 320, 'menu_play_button', this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
		this.helpButton = this.game.add.button(this.game.width / 2, 384, 'menu_help_button', this.helpClick, this);
		this.helpButton.anchor.setTo(0.5, 0.5);
	},
	startClick: function () {
		console.log('Menu click.');
		this.game.state.start('play');
	},
	helpClick: function () {
		console.log('Help click.');
	},
	update: function () {

	}
};

module.exports = Menu;
