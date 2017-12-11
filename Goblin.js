function Goblin() {
     EntityLiving.call(this);
     this.size = new Vector2(16, 10);
     this.animator = new Animator(gobAnim, this);
     this.animator.setAnim("idle_down");
     this.moveSpeed = 80;

     this.dir = 0; // Represents the direction
      // 0 -> down
      // 1 -> right
      // 2 -> up
      // 3 -> left
}

// Inherit from EntityLiving
Goblin.prototype = Object.create(EntityLiving.prototype);
Goblin.prototype.constructor = Goblin;

Goblin.prototype.resize = function() {
    this.elem.style.width = scaleFact * this.spriteSize.x + "px";
    this.elem.style.height = scaleFact * this.spriteSize.y + "px";
    this.elem.style.backgroundSize = scaleFact * this.animator.sheet.x + "px " + scaleFact * this.animator.sheet.y + "px";
}

Goblin.prototype.update = function(deltaTime) {
	 var speed = this.moveSpeed;


     var move = new Vector2(0, 0); // How much the player will move

     var dist = this.position.distance(player.position);

     if (dist > 150) {
          if (this.dir == 0) {
              this.animator.setAnim("idle_down");
          } else if (this.dir == 1) {
              this.animator.setAnim("idle_right");
          } else if (this.dir == 2) {
              this.animator.setAnim("idle_up");
          } else if (this.dir == 3) {
              this.animator.setAnim("idle_left");
          }
          this.animator.play();
     } else {
          // Only play the walking animation if the walk vector isn't 0
          move = player.position.sub(this.position);
          if (move.magnitude() > 0) {

              var slope = move.y / move.x;
              if (slope > -1 && slope < 1) {
                  if (move.x > 0) {
       				   this.animator.setAnim("walk_right");
                       this.dir = 1;
                  } else {
                      this.animator.setAnim("walk_left");
                      this.dir = 3;
                  }
              } else {
                  if (move.y > 0) {
       				   this.animator.setAnim("walk_down");
                       this.dir = 0;
                  } else {
                      this.animator.setAnim("walk_up");
                      this.dir = 2;
                  }
              }
          }
     }

     move = move.normalize(); // Normalize so that diagonal movement isn't faster

     // We multiply the move vector by the speed and deltaTime
     // We do deltaTime so that the movement will remain consistent despite frame rate fluctuation
     // Basically it means we move in units per second, not units per frame
     move = move.mul(speed);
     this.velocity = move;

     EntityLiving.prototype.update.call(this, deltaTime);
}

Goblin.prototype.draw = function(deltaTime) {
    this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";

    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);
}
