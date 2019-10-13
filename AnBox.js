function AnBox(animSet, anim) {
	GameObject.call(this);
	this.animator = new Animator(animSet, this);
	this.animator.setAnim(anim);
	this.animator.play();
	this.size = this.animator.cell;
	this.canCollide = false;
}

// Inherit from GameObject
AnBox.prototype = Object.create(GameObject.prototype);
AnBox.prototype.constructor = AnBox;

AnBox.prototype.update = function(deltaTime) {
	if (this.animator.playing == false) {
		// Delete self
		delObject(this);
	}
}

AnBox.prototype.draw = function(deltaTime) {
	this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";
	
    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);
}