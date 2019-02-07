function Character() {
	this.tileFrom	= [1, 1];
	this.tileTo		= [0, 1];
	this.dimensions	= [60, 60];
	this.position	= [1, 1];
	this.timeMoved	= 0;
	this.direction = directions.down;

	this.delayMove = {};
	this.delayMove[floorTypes.path] = 200;

	this.sprite = [{x:240, y:0,  w:60, h:60}];
}

Character.prototype.placeAt = function(x, y) {
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((gridScale*x)+((gridScale-this.dimensions[0])/1.9)), ((gridScale*y)+((gridScale-this.dimensions[1])/1.9))];
};

Character.prototype.processMovement = function(t) {
	if (this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) {
		return false;
	}

	var moveSpeed = this.delayMove[tileTypes[gameMaps[currentMap][toIndex(this.tileFrom[0],this.tileFrom[1])]].floor];

	if((t-this.timeMoved)>=moveSpeed) {
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	} else {
		this.position[0] = (this.tileFrom[0] * gridScale) + ((gridScale-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * gridScale) + ((gridScale-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0]) {
			var diff = (gridScale / moveSpeed) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}

		if(this.tileTo[1] != this.tileFrom[1]) {
			var diff = (gridScale / moveSpeed) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}

Character.prototype.canMoveTo = function(x, y) {
	if (x < 0 || x >= mapW || y < 0 || y >= mapH) {
		return false;
	}
		if(typeof this.delayMove[tileTypes[gameMaps[currentMap][toIndex(x,y)]].floor] == "undefined") {
			return false;
		}
	return true;
};

Character.prototype.canMoveUp	 = function() {return this.canMoveTo(this.tileFrom[0],   this.tileFrom[1]-1)};
Character.prototype.canMoveDown  = function() {return this.canMoveTo(this.tileFrom[0],   this.tileFrom[1]+1)};
Character.prototype.canMoveLeft  = function() {return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
Character.prototype.canMoveRight = function() {return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };

Character.prototype.moveLeft  = function(t) {this.tileTo[0]-=1; this.timeMoved = t; this.direction = directions.left };
Character.prototype.moveRight = function(t) {this.tileTo[0]+=1; this.timeMoved = t; this.direction = directions.right};
Character.prototype.moveUp	  = function(t) {this.tileTo[1]-=1; this.timeMoved = t; this.direction = directions.up   };
Character.prototype.moveDown  = function(t) {this.tileTo[1]+=1; this.timeMoved = t; this.direction = directions.down };