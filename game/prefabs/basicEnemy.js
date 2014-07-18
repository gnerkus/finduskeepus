'use strict';

var bulletBehaviour = require('./../behaviours/runner');

function BasicEnemy (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'basic_enemy', frame);
    console.log('Called BasicEnemy super class');
    this.anchor.setTo(0.5, 0.5);

    this.detector = this.game.add.sprite(x, y, 'detector');
    this.game.physics.arcade.enable(this.detector);
    this.detector.player = this;

    this.game.physics.arcade.enable(this);
    console.log('Physics enabled for enemy.');

    this.animations.add('right', [0, 1, 2, 3, 4, 5, 6]);
    this.animations.add('down', [7, 8, 9, 10, 11, 12, 13]);
    this.animations.add('left', [14, 15, 16, 17, 18, 19, 20]);
    this.animations.add('up', [21, 22, 23, 24, 25, 26, 27]);
    this.dirList = ['right', 'down', 'left', 'up'];

    this.state = {};

    // A list of the components this entity contains
    this.components = [];

    this.componentMethods = [];

    // Instructions to give any entity that collides with this entity
    // This behaviour object will be maintained by the entity's components
    this.behaviour = {
        
    };

    this.addComponent(bulletBehaviour);
    console.log('Added runner component.');
}

BasicEnemy.prototype = Object.create(Phaser.Sprite.prototype);
BasicEnemy.prototype.constructor = BasicEnemy;

BasicEnemy.prototype.update = function () {
    for (var index in this.componentMethods) {
        this[this.componentMethods[index]].call(this);
    }
};

BasicEnemy.prototype.addComponent = function (componentObject) {
    this.components.push(componentObject.name);
    this.state[componentObject.name] = Object.create(componentObject.attribs);

    for (var behaviourIndex in componentObject.behaviour) {
    	var behaviour = Object.create(componentObject.behaviour[behaviourIndex]);
    	this.behaviour[behaviourIndex] = behaviour;
    }

    for (var methodIndex in componentObject.methods) {
    	var method = componentObject.methods[methodIndex];
    	this[methodIndex] = method.bind(this);
    }

    for (var updateIndex in componentObject.updateMethods) {
        var updateMethod = componentObject.updateMethods[updateIndex];
        this[updateIndex] = updateMethod.bind(this);
        this.componentMethods.push(updateIndex);
    }

    this['handle' + componentObject.name] = componentObject.handler.bind(this);
};

BasicEnemy.prototype.getBehaviour = function () {
    return this.behaviour;
};

BasicEnemy.prototype.changeState = function (behaviour) {
    for (var behaviourIndex in behaviour) {
        console.log('Found ' + behaviourIndex);
        if (this.components.indexOf(behaviourIndex) >= 0) {
            console.log('BasicEnemy contains ' + behaviourIndex);
            console.log(behaviour[behaviourIndex]);
            console.log(this['handle' + behaviourIndex]);
            this['handle' + behaviourIndex](behaviour[behaviourIndex]);
        }
    }
};

module.exports = BasicEnemy;