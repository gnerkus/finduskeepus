(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var RunnerBehaviour = (function () {
    var state = {
        name: 'runner',

        attribs: {
            direction: 1,
            speed: 64
        },

        updateMethods: {
            updateRunnerMotion: function () {
                var runnerDirection = this.state.runner.direction * 90;
                var runnerSpeed = this.state.runner.speed;

                this.game.physics.arcade.velocityFromAngle(runnerDirection, runnerSpeed, this.body.velocity);
                this.game.physics.arcade.velocityFromAngle(runnerDirection, runnerSpeed, this.detector.body.velocity);
            }
        },

        methods: {
            
        },

        behaviour: {
            
        },

        handler: function (instruction) {
            console.log('Runner: updating runner state with instructions.');
            console.log(instruction);

            this.state.runner.direction = instruction.direction;
            this.state.runner.speed = instruction.speed;

            this.animations.play(this.dirList[this.state.runner.direction], 15, true);
        }
    };

    return state;
}());

module.exports = RunnerBehaviour;
},{}],2:[function(require,module,exports){
'use strict';

var SignpostBehaviour = (function () {
    var state = {
        name: 'signpost',

        attribs: {
            directions: [],
            direction: 0
        },

        updateMethods: {
            updateDirection: function () {
                this.behaviour.runner.direction = this.state.signpost.direction;
            }
        },

        methods: {
            addDirections: function (dirArray) {
                this.state.signpost.directions = this.state.signpost.directions.concat(dirArray);
                this.state.signpost.direction = this.state.signpost.directions[0];
                this.animations.play(this.dirList[this.state.signpost.direction], 30, false);
            }
        },

        behaviour: {
            'runner': {
                direction: 0
            }
        },
        
        handler: function (instruction) {
            console.log('Signpost: updating signpost state with instructions.');
            console.log(instruction);

            var directions = this.state.signpost.directions;
            console.log(directions);
            var direction = this.state.signpost.direction;
            var index = directions.indexOf(direction);
            console.log(index);

            if (instruction.next) {
                if (index >= 0) {
                    var nextState = index >= directions.length - 1 ? 0 : index + 1;
                    console.log(directions.length);
                    console.log(nextState);
                    this.state.signpost.direction = directions[nextState];
                    this.animations.play(this.dirList[this.state.signpost.direction], 30, false);
                }
            }
        }
    };

    return state;
}());

module.exports = SignpostBehaviour;
},{}],3:[function(require,module,exports){
'use strict';

// global variables
window.onload = function () {
	var game = new Phaser.Game(960, 576, Phaser.AUTO, 'meetup');
    

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('level-menu', require('./states/level-menu'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));
	game.state.add('success', require('./states/success'));

	game.state.start('boot');

};
},{"./states/boot":7,"./states/level-menu":8,"./states/menu":9,"./states/play":10,"./states/preload":11,"./states/success":12}],4:[function(require,module,exports){
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
},{"./../behaviours/runner":1}],5:[function(require,module,exports){
'use strict';

var signpostBehaviour = require('./../behaviours/signpost');

function Panel (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'arrow', frame);
    console.log('Called super class.');

    this.game.physics.arcade.enableBody(this);
    this.inputEnabled = true;
    console.log('Input enabled for panel.');
    this.events.onInputDown.add(this.nextDirection, this);
    console.log('Added input listener to panel.');
    console.log(this);

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
    console.log(this);
};

module.exports = Panel;


},{"./../behaviours/signpost":2}],6:[function(require,module,exports){
'use strict';

var bulletBehaviour = require('./../behaviours/runner');

function Player (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player_one', frame);
    console.log('Called super class');
    this.anchor.setTo(0.5, 0.5);

    this.detector = this.game.add.sprite(x, y, 'detector');
    this.game.physics.arcade.enable(this.detector);
    this.detector.player = this;

    this.game.physics.arcade.enable(this);
    console.log('Physics enabled for player.');

    this.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7]);
    this.animations.add('down', [8, 9, 10, 11, 12, 13, 14, 15]);
    this.animations.add('left', [16, 17, 18, 19, 20, 21, 22, 23]);
    this.animations.add('up', [24, 25, 26, 27, 28, 29, 30, 31]);
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

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    for (var index in this.componentMethods) {
        this[this.componentMethods[index]].call(this);
    }
};

Player.prototype.addComponent = function (componentObject) {
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


},{"./../behaviours/runner":1}],7:[function(require,module,exports){
'use strict';

function Boot() {

}

Boot.prototype = {
	preload: function () {
		this.load.image('preloader', 'assets/preloader.gif');
	},
	create: function () {
		this.game.meetupLevels = [
            {
                map: 'meetup_map',
                asset: 'assets/tilemaps/meetup_game.json',
                tileset: 'meetup_tileset',
                layers: {
                    environment: 'Floor',
                    arrows: 'Arrows'
                },
                complete: false,
                stars: 0
            },

            {
                map: 'meetup_map_2',
                asset: 'assets/tilemaps/meetup_game_2.json',
                tileset: 'meetup_tileset',
                layers: {
                    environment: 'Floor',
                    arrows: 'Arrows'
                },
                complete: false,
                stars: 0
            }
		];
        this.game.currentLevel = 1;

		this.game.input.maxPointers = 1;
		this.game.state.start('preload');

		console.log(this.game.meetupLevels);
		console.log(this.game.meetupLevels[this.game.currentLevel - 1]);
	}
};

module.exports = Boot;

},{}],8:[function(require,module,exports){
'use strict';

// * move to Play when user selects a level

function LevelMenu () {

}

LevelMenu.prototype = {
	preload: function () {

	},

	create: function () {

	},

	update: function () {

	}
};

module.exports = LevelMenu;
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
'use strict';

// * move to Success when user causes both players to collide with themselves
// * show pauseOverlay when 'pause' button is clicked
// * move to Play when user causes a player to collide with an enemy. 

var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');
var BasicEnemy = require('../prefabs/basicEnemy');


function Play() {

}

Play.prototype = {
	create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.map = this.game.add.tilemap(this.game.meetupLevels[this.game.currentLevel - 1].map);
        this.map.addTilesetImage(this.game.meetupLevels[this.game.currentLevel - 1].tileset);
        this.layer = this.map.createLayer('Floor');
        this.layer.resizeWorld();

        this.detectors = this.game.add.group(); 

        this.arrowPanels = this.game.add.group();
        this.map.createFromObjects('Arrows', 10, 'arrow', null, true, false, this.arrowPanels, Panel, true);
        this.arrowPanels.forEach(function (panel) {
           panel.addDirections(panel.directions);
        });

        this.player = new Player(this.game, 96, 96);
        console.log('Added player to game.');
        console.log(this.player);

        this.game.add.existing(this.player);

        this.detectors.add(this.player.detector);
        console.log(this.detectors);

        this.playerTwo = new Player(this.game, 736, 480);
        console.log('Added player to game.');
        console.log(this.player);

        this.game.add.existing(this.playerTwo);

        this.detectors.add(this.playerTwo.detector);
        console.log(this.detectors);

        this.enemy = new BasicEnemy(this.game, 352, 480);
        console.log('Added enemy to game.');
        console.log(this.enemy);

        this.game.add.existing(this.enemy);

        this.detectors.add(this.enemy.detector);
        console.log(this.detectors);

	    },
	update: function () {
        this.game.physics.arcade.overlap(this.detectors, this.arrowPanels, this.shareBehaviours, null, this);
        this.game.physics.arcade.collide(this.player, this.playerTwo, this.levelClear, null, this);
        this.game.physics.arcade.collide(this.player, this.enemy, this.levelFail, null, this);
        this.game.physics.arcade.collide(this.playerTwo, this.enemy, this.levelFail, null, this);
	},

    shareBehaviours: function (detector, panel) {
        detector.player.changeState(panel.getBehaviour());
        console.log(panel);
        console.log(detector);
    },

    levelClear: function (playerOne, playerTwo) {
        this.game.state.start('success');
    },

    levelFail: function (player, enemy) {
        this.game.state.start('play');
    }
};

module.exports = Play;

},{"../prefabs/basicEnemy":4,"../prefabs/panel":5,"../prefabs/player":6}],11:[function(require,module,exports){
'use strict';

// * move to Menu after assets have been loaded.

function Preload() {
	this.asset = null;
	this.ready = false;
}

Preload.prototype = {
	preload: function () {
		console.log(this.game.meetupLevels);
		console.log(this.game.currentLevel);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        this.load.tilemap('meetup_map', 'assets/tilemaps/meetup_game.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_2', 'assets/tilemaps/meetup_game_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('meetup_tileset', 'assets/textures/tileset.png');

        this.load.image('menu_button', 'assets/textures/to_main_menu.png');
        this.load.image('next_button', 'assets/textures/to_next_level.png');
        this.load.image('previous_button', 'assets/textures/to_previous_level.png');

        this.load.image('level_one', 'assets/textures/level_one.png');
        this.load.image('level_two', 'assets/textures/level_two.png');

        this.load.spritesheet('arrow', 'assets/textures/arrow_panel.png', 64, 64, 24);
        this.load.spritesheet('player_one', 'assets/textures/player_one.png', 64, 64, 32);
        
        this.load.spritesheet('basic_enemy', 'assets/textures/basic_enemy.png', 64, 64, 28);
	    },
	create: function () {
		this.asset.cropEnabled = false;
	},
	update: function () {
		if (!!this.ready) {
			this.game.state.start('menu');
		}
	},
	onLoadComplete: function () {
		this.ready = true;
	}
};

module.exports = Preload;

},{}],12:[function(require,module,exports){
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

},{}]},{},[3])