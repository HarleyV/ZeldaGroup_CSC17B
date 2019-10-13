function DmgBox(creator, life, dmg, _knockback) {
	if (_knockback == undefined) _knockback = 200;
	
	GameObject.call(this);
	this.knockback = _knockback
    this.timer = life;
	this.creator = creator;
	this.dmg = dmg;
    this.canCollide = false;
}

// Inherit from GameObject
DmgBox.prototype = Object.create(GameObject.prototype);
DmgBox.prototype.constructor = DmgBox;

DmgBox.prototype.collide = function(obj) {
	if (obj != null) {
		if (obj instanceof EntityLiving && obj != this.creator) {
			obj.damage(this.dmg);

				//console.log(obj);
			// Knockback
			var centerCtr = new Vector2(this.creator.position.x + this.creator.size.x / 2, this.creator.position.y + this.creator.size.y / 2);
			var centerObj = new Vector2(obj.position.x + obj.size.x / 2, obj.position.y + obj.size.y / 2);
			obj.velocity = centerObj.sub(centerCtr).normalize().mul(this.knockback);
			//obj.velocity = new Vector2(0, 200);
		}
	}
}

DmgBox.prototype.update = function(deltaTime) {
	this.timer -= deltaTime;
	if (this.timer <= 0) {
		// Delete self
		delObject(this);
	}
}
