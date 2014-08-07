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
},{"./states/boot":8,"./states/level-menu":9,"./states/menu":10,"./states/play":11,"./states/preload":12,"./states/success":13}],4:[function(require,module,exports){
'use strict';

var bulletBehaviour = require('./../behaviours/runner');

function BasicEnemy (game, x, y) {
    Phaser.Sprite.call(this, game, x + 32, y - 32, 'basic_enemy');
    console.log('Called BasicEnemy super class');
    this.anchor.setTo(0.5, 0.5);

    this.detector = this.game.add.sprite(x + 32, y - 32, 'detector');
    this.detector.anchor.setTo(0.5, 0.5);
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
},{}],6:[function(require,module,exports){
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


},{"./../behaviours/signpost":2}],7:[function(require,module,exports){
'use strict';

var bulletBehaviour = require('./../behaviours/runner');

function Player (game, x, y) {
    Phaser.Sprite.call(this, game, x + 32, y - 32, 'player_one');
    console.log('Called super class');
    this.anchor.setTo(0.5, 0.5);

    this.detector = this.game.add.sprite(x + 32, y - 32, 'detector');
    this.detector.anchor.setTo(0.5, 0.5);
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


},{"./../behaviours/runner":1}],8:[function(require,module,exports){
'use strict';

function Boot() {

}

Boot.prototype = {
	preload: function () {
		this.load.image('preloader', 'assets/preloader.gif');
        this.load.image('preload_background', 'assets/loader_bg.png');
        this.load.image('logo', 'assets/logo.png');
	},
	create: function () {
        this.game.currentChapter = 0;
        this.game.chapters = [
            {
                chapterNumber: 1,
                title: 'the woods',
                currentLevel: 0,
                levels: [
                    {
                        levelNumber: 1,
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
                        levelNumber: 2,
                        map: 'meetup_map_2',
                        asset: 'assets/tilemaps/meetup_game_2.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 3,
                        map: 'meetup_map_3',
                        asset: 'assets/tilemaps/meetup_game_3.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 4,
                        map: 'meetup_map_4',
                        asset: 'assets/tilemaps/meetup_game_4.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },

                    {
                        levelNumber: 5,
                        map: 'meetup_map_5',
                        asset: 'assets/tilemaps/meetup_game_5.json',
                        tileset: 'meetup_tileset',
                        layers: {
                            environment: 'Floor',
                            arrows: 'Arrows'
                        },
                        complete: false,
                        stars: 0
                    },
                ]
            },

            {
                chapterNumber: 2,
                title: 'woods at night',
                currentLevel: 0,
                levels: []
            }
        ];
		
		this.game.input.maxPointers = 1;
		this.game.state.start('preload');

	}
};

module.exports = Boot;

},{}],9:[function(require,module,exports){
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
},{"../prefabs/levelButton":5}],10:[function(require,module,exports){
'use strict';

// * move to LevelMenu when user clicks 'play'

function Menu() {

}

Menu.prototype = {
	preload: function () {

	},
	create: function () {
		this.game.add.image(0, 0, 'menu_background');
		this.title = this.game.add.image(this.game.width / 2, 144, 'menu_title');
		this.title.anchor.setTo(0.5, 0.5);
		this.startButton = this.game.add.button(this.game.width / 2, 320, 'menu_play_button', this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
		this.helpButton = this.game.add.button(this.game.width / 2, 384, 'menu_help_button', this.helpClick, this);
		this.helpButton.anchor.setTo(0.5, 0.5);

		this.buttonSfx = this.game.add.audio('button');
	},
	startClick: function () {
		this.buttonSfx.play();
		console.log('Menu click.');
		this.game.state.start('level-menu');
	},
	helpClick: function () {
		this.buttonSfx.play();
		console.log('Help click.');
	},
	update: function () {

	}
};

module.exports = Menu;

},{}],11:[function(require,module,exports){
'use strict';

// * move to Success when user causes both players to collide with themselves
// * show pauseOverlay when 'pause' button is clicked
// * move to Play when user causes a player to collide with an enemy. 

var Panel = require('../prefabs/panel');
var Player = require('../prefabs/player');
var BasicEnemy = require('../prefabs/basicEnemy');
var detectors = null;

function Play() {

}

Play.prototype = {
	create: function () {
        this.chapter = this.game.chapters[this.game.currentChapter];
        this.level = this.chapter.levels[this.chapter.currentLevel];

        this.game.physics.startSystem(Phaser.Physics.ARCADE); // 2 -- add physics
        console.log('Added physics to game.');

        this.map = this.game.add.tilemap(this.level.map);
        this.map.addTilesetImage(this.level.tileset);
        this.layer = this.map.createLayer('Floor');
        this.layer.resizeWorld();

        detectors = this.game.add.group(); 

        this.arrowPanels = this.game.add.group();
        this.map.createFromObjects('Arrows', 10, 'arrow', null, true, false, this.arrowPanels, Panel, true);
        this.arrowPanels.forEach(function (panel) {
           panel.addDirections(panel.directions);
        });

        this.players = this.game.add.group();
        this.map.createFromObjects('Players', 9, null, null, true, false, this.players, Player, false);
        this.players.forEach(function (player) {
           detectors.add(player.detector);
        });

        this.enemies = this.game.add.group();
        this.map.createFromObjects('Enemies', 11, null, null, true, false, this.enemies, BasicEnemy, false);
        this.enemies.forEach(function (enemy) {
           detectors.add(enemy.detector);
        });

        this.music = this.game.add.audio('forest_melody');
        this.music.play();

        
	    },
	update: function () {
        this.game.physics.arcade.overlap(detectors, this.arrowPanels, this.shareBehaviours, null, this);
        this.game.physics.arcade.collide(this.players, this.players, this.levelClear, null, this);
        this.game.physics.arcade.collide(this.players, this.enemies, this.levelFail, null, this);
	},

    shareBehaviours: function (detector, panel) {
        detector.player.changeState(panel.getBehaviour());
        console.log(panel);
        console.log(detector);
    },

    levelClear: function (playerOne, playerTwo) {
        this.music.stop();
        this.game.state.start('success');
    },

    levelFail: function (player, enemy) {
        this.music.stop();
        this.game.state.start('play');
    }
};

module.exports = Play;

},{"../prefabs/basicEnemy":4,"../prefabs/panel":6,"../prefabs/player":7}],12:[function(require,module,exports){
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

        this.loadBackground = this.add.sprite(0, 0, 'preload_background');
        this.logo = this.add.sprite(480, 288, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.asset = this.add.sprite(480, 544, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        
        // load menu screen objects
        this.load.image('menu_background', 'assets/textures/menu_screen_background.png');
        this.load.image('menu_title', 'assets/textures/game_title.png');
        this.load.image('menu_play_button', 'assets/textures/menu_screen_button.png');
        this.load.image('menu_help_button', 'assets/textures/menu_screen_help_button.png');

        // load level menu screen objects
        this.load.image('level_menu_bg', 'assets/level_menu_background.png');
        this.load.image('level_menu_btn', 'assets/level_menu_button.png');

        this.load.tilemap('meetup_map', 'assets/tilemaps/meetup_game.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_2', 'assets/tilemaps/meetup_game_2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_3', 'assets/tilemaps/meetup_game_3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_4', 'assets/tilemaps/meetup_game_4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('meetup_map_5', 'assets/tilemaps/meetup_game_5.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('meetup_tileset', 'assets/textures/tileset.png');

        // load UI buttons
        this.load.image('menu_button', 'assets/textures/to_main_menu.png');
        this.load.image('level_menu_button', 'assets/textures/to_level_menu.png');
        this.load.image('next_button', 'assets/textures/to_next_level.png');
        this.load.image('previous_button', 'assets/textures/to_previous_level.png');
        this.load.image('continue_button', 'assets/textures/continue_button.png');
        this.load.image('exit_button', 'assets/textures/exit_button.png');
        this.load.image('pause_button', 'assets/textures/pause_button.png');
        this.load.image('replay_button', 'assets/textures/replay_button.png');

        this.load.image('level_one', 'assets/textures/level_one.png');
        this.load.image('level_two', 'assets/textures/level_two.png');

        this.load.spritesheet('arrow', 'assets/textures/arrow_panel.png', 64, 64, 24);
        this.load.spritesheet('player_one', 'assets/textures/player_one.png', 64, 64, 32);
        
        this.load.spritesheet('basic_enemy', 'assets/textures/basic_enemy.png', 64, 64, 28);

        this.load.audio('forest_melody', ['assets/music/forest_melody.mp3', 'assets/music/forest_melody.ogg']);
        this.load.audio('arrow', 'assets/sound/arrow.ogg');
        this.load.audio('button', 'assets/sound/button.ogg');
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

},{}],13:[function(require,module,exports){
'use strict';

function Success() {

}

Success.prototype = {
	preload: function () {

	},
	create: function () {
		this.game.add.sprite(0, 0, 'level_menu_bg');
		this.nextButton = this.game.add.button(552, 288, 'next_button', this.nextLevel, this);
		this.menuButton = this.game.add.button(416, 384, 'menu_button', this.mainMenu, this);
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

},{}]},{},[3]);