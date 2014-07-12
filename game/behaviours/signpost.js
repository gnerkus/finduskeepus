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
                    this.state.signpost.direction = nextState;
                }
            }
        }
    };

    return state;
}());

module.exports = SignpostBehaviour;