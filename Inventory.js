function Bomb() {
	GameObject.call(this);
    this.animator = new Animator(bombAnim, this);
    this.animator.setAnim("explode");
	this.animator.play();
	this.damage = 40;
	this.size = new Vector2(12, 12);
	this.canCollide = false;
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.resize = function() {
    this.elem.style.width = scaleFact * this.spriteSize.x + "px";
    this.elem.style.height = scaleFact * this.spriteSize.y + "px";
    this.elem.style.backgroundSize = scaleFact * this.animator.sheet.x + "px " + scaleFact * this.animator.sheet.y + "px";
}

Bomb.prototype.update = function(deltaTime){

	if (this.animator.frame >= 24) {
		var db = new DmgBox(this, 0.1, this.damage, 400);
		db.position = this.position.sub(new Vector2(16,17));
		db.size = new Vector2(44, 46);
		//if(db.collide(obj) && obj )
		objs.push(db);
		//delObject(db);
		this.timer = 3;

		bombExplode.play();
	}
	if (this.animator.playing == false) {
		delObject(this);
	}
}

Bomb.prototype.draw = function(deltaTime) {
	this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";

    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);
}

var bombAnim = {
	"sheetURL": "assets/bomb_sheet.png",
    "sheet":[704, 46], // Size of spritesheet in px
    "cell":[44, 46],    // Size of each cell in px
    "offset":[-16,-21],
	"anims": {
	"explode": {
		"loop": false,
		"nFrames": 34,
		"intervals": [1, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
					  0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
					  0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05,
					  0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
		"frames": [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
				   [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
				   [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0],
				   [8,0], [9,0], [10,0], [9,0], [10,0], [11,0], [12,0], [13,0], [14,0], [15,0]] }

		}
};

function Arrow(_dir) {
	GameObject.call(this);
	this.dir = _dir;
	this.size = new Vector2(15, 15);
	this.elem.style.backgroundImage = "url('assets/arrow_sheet.png')";
	this.elem.style.backgroundSize = scaleFact * 60 + "px " + scaleFact * 15 + "px";
    this.elem.style.width = scaleFact * this.size.x + "px";
    this.elem.style.height = scaleFact * this.size.y + "px";
	this.speed = 150;
	this.damage = 15;
	
	this.life = 10;
	//this.canCollide = false;
}

Arrow.prototype = Object.create(GameObject.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.setVelocity = function() {
	if (this.dir === 0){
		this.velocity = new Vector2(0, this.speed);
		this.elem.style.backgroundPosition = 0 + "px 0px";
	} else if (this.dir === 1){
		this.velocity = new Vector2(this.speed, 0);
		this.elem.style.backgroundPosition = -45 * scaleFact + "px 0px";
	} else if (this.dir === 2){
		this.velocity = new Vector2(0, 0 - this.speed);
		this.elem.style.backgroundPosition = -15 * scaleFact + "px 0px";
	} else if (this.dir === 3){
		this.velocity = new Vector2(0 - this.speed, 0);
		this.elem.style.backgroundPosition = -30 * scaleFact + "px 0px";
	}
	//console.log(this.velocity);
}


Arrow.prototype.collide = function(obj) {
	if (obj != null) {
		if (obj instanceof EntityLiving && obj != player) {
			obj.damage(this.damage);
			// Knockback
			var centerCtr = new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
			var centerObj = new Vector2(obj.position.x + obj.size.x / 2, obj.position.y + obj.size.y / 2);
			//obj.velocity = centerObj.sub(centerCtr).normalize().mul(this.knockback);
			delObject(this);
		}
	} else {
		delObject(this);
	}
	
	arrowHit.play();
}

Arrow.prototype.update = function(deltaTime) {
	this.life -= deltaTime;
	if (this.life <= 0) {
		delObject(this);
	}
}

Arrow.prototype.draw = function(deltaTime) {
	//console.log("test");
    this.setVelocity();
    GameObject.prototype.draw.call(this, deltaTime);
}

