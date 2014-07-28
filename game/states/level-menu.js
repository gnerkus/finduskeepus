'use strict';

// * move to Play when user selects a level

function LevelMenu () {

}

LevelMenu.prototype = {
	preload: function () {

	},

	create: function () {
        this.game.add.sprite(0, 0, 'level_menu_bg');
	},

	update: function () {

	}
};

module.exports = LevelMenu;