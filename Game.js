var lastTime; // Used to calculate deltaTime

var objs = []; // List of all GameObjects
var delList = [];

var scaleFact; // Amount to scale

var colBoxes = false;

// Calculate the scaling factor
function calcScaling() {
    var oldFact = scaleFact; // Save the scale factor before we change it
    var min; // The smaller viewport dimension in px
    var des; // "desired" viewport dimension in px

    viewport = new Vector2(window.innerWidth, window.innerHeight);
    // Find the right values
    if (window.innerWidth <= window.innerHeight) {
        min = window.innerWidth;
        des = 256;
	} else {
		min = window.innerHeight;
		des = 225;
	}

    // Calculate, floor the value so we get an integer
	scaleFact = Math.floor(min / des);

    // Make sure the factor isn't 0 or negative
	if (scaleFact < 1) scaleFact = 1;

    // if the factor changed, resize all elements
    if (scaleFact !== oldFact) {
        // Resize the elements
        //console.log(scaleFact);

		// Resize the map
		var cont = document.getElementById('map');
		cont.style.height = mapArray.length * 16 * scaleFact + "px";
		cont.style.width = mapArray[0].length * 16 * scaleFact + "px";

		for (var i = 0; i < tiles.length; i++) {
			tiles[i].elem.style.width = scaleFact * 16 + "px";
			tiles[i].elem.style.height = scaleFact * 16 + "px";
			tiles[i].elem.style.backgroundSize = scaleFact * 16 * 16 + "px " + scaleFact * 16 * 16 + "px";
			tiles[i].elem.style.backgroundPosition = scaleFact * 16 * tiles[i].offX + "px " + scaleFact * 16 * tiles[i].offY + "px";
		}

		for (var i = 0; i < objs.length; i++) {
            objs[i].elem.style.width = scaleFact * objs[i].spriteSize.x + "px";
            objs[i].elem.style.height = scaleFact * objs[i].spriteSize.y + "px";
            objs[i].resize();
		}
        if (player) {
            player.resize();
            player.elem.style.width = scaleFact * player.spriteSize.x + "px";
            player.elem.style.height = scaleFact * player.spriteSize.y + "px";
            player.elem.style.backgroundSize = scaleFact * player.animator.sheet.x + "px " + scaleFact * player.animator.sheet.y + "px";
        }
    }
}

window.onload = function () {
	calcScaling();
	entMain(0);
	dungeon.musicPlay()
}

window.onresize = calcScaling;

// Instance the player
var player = new Player("Player");
objs.push(player);

// Camera position
var camPos = new Vector2(0, 0);


function delObject(obj) {
	if (obj.active) {
		obj.active = false;
		delList.push(obj);
	}
}

function cullObjects() {
	for (var i = 0; i < delList.length; i++) {
		document.body.removeChild(delList[i].elem);

		if (colBoxes) {
			document.body.removeChild(delList[i].box);
		}

		objs.splice(objs.indexOf(delList[i]), 1);
		//console.log("object deleted");
	}
	
	// Clear the list
	delList = [];
}

// All game logic, physics, input, ai, etc
function update(deltaTime) {
    for (i = 0; i < objs.length; i++) {
        objs[i].update(deltaTime);
    }

	cullObjects();
	
    // Physics
    var dt = deltaTime;
	for (i = 0; i < objs.length; i++) {

        if (objs[i].canCollide == false) {
            for (j = 0; j < objs.length; j++) {
                if (i != j) {
                    if (collides(objs[i], objs[j])) {
                        objs[i].collide(objs[j]);
                        objs[j].collide(objs[i]);
                    }
                }
            }
        } else if (objs[i].velocity.x != 0 || objs[i].velocity.y != 0){

            var t = {t:-1, ax: false};
            var hit;
            for (j = 0; j < objs.length; j++) {
                if (i != j && objs[j].canCollide == true) {
                    var _t = phys(objs[i], objs[j], dt);
                    if (_t.t >= 0 && (_t.t < t.t || t.t < 0)) {
                        t = _t;
                        hit = objs[j];
                    }
                }
            }

            for (var j = 0; j < collisionMap.length; j++) {
                for (var k = 0; k < collisionMap[j].length; k++) {
                    if (collisionMap[j][k] == true) {
                        // Create a spoof gameobject for the phys function
                        var temp = {position: new Vector2(k * 16, j * 16), size: new Vector2(16,16)};
                        var _t = phys(objs[i], temp, dt);
                        if (_t.t >= 0 && (_t.t < t.t || t.t < 0)) {
                            t = _t;
                            hit = null;
                        }
                    }
                }
            }

            var mag = objs[i].velocity.magnitude();
            if (t.t >= 0 && mag > 0) {
                var dir = objs[i].velocity.normalize();

                objs[i].position = objs[i].position.add(dir.mul(t.t));

                // Check the axis the collision happened on
                if (t.ax) {
                    objs[i].velocity.y = 0;
                } else {

                    objs[i].velocity.x = 0;
                    //objs[i].velocity.y = 100;// objs[i].velocity.y * (1- Math.abs(dir.y));
                }

                // If collision was with another obj, call the collide function
				objs[i].collide(hit);
                if (hit != null) {
                    hit.collide(objs[i]);
                }


                // Basically repeat collision for this obj until dt <= 0
                dt -= dt * (t.t/mag);
                if (dt > 0) {
                    i--;
                    continue;
                }

            } else {
                //if (mag > 0) console.log("no t + " + t.t);
                objs[i].position = objs[i].position.add(objs[i].velocity.mul(dt));
            }
        }
        dt = deltaTime;
    }

	cullObjects();
	
    pInput = Object.assign(pInput, input);
}

function draw(deltaTime) {
	for (i = 0; i < objs.length; i++) {
		objs[i].draw(deltaTime);
	}
  //camPos = new Vector2(player.position.x - viewport.x / (2 * scaleFact), player.position.y - viewport.y / (2 * scaleFact));

  if (player.position.x < camPos.x + viewport.x / (3 * scaleFact)) {
    camPos.x = player.position.x - viewport.x / (3 * scaleFact);
  }

  if (player.position.x > camPos.x + 2 * viewport.x / (3 * scaleFact)) {
    camPos.x = player.position.x - 2 * viewport.x / (3 * scaleFact);
  }

  if (player.position.y < camPos.y + viewport.y / (3 * scaleFact)) {
    camPos.y = player.position.y - viewport.y / (3 * scaleFact);
  }

  if (player.position.y > camPos.y + 2 * viewport.y / (3 * scaleFact)) {
    camPos.y = player.position.y - 2 * viewport.y / (3 * scaleFact);
  }

     // Will also need to handle a moving camera
	player.draw(deltaTime);

  var cont = document.getElementById('map');


  cont.style.left = -camPos.x * scaleFact + "px";
  cont.style.top = -camPos.y * scaleFact + "px";

    // TODO: Map drawing
}
var slow = false;

// Main loop function
// Called as often as it can be
function loop() {
    // Get the delta time
    // This is just the time that has passed since the last loop() call
    // in seconds
    // It will typically be 1/60
    var deltaTime = 0.0;
    if (typeof lastTime !== "undefined") {
        deltaTime = (Date.now() - lastTime) / 1000.0;
    } else {
        deltaTime = 0;
    }
    lastTime = Date.now();

    if (slow == true) deltaTime /= 58;

    // Get the fps, just cause
    var fps = 1 / deltaTime;
    //if (fps < 40) console.log("Stutter " + deltaTime * 1000 + " ms " + fps + " fps");

    // Call the update function, all game logic, physics, input, ai, etc
    update(deltaTime);

    // Draw the changes
    // Really this just updates the CSS of the HTML objects
    draw(deltaTime);

    // Let the browser update and then recall the loop function
    requestAnimationFrame(loop);
}

// Jump into the loop, start the game
requestAnimationFrame(loop);
