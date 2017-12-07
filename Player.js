// EntityLiving classes
// Used for all 'living' entities
// Such as the player and enemies
// Maybe eventually move to its own file
function EntityLiving() {
     GameObject.call(this);
     this.health = 10;
     this.immunity = 0; // immunity timer
	 this.moveSpeed = 100;
}

// Inherit from GameObject
EntityLiving.prototype = Object.create(GameObject.prototype);
EntityLiving.prototype.constructor = EntityLiving;

// Just damage the living entity
EntityLiving.prototype.damage = function(amount) {
    if (this.immunity > 0) {
         this.health -= amount;
         this.immunity = 2;
         if (this.health <= 0) {
              // Entity dead
              // Do something
         }
    }
}

EntityLiving.prototype.update = function(deltaTime) {
    if (this.immunity > 0) this.immunity -= deltaTime;
}

function Player() {
     EntityLiving.call(this);
     this.size = new Vector2(16, 10);
     this.animator = new Animator(linkAnim, this);
     this.animator.setAnim("idle_down");

     this.dir = 0;                          // Represents the direction
      // 0 -> down
      // 1 -> right
      // 2 -> up
      // 3 -> left

     this.elem.style.zIndex = 10;

     // inventory = [bow, bomb, potion]
	 this.inventory = [0, 0, 0];
	 
	 // Default Value is -1 for no item equiped 0 = bow, 1 = bomb, 2 = potion
	 this.equipedItem = -1;
}

// Inherit from EntityLiving
Player.prototype = Object.create(EntityLiving.prototype);
Player.prototype.constructor = Player;

Player.prototype.bomb = function() {
	var b = new Bomb();
	b.position = this.position;
	if (this.dir === 0) {
		b.position.y += 10;
	 } else if (this.dir === 1) {
		b.position.x += 16;
	 } else if (this.dir === 2) {
		b.position.y -= 10;
	 } else if (this.dir === 3) {
		b.position.x -= 16;
	 }
	objs.push(b);
}

Player.prototype.bow = function() {
	var a = new Arrow();
	a.dir = this.dir;
	
	
	
	objs.push(a);
}

Player.prototype.potion = function() {
	this.health += 5;
}

Player.prototype.useItem = function(item) {
	if(item === 0 ){
		this.bow();
	} else if(item === 1){
		this.bomb()
	} else if(item === 2){
		this.potion();
	}
}

Player.prototype.update = function(deltaTime) {
	 var speed = this.moveSpeed;


     var move = new Vector2(0, 0); // How much the player will move

     // If the player just hit the attack button, prepare for the attack
     // Check both attack and !pAttack so we can know this is the first frame
     // that the attack button was pressed
     if (input.attack && !pInput.attack && !this.animator.anim.name.startsWith("attack")) {
         var pos;
         var size;
         if (this.dir == 0) {
             this.animator.setAnim("attack_down");
             pos = new Vector2(-5, 3);
             size = new Vector2(30, 20);
         } else if (this.dir == 1) {
             this.animator.setAnim("attack_right");
             pos = new Vector2(12, -15);
             size = new Vector2(20, 30);
         } else if (this.dir == 2) {
             this.animator.setAnim("attack_up");
             pos = new Vector2(-9, -24);
             size = new Vector2(30, 20);
         } else if (this.dir == 3) {
             this.animator.setAnim("attack_left");
             pos = new Vector2(-16, -15);
             size = new Vector2(20, 30);
         }
         // Create damage box
         var db = new DmgBox(this, 1/5, 10);
         db.position = this.position.add(pos);
         db.size = size;
         objs.push(db);

     }


	 if (input.use && !pInput.use) {
		//this.useItem(this.equipedItem);
	 }

     if (this.animator.anim.name.startsWith("attack") && this.animator.playing == false) {
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
     }


     if (!this.animator.anim.name.startsWith("attack")) {
          // Add to the move vector based on input
          if (input.left) {
               move = move.sub(1, 0);
               this.dir = 3; // Set the direction
          }

          if (input.right) {
               move = move.add(1, 0);
               this.dir = 1;
          }

          if (input.up) {
               move = move.sub(0, 1);
               this.dir = 2;
          }

          if (input.down) {
               move = move.add(0, 1);
               this.dir = 0;
          }

          // Only play the walking animation if the walk vector isn't 0
          if (move.magnitude() > 0) {
			   if (this.dir == 0) {
				   this.animator.setAnim("walk_down");
			   } else if (this.dir == 1) {
				   this.animator.setAnim("walk_right");
			   } else if (this.dir == 2) {
				   this.animator.setAnim("walk_up");
			   } else if (this.dir == 3) {
				   this.animator.setAnim("walk_left");
			   }
          } else {
			   if (this.dir == 0) {
				   this.animator.setAnim("idle_down");
			   } else if (this.dir == 1) {
				   this.animator.setAnim("idle_right");
			   } else if (this.dir == 2) {
				   this.animator.setAnim("idle_up");
			   } else if (this.dir == 3) {
				   this.animator.setAnim("idle_left");
			   }
          }
     }

     move = move.normalize(); // Normalize so that diagonal movement isn't faster

     // We multiply the move vector by the speed and deltaTime
     // We do deltaTime so that the movement will remain consistent despite frame rate fluctuation
     // Basically it means we move in units per second, not units per frame
     move = move.mul(speed * deltaTime);

     player.position = player.position.add(move); // Finally add the move vector to the player position


     EntityLiving.prototype.update.call(this, deltaTime);
}

Player.prototype.draw = function(deltaTime) {
    // Animate the sprite
     /*var offY = 0;
     if (this.isAttacking) {
          this.animTimer += deltaTime;
          if (this.animTimer > 0.1) {
               this.animStage = 1;
          }
          if (this.animTimer > 0.2) {
               this.isAttacking = false;
          }

          offY = 60 + 24 * this.animStage;
          switch (this.dir) {
               // See GameObject.js to explain all this weird math
               case 0: this.spriteOff = new Vector2(0, offY / 168 * 100); break;
               case 1: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
               case 2: this.spriteOff = new Vector2(60 / 97 * 100, offY / 168 * 100); break;
               case 3: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
          }

     } else {

          if (this.isWalking) {
               this.animTimer += deltaTime;
               if (this.animTimer > 0.2) {
                    this.animTimer -= 0.2;
                    this.animStage = !this.animStage;
               }

               offY = 30 * this.animStage;
          } else {
               this.animTimer = 0;
          }


          switch (this.dir) {
               case 0: this.spriteOff = new Vector2(0, offY / 168 * 100); break;
               case 1: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
               case 2: this.spriteOff = new Vector2(60 / 97 * 100, offY / 168 * 100); break;
               case 3: this.spriteOff = new Vector2(30 / 97 * 100, offY / 168 * 100); break;
          }
     }*/

    this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";

    // Call the base version of the draw
    GameObject.prototype.draw.call(this, deltaTime);
}
