var ctx = null;
var gridScale = 75;
var mapW = 41;
var mapH = 41;
var currentSecond;
var frameCount;
var framesLastSecond;
var lastFrameTime;
var tilemap;
var tilemapURL = "tilemap.png";
var tilemapLoaded = false;

var floorTypes = {
	solid : 0,
	path  : 1,
};

var directions = {
	up    : 0,
	right : 1,
	down  : 2,
	left  : 3
};

var keysDown = {
	37 : false, //left
	38 : false, //up
	39 : false, //right
	40 : false  //down
};

var player = new Character();

var viewport = {
	screen    : [0, 0],
	startTile : [0, 0],
	endTile   : [0, 0],
	offset    : [0, 0],
	update : function(px, py) {
		this.offset[0] = Math.floor((this.screen[0]/2) - px);
		this.offset[1] = Math.floor((this.screen[1]/2) - py);

		var tile = [Math.floor(px/gridScale),
					Math.floor(py/gridScale)];

		this.startTile[0] = tile[0]-1-Math.ceil((this.screen[0]/2)/gridScale);
		this.startTile[1] = tile[1]-1-Math.ceil((this.screen[1]/2)/gridScale);

		if (this.startTile[0] < 0) {
			this.startTile[0] = 0;
		}
		if (this.startTile[1] < 0) {
			this.startTile[1] = 0;
		}

		this.endTile[0] = tile[0]+1+Math.ceil((this.screen[0]/2)/gridScale);
		this.endTile[1] = tile[1]+1+Math.ceil((this.screen[1]/2)/gridScale);

		if (this.endTile[0] >= mapW) {
			this.endTile[0] = mapW-1;
		}
		if (this.endTile[1] >= mapH) {
			this.endTile[1] = mapH-1 ;
		}
	}
};

function toIndex(x, y) {
	return((y * mapW) + x);
}

function getFrame(sprite, duration, time, animated) {
	if (!animated) {
		return sprite[0];
	}
	time = time % duration;

	for (x in sprite) {
		if (sprite[x].end>=time) {
			return sprite[x];
		}
	}
}

window.onload = function() {
	ctx = document.getElementById('gameCanvas').getContext("2d");
	ctx.imageSmoothingEnabled = false;
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		if (e.keyCode>=37 && e.keyCode<=40) {
			keysDown[e.keyCode] = true;
		}
	});
	window.addEventListener("keyup", function(e) {
		if (e.keyCode>=37 && e.keyCode<=40) {
			keysDown[e.keyCode] = false;
		}
	});

	viewport.screen = [
		document.getElementById("gameCanvas").width,
		document.getElementById("gameCanvas").height];

	tilemap = new Image();
	tilemap.onerror = function() {
		ctx = null;
		alert("Failed to load tilemap. :/");
	}

	tilemap.onload = function() {
		tilemapLoaded = true;
	}
	tilemap.src = tilemapURL;

	for(x in tileTypes) {
		tileTypes[x]['animated'] = tileTypes[x].sprite.length > 1 ? true : false;

		if (tileTypes[x].animated) {
			var t = 0;
			for (s in tileTypes[x].sprite) {
				tileTypes[x].sprite[s]['start'] = t;
				t += tileTypes[x].sprite[s].d;
				tileTypes[x].sprite[s]['end'] = t;
			}
			tileTypes[x]['spriteDuration'] = t;
		}
	}

};

function drawGame() {
	if (ctx == null) {
		return;
	}

	if (tilemapLoaded == false) {
		requestAnimationFrame(drawGame);
		return;
	}

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	} else {
		frameCount++;
	}

	if (!player.processMovement(currentFrameTime)) {
		if (keysDown[38] && player.canMoveUp()) {
			player.moveUp(currentFrameTime);

		} else if (keysDown[40] && player.canMoveDown()) {
			player.moveDown(currentFrameTime);

		} else if (keysDown[37] && player.canMoveLeft()) {
			player.moveLeft(currentFrameTime);

		} else if (keysDown[39] && player.canMoveRight()) {
			player.moveRight(currentFrameTime);
		}
	}

	viewport.update(player.position[0] + (player.dimensions[0]/2), player.position[1] + (player.dimensions[1]/2));

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	ctx.imageSmoothingEnabled = false;

	for(var i = viewport.startTile[1]; i <= viewport.endTile[1]; ++i) {
		for(var j = viewport.startTile[0]; j <= viewport.endTile[0]; ++j) {
			var tile = tileTypes[gameMaps[currentMap][toIndex(j ,i)]];
			var sprite = getFrame(tile.sprite, tile.spriteDuration, currentFrameTime, tile.animated);
			ctx.drawImage(tilemap, sprite.x, sprite.y, sprite.w, sprite.h,
				viewport.offset[0] + (j*gridScale), viewport.offset[1] + (i*gridScale), gridScale, gridScale);
		}
	}

	var sprite = player.sprite;
	ctx.drawImage(tilemap,sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
				  viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
				  player.dimensions[0], player.dimensions[1]);


	ctx.fillStyle = "#ff0000";
	ctx.font = "24px Lucida Console";
	level = currentMap + 1;
	if (framesLastSecond == undefined) {
		ctx.fillText("FPS  : ?", 10, 30);
	} else {
		ctx.fillText("FPS  : " + framesLastSecond, 10, 30);
	}
	if (level != 21) {
		ctx.fillText("Level: " + level + "/20", 10, 55);
	}
	if (level <= 5) {
		ctx.fillText("Size : Small (10x10)", 10, 80);
	} else if (level >= 6 && level <= 10) {
		ctx.fillText("Size : Medium (20x20)", 10, 80)
	} else if (level >= 11 && level <= 15) {
		ctx.fillText("Size : Large (30x30)", 10, 80)
	} else if (level >= 16 && level <= 20) {
		ctx.fillText("Size : Huge (40x40)", 10, 80)
	}

	player.position[0] = Math.round(player.position[0]);
	player.position[1] = Math.round(player.position[1]);

	checkNewMap();

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}