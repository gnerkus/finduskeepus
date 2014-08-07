'use strict';

function LevelButton (game, callback, callbackContext, levelObject, parent) {
    Phaser.Group.call(this, game, parent);

    this.button = this.game.add.button(0, 0, 'level_menu_btn', callback, callbackContext);
    this.levelText = this.game.add.text(0, 0, levelObject.levelNumber, {fontSize: 16});

    this.button.level = levelObject;

    this.add(this.button);
    this.add(this.levelText);
}

LevelButton.prototype = Object.create(Phaser.Group.prototype);
LevelButton.prototype.constructor = LevelButton;


module.exports = LevelButton;