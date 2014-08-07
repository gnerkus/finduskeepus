'use strict';

var signpostBehaviour = require('./../behaviours/signpost');

function Panel (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'arrow', frame);
    //console.log('Called super class.');

    this.game.physics.arcade.enableBody(this);
    this.inputEnabled = true;
    //console.log('Input enabled for panel.');
    this.events.onInputDown.add(this.nextDirection, this);
    //console.log('Added input listener to panel.');
    //console.log(this);

    this.animations.add('down', [0, 1, 2, 3, 4, 5]);
    this.animations.add('left', [6, 7, 8, 9, 10, 11]);
    this.animations.add('up', [12, 13, 14, 15, 16, 17]);
    this.animations.add('right', [18, 19, 20, 21, 22, 23]);
    this.dirList = ['right', 'down', 'left', 'up'];
    this.body.setSize(4, 4, 30, 30);

    this.state = {};

    // A list of the components this entity contains
    this.components = [];
    
    this.componentMethods = [];
    
    // Instructions to give any entity that collides with this entity
    // This behaviour object will be maintained by the entity's components
    this.behaviour = {
            
    };

    this.inputChange = {
        'signpost': {
            next: true
        }
    };

    this.addComponent(signpostBehaviour);
    console.log('Added signpost component.');

    this.arrowSfx = this.game.add.audio('arrow');
}

Panel.prototype = Object.create(Phaser.Sprite.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.update = function () {
    for (var index in this.componentMethods) {
        this[this.componentMethods[index]].call(this);
    }
};

Panel.prototype.addComponent = function (componentObject) {
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

Panel.prototype.getBehaviour = function () {
    return this.behaviour;
};

Panel.prototype.changeState = function (behaviour) {
    for (var behaviourIndex in behaviour) {
        console.log('Found ' + behaviourIndex);
        if (this.components.indexOf(behaviourIndex) >= 0) {
            console.log('Panel contains ' + behaviourIndex);
            console.log(behaviour[behaviourIndex]);
            console.log(this['handle' + behaviourIndex]);
            this['handle' + behaviourIndex](behaviour[behaviourIndex]);
        }
    }
};

Panel.prototype.nextDirection = function () {
    this.changeState(this.inputChange);
    this.arrowSfx.play();
    console.log(this);
};

module.exports = Panel;

