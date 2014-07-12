'use strict';

var bulletBehaviour = require('./../behaviours/runner');

function Player (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player_one', frame);
    console.log('Called super class');

    this.game.physics.arcade.enableBody(this);
    console.log('Physics enabled for player.');

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

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    for (var index in this.componentMethods) {
        this[this.componentMethods[index]].call(this);
    }
};

Player.prototype.addComponent = function (componentObject) {
    this.components.push(componentObject.name);
    this.state[componentObject.name] = componentObject.attribs;

    for (var behaviourIndex in componentObject.behaviour) {
    	var behaviour = componentObject.behaviour[behaviourIndex];
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

Player.prototype.getBehaviour = function () {
    return this.behaviour;
};

Player.prototype.changeState = function (behaviour) {
    for (var behaviourIndex in behaviour) {
        console.log('Found ' + behaviourIndex);
        if (this.components.indexOf(behaviourIndex) >= 0) {
            console.log('Player contains ' + behaviourIndex);
            console.log(behaviour[behaviourIndex]);
            console.log(this['handle' + behaviourIndex]);
            this['handle' + behaviourIndex](behaviour[behaviourIndex]);
        }
    }
};

module.exports = Player;

