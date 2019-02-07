var tileTypes = {
	0  : {colour:"#000000", floor:floorTypes.solid, sprite:[{x:0,   y:0,   w:60, h:60}]}, //wall
	1  : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:60,  y:0,   w:60, h:60}]}, //path
	2  : {colour:"#00aa00", floor:floorTypes.path,  sprite:[{x:120, y:0,   w:60, h:60}]}, //start
	3  : {colour:"#aa0000", floor:floorTypes.path,  sprite:[{x:180, y:0,   w:60, h:60}]}, //end
	4  : {colour:"#f41717", floor:floorTypes.solid, sprite:[{x:0,   y:60,  w:60, h:60}]}, //red lock
	5  : {colour:"#f41717", floor:floorTypes.path,  sprite:[{x:0,   y:120, w:60, h:60}]}, //red key
	6  : {colour:"#f4bc16", floor:floorTypes.solid, sprite:[{x:60,  y:60,  w:60, h:60}]}, //yellow lock
	7  : {colour:"#f4bc16", floor:floorTypes.path,  sprite:[{x:60,  y:120, w:60, h:60}]}, //yellow key
	8  : {colour:"#24f417", floor:floorTypes.solid, sprite:[{x:120, y:60,  w:60, h:60}]}, //green lock
	9  : {colour:"#24f417", floor:floorTypes.path,  sprite:[{x:120, y:120, w:60, h:60}]}, //green key
	10 : {colour:"#1728f4", floor:floorTypes.solid, sprite:[{x:180, y:60,  w:60, h:60}]}, //blue lock
	11 : {colour:"#1728f4", floor:floorTypes.path,  sprite:[{x:180, y:120, w:60, h:60}]}, //blue key
	12 : {colour:"#8f17f4", floor:floorTypes.solid, sprite:[{x:240, y:60,  w:60, h:60}]}, //purple lock
	13 : {colour:"#8f17f4", floor:floorTypes.path,  sprite:[{x:240, y:120, w:60, h:60}]}, //purple key
	14 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:0,   y:180, w:60, h:60}]}, //a
	15 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:60,  y:180, w:60, h:60}]}, //c
	16 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:120, y:180, w:60, h:60}]}, //f
	17 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:180, y:180, w:60, h:60}]}, //g
	18 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:240, y:180, w:60, h:60}]}, //h
	19 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:0,   y:240, w:60, h:60}]}, //i
	20 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:60,  y:240, w:60, h:60}]}, //k
	21 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:120, y:240, w:60, h:60}]}, //l
	22 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:180, y:240, w:60, h:60}]}, //n
	23 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:240, y:240, w:60, h:60}]}, //o
	24 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:0,   y:300, w:60, h:60}]}, //p
	25 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:60,  y:300, w:60, h:60}]}, //r
	26 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:120, y:300, w:60, h:60}]}, //s
	27 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:180, y:300, w:60, h:60}]}, //t
	28 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:240, y:300, w:60, h:60}]}, //u
	29 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:0,   y:360, w:60, h:60}]}, //w
	30 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:60,  y:360, w:60, h:60}]}, //y
	31 : {colour:"#ffffff", floor:floorTypes.path,  sprite:[{x:120, y:360, w:60, h:60}]}  //!
};