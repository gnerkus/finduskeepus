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
        }
    };

    return state;
}());

module.exports = RunnerBehaviour;