// Basic GameObject class to represent all on-screen entities
function GameObject(name) {
    this.name = name;                      // Simple name identifier
	this.active = true;
    this.position = new Vector2(0, 0); // Position in world space of object
    this.velocity = new Vector2(0, 0); // Velocity
    this.size = new Vector2(10, 10); // Width and Height of the object
    this.canCollide = true; // Whether the object has collisions

    this.spriteSize = new Vector2(0, 0); // Size of sprite
    this.spriteOff = new Vector2(0, 0); // Offset of sprite from center of object
    this.sprite = new Vector2(0, 0); // Pixels to offset sprite on sheet

    // Generate the DOM object
	this.elem = document.createElement("div");
	this.elem.className = "gameobject";
    document.body.appendChild(this.elem);

    if (colBoxes) {
        this.box = document.createElement("div");
        this.box.className = "colBox";
        document.body.appendChild(this.box);
    }
}

GameObject.prototype.update = function(deltaTime) {}; // Nothing for now

GameObject.prototype.collide = function(obj) {
	// For arrow
	/*if (obj is enemy) {
		damage enemy
		delete self
	}

	if (timer > 3.0f) {
		create damage area
		delete self
	}*/

}

// Called when the scaleFact changes
GameObject.prototype.resize = function() {
    this.elem.style.width = scaleFact * this.spriteSize.x + "px";
    this.elem.style.height = scaleFact * this.spriteSize.y + "px";
    this.elem.style.backgroundSize = scaleFact * this.spriteSize.x + "px " + scaleFact * this.spriteSize.y + "px";

    if (colBoxes) {
        this.box.style.width = scaleFact * this.size.x - 2 + "px";
        this.box.style.height = scaleFact * this.size.y - 2 + "px";
    }
}

// Simply update the position of the corresponding element
GameObject.prototype.draw = function(deltaTime) {
    var pos = this.position.sub(camPos);
    this.elem.style.left = scaleFact * (pos.x + this.spriteOff.x) + "px";
    this.elem.style.top = scaleFact * (pos.y + this.spriteOff.y) + "px";
    this.elem.style.zIndex = Math.floor(this.position.y);

    if (colBoxes) {
        this.box.style.left = scaleFact * pos.x + "px";
        this.box.style.top = scaleFact * pos.y + "px";
            this.box.style.width = scaleFact * this.size.x - 2 + "px";
            this.box.style.height = scaleFact * this.size.y - 2 + "px";
    }
}
