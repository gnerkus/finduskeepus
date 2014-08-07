'use strict';

function Success() {

}

Success.prototype = {
	preload: function () {

	},
	create: function () {
		this.game.add.sprite(0, 0, 'level_menu_bg');
		this.nextButton = this.game.add.button(552, 288, 'next_button', this.nextLevel, this);
		this.menuButton = this.game.add.button(384, 384, 'menu_button', this.mainMenu, this);
		this.levelMenuButton = this.game.add.button(416, 288, 'level_menu_button', this.levelMenu, this);
		this.replayButton = this.game.add.button(280, 288, 'replay_button', this.currentLevel, this);
	},
	update: function () {
		
	},
	nextLevel: function () {
		this.game.chapters[this.game.currentChapter].currentLevel += 1;
		this.game.state.start('play');
	},
	currentLevel: function () {
		this.game.state.start('play');
	},
	levelMenu: function () {
		this.game.state.start('level-menu');
	},
	mainMenu: function () {
		this.game.state.start('menu');
	}
};

module.exports = Success;
