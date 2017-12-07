function Bomb(){
	GameObject.call(this);
	this.damage = 10;
	this.size = new Vector2(16, 16);
	this.timer = 3;
}

Bomb.prototype = Object.create(GameObject.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function(deltaTime){
	
	this.timer -= deltaTime;
	
	if(this.timer <= 0){
		var db = new DmgBox(this, 1/5, this.damage);
		db.position = this.position;
		db.size = size;
		delObject(db);
		this.timer = 3;
	}
	
}

Bomb.prototype.draw = function() {
	this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";

    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);
}

var bombAnim = {
	"sheetURL": "assets/explosion.png",
    "sheet":[432, 384], // Size of spritesheet in px
    "cell":[48, 48],    // Size of each cell in px
    "offset":[-16,-25],
}

function Arrow(){
	GameObject.call(this);
	this.dir;
	this.velocity;
	this.damage = 4;
	this.creator;
}

Arrow.prototype = Object.create(GameObject.prototype);
Arrow.prototype.constructor = Arrow;