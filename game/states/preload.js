'use strict';

function Preload() {
	this.asset = null;
	this.ready = false;
}

Preload.prototype = {
	preload: function () {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('blue', 'assets/textures/blue.png');
        this.load.image('green', 'assets/textures/green.png');
        this.load.image('red', 'assets/textures/red.png');
        this.load.image('yellow', 'assets/textures/yellow.png');
        this.load.image('detector', 'assets/textures/detector.png');
        this.load.image('tileset', 'assets/textures/tileset.png');
        this.load.spritesheet('panel', 'assets/textures/panel_sheet.png', 48, 48, 4);
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
