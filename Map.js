function Tile(_offX, _offY) {
	this.elem = document.createElement('div');
	this.elem.className = "tile"
	this.offX = _offX;
	this.offY = _offY;
}

var enemMap1 = {
	pos: [ [1,1], [10, 7] ],
	enemies: [ "Enemy1", "Enemy2"],

};

var mapArray2=[  [3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[6, 2, 7, 0, 0, 0,11, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0],
				[8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,11, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 0, 0, 0, 0],
				[0, 0, 0, 0,11, 0, 1, 0, 8, 9, 9, 9, 9,17, 2,16, 9, 9, 9, 9, 9, 9, 9, 9,10, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 1, 0,12,13, 0, 0, 0, 0, 0,11, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0,12,13, 0, 0, 0, 0, 0],
				[0, 0, 0, 0,14,15, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0,14,15, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,15, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ];

var mapArray=[
			[43,43,43,43,43,43,43,43,43,43,69,60,60,60,37,38,60,60,60,70,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,48,27,27,39,40,27,27,50,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,22,20,20,20,20,20,20,23,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,22,20,20,20,20,20,20,23,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,69,60,60,60,60,60,61,22,20,20,20,20,20,20,23,62,60,60,60,60,60,70,43,43,43,43],
			[43,43,43,43,65,48,27,27,27,27,27,52,20,20,20,20,20,20,54,27,27,27,27,27,50,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,29,29,29,29,29,29,29,29,29,29,29,29,20,20,20,23,66,43,43,43,43],
			[69,60,60,60,61,22,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,23,62,60,60,60,70],
			[65,48,27,27,27,52,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,54,27,27,27,50,66],
			[65,22,20,20,20,20,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,20,20,20,20,23,66],
			[72,03,20,20,20,20,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,20,20,20,20,05,06],
			[73,04,20,20,20,20,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,20,20,20,20,07,08],
			[65,22,20,20,20,20,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,20,20,20,20,23,66],
			[65,49,28,28,28,53,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,55,28,28,28,51,66],
			[71,67,67,67,64,22,20,20,20,41,41,41,41,41,41,41,41,41,41,41,41,20,20,20,23,63,67,67,67,68],
			[43,43,43,43,65,22,20,20,20,29,29,29,29,29,29,29,29,29,29,29,29,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,23,66,43,43,43,43],
			[43,43,43,43,65,49,28,28,28,28,28,53,20,20,20,20,20,20,55,28,28,28,28,28,51,66,43,43,43,43],
			[43,43,43,43,71,67,67,67,67,67,64,22,20,20,20,20,20,20,23,63,67,67,67,67,67,68,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,22,20,20,20,20,20,20,23,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,22,20,20,20,20,20,20,23,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,65,49,28,28,44,45,28,28,51,66,43,43,43,43,43,43,43,43,43,43],
			[43,43,43,43,43,43,43,43,43,43,71,67,67,67,46,47,67,67,67,68,43,43,43,43,43,43,43,43,43,43]

			];
var collisionMap = [];


var tiles = [];

var mapFlags = {
	room1clr: false,
	room2clr: false,
	entered: false,
	currentRm: 1,
};


function drawMap(mapArray){
	collisionMap = [];
	var cont = document.getElementById('map');
	cont.style.height = mapArray.length * 16 * scaleFact;
	cont.style.width = mapArray[0].length * 16 * scaleFact;

	for (var i = 0; i < mapArray.length; i++) {
        collisionMap.push([]);
		for (var j = 0; j < mapArray[i].length; j++) {
            var t;
			if(mapArray[i][j] == 0) {
				t = new Tile(-3, 0);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 1) {
				t = new Tile(-3, -1);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 2) {
				t = new Tile(-1, -1);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 3) {
				t = new Tile(0, 0);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 4) {
				t = new Tile(-1, 0);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 5) {
				t = new Tile(-2, 0);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 6) {
				t = new Tile(0, -1);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 7) {
				t = new Tile(-2, -1);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 8) {
				t = new Tile(0, -2);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 9) {
				t = new Tile(-1, -2);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 10) {
				t = new Tile(-2, -2);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 11) {
				t = new Tile(-3, -4);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 12) {
				t = new Tile(-2, 4);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 13) {
				t = new Tile(-3, 4);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 14) {
				t = new Tile(-2, 3);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 15) {
				t = new Tile(-3, 3);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 16) {
				t = new Tile(0, -3);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 17) {
				t = new Tile(-1, -3);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 18) {
				t = new Tile(0, -4);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 19) {
				t = new Tile(-1, -4);
				collisionMap[i].push(false);
            } else if(mapArray[i][j] == 20) {
                t = new Tile(0, 13);
                collisionMap[i].push(false);
            } else if(mapArray[i][j] == 29) {
                t = new Tile(1, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 48) {
                t = new Tile(2, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 22) {
                t = new Tile(3, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 49) {
                t = new Tile(4, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 28) {
                t = new Tile(5, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 27) {
                t = new Tile(6, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 23) {
                t = new Tile(7, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 50) {
                t = new Tile(8, 13);
                collisionMap[i].push(true);
            } else if(mapArray[i][j] == 51) {
                t = new Tile(9, 13);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 52) {
                t = new Tile(10, 13);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 53) {
                t = new Tile(11, 13);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 54) {
                t = new Tile(12, 13);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 55) {
                t = new Tile(13, 13);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 41) {
                t = new Tile(14, 13);
                collisionMap[i].push(false);
			} else if(mapArray[i][j] == 43) {
                t = new Tile(15, 13);
                collisionMap[i].push(false);
			} else if(mapArray[i][j] == 37) {
                t = new Tile(0, 14);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 38) {
                t = new Tile(1, 14);
                collisionMap[i].push(true);
			} else if(mapArray[i][j] == 39) {
				t = new Tile(0, 15);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 40) {
				t = new Tile(1, 15);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 60) {
				t = new Tile(2, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 61) {
				t = new Tile(3, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 62) {
				t = new Tile(4, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 63) {
				t = new Tile(5, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 64) {
				t = new Tile(6, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 65) {
				t = new Tile(2, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 66) {
				t = new Tile(3, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 67) {
				t = new Tile(4, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 68) {
				t = new Tile(7, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 69) {
				t = new Tile(8, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 70) {
				t = new Tile(9, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 71) {
				t = new Tile(10, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 71) {
				t = new Tile(10, 14);
				collisionMap[i].push(true);
				
			// East facing door
			} else if(mapArray[i][j] == 72) {
				t = new Tile(11, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 73) {
				t = new Tile(11, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 74) {
				t = new Tile(12, 14);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 75) {
				t = new Tile(12, 15);
				collisionMap[i].push(false);
				
				
			// West facing door
			} else if(mapArray[i][j] == 76) {
				t = new Tile(14, 14);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 77) {
				t = new Tile(14, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 78) {
				t = new Tile(13, 14);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 79) {
				t = new Tile(13, 15);
				collisionMap[i].push(false);
				
			// North facing door
			} else if(mapArray[i][j] == 80) {
				t = new Tile(5, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 81) {
				t = new Tile(6, 15);
				collisionMap[i].push(true);
			} else if(mapArray[i][j] == 82) {
				t = new Tile(7, 15);
				collisionMap[i].push(false);
			} else if(mapArray[i][j] == 83) {
				t = new Tile(8, 15);
				collisionMap[i].push(false);
				
			} else {
                t = new Tile(0, 0);
                collisionMap[i].push(false);
            }

      t.elem.style.width = scaleFact * 16 + "px";
      t.elem.style.height = scaleFact * 16 + "px";
      t.elem.style.backgroundSize = scaleFact * 16 * 16 + "px " + scaleFact * 16 * 16 + "px";
      t.elem.style.backgroundPosition = scaleFact * -16 * t.offX + "px " + scaleFact * -16 * t.offY + "px";
      cont.appendChild(t.elem);
      tiles.push(t);
		}
	}
}

function tileCollide() {

}


var viewport = new Vector2(0, 0);
