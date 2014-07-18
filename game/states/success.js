'use strict';

function Success() {

}

Success.prototype = {
	preload: function () {

	},
	create: function () {
		this.nextButton = this.game.add.button(192, 128, 'next_button', this.nextLevel, this);
		this.previousButton = this.game.add.button(640, 128, 'previous_button', this.previousLevel, this);
		this.menuButton = this.game.add.button(384, 384, 'menu_button', this.mainMenu, this);
	},
	update: function () {
		
	},
	nextLevel: function () {
		this.game.currentLevel += 1;
		this.game.state.start('play');
	},
	previousLevel: function () {
		this.game.currentLevel -= 1;
		this.game.state.start('play');
	},
	mainMenu: function () {
		this.game.state.start('menu');
	}
};

module.exports = Success;
