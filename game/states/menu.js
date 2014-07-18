'use strict';

// * move to LevelMenu when user clicks 'play'

function Menu() {

}

Menu.prototype = {
	preload: function () {

	},
	create: function () {
		this.startButton = this.game.add.button(this.game.width / 2, 300, 'blue', this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	},
	startClick: function () {
		console.log('Menu click.');
		this.game.state.start('play');
	},
	update: function () {

	}
};

module.exports = Menu;
