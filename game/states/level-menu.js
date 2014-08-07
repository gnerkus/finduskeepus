'use strict';

// * move to Play when user selects a level
var LevelButton = require('../prefabs/levelButton');

function LevelMenu () {

}

LevelMenu.prototype = {
	preload: function () {

	},

	create: function () {
        this.chapter = this.game.chapters[this.game.currentChapter];
        this.levels = this.chapter.levels;

        this.game.add.sprite(0, 0, 'level_menu_bg');

        for (var levelIdx in this.levels) {
            var level = this.levels[levelIdx];
            var posX = ((levelIdx % 7) * 2 + 1) * 64;
            var posY = (Math.floor(levelIdx / 7) * 2 + 1) * 64;

            var levelBtn = new LevelButton(this.game, this.levelClick, this, level);
            levelBtn.x = posX;
            levelBtn.y = posY;
        }
	},

	update: function () {

	},

	levelClick: function (button) {
		this.game.chapters[this.game.currentChapter].currentLevel = button.level.levelNumber - 1;
		this.game.state.start('play');
	}
};

module.exports = LevelMenu;