// EntityLiving classes
// Used for all 'living' entities
// Such as the player and enemies
// Maybe eventually move to its own file
function EntityLiving() {
     GameObject.call(this);
     this.health = 30;
     this.immunity = 0; // immunity timer
	 this.moveSpeed = 100;
}

// Inherit from GameObject
EntityLiving.prototype = Object.create(GameObject.prototype);
EntityLiving.prototype.constructor = EntityLiving;

// Just damage the living entity
EntityLiving.prototype.damage = function(amount) {
    if (this.immunity <= 0) {
         this.health -= amount;
         this.immunity = 1;
		 this.hurtSound.play();
         if (this.health <= 0) {
              // Entity dead
              // Do something
			  var an = new AnBox(poofAnim, "poof");
			  an.position = this.position.sub(new Vector2((an.size.x - this.size.x) / 2,(an.size.y - this.size.y) / 2));
			  objs.push(an);
			  delObject(this);
			  enemyKilled.play();
         }
    }
}

EntityLiving.prototype.update = function(deltaTime) {
    //if (this.immunity > 0)
}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

EntityLiving.prototype.draw = function(deltaTime) {
    if (this.immunity > 0) {
        var t = Math.floor(this.immunity * 9) % 2;
        if (t == 1) {
            addClass(this.elem, "damaged");
        } else {
            removeClass(this.elem, "damaged");
        }


        this.immunity -= deltaTime;
    }

    GameObject.prototype.draw.call(this, deltaTime);
}

function Player() {
     EntityLiving.call(this);
     this.size = new Vector2(16, 10);
     this.animator = new Animator(linkAnim, this);
     this.animator.setAnim("idle_down");
	 this.hurtSound = linkHurt;
	 this.cooldown = 0;
	 this.health = 100;

     this.dir = 0;                          // Represents the direction
	 this.item = 0;
	 this.qty = [12, 12, 12];
      // 0 -> down
      // 1 -> right
      // 2 -> up
      // 3 -> left

     // TODO: Add inventory
}

// Inherit from EntityLiving
Player.prototype = Object.create(EntityLiving.prototype);
Player.prototype.constructor = Player;

/*Player.prototype.bomb = function() {
	var b = new Bomb();
	b.position = in front of player;

	objs.push(b);
}*/

Player.prototype.damage = function(amount) {
	EntityLiving.prototype.damage.call(this, amount);
	
	LifeBar(Math.floor(this.health / 10));
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

         if (swordSlash.playing) swordSlash.stop();
		 swordSlash.play();

         // Create damage box
         var db = new DmgBox(this, 1/5, 10);
         db.position = this.position.add(pos);
         db.size = size;
         objs.push(db);

     }


	 if (input.use && !pInput.use && this.cooldown <= 0) {

		 var pos;
         if (this.dir == 0) {
             pos = new Vector2(2, 14);
         } else if (this.dir == 1) {
             pos = new Vector2(20, -1);
         } else if (this.dir == 2) {
             pos = new Vector2(2, -14);
         } else if (this.dir == 3) {
             pos = new Vector2(-16, -1);
         }
         
         var btemp = {position: this.position.add(pos), size: new Vector2(12, 12)};
         var col = false;

         for (var j = 0; j < collisionMap.length; j++) {
             for (var k = 0; k < collisionMap[j].length; k++) {
                 if (collisionMap[j][k] == true) {
                     // Create a spoof gameobject for the collides function
                     var temp = {position: new Vector2(k * 16, j * 16), size: new Vector2(16, 16)};
                     if (collides(btemp, temp) == true) {
                         col = true;
                         break;
                     }
                 }
             }
         }

         if (col == false) {
			 if (this.item != 2) {
				 if (this.qty[this.item] > 0) {
					 this.cooldown = 2;
					 var _bomb;
					 if (this.item == 0) {
						 _bomb = new Bomb();
					 bombDrop.play();
					 }
					 else if (this.item == 1) {
						 _bomb = new Arrow(this.dir);
						 arrowShoot.play();
					 }
					 _bomb.position = btemp.position;
					 objs.push(_bomb);
					 this.qty[this.item] -= 1;
					 ItemBar(this.item, this.qty[this.item]);
					 ItemHUD();
				 }
			 } else {
				 if (this.qty[2] > 0) {
					 this.health += 10;
					 if (this.health > 100) this.health = 100;
					 LifeBar(Math.floor(this.health / 10));
					 this.qty[2] -= 1;
					 ItemBar(this.item, this.qty[2]);
					 ItemHUD();
					 potionHeal.play();
				 }
			 }
         } else {
             pauseOpen.play();
         }

		 /*// Call item function
		 if (bow equiped) {
			 // Bow function
		 } else if (bomb equipped) {
			 // Bomb function
		 }*/
	 } else {
		 this.cooldown -= deltaTime;
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
     move = move.mul(speed);
     if (this.immunity <= 0.75)
        this.velocity = move;

     EntityLiving.prototype.update.call(this, deltaTime);
}

Player.prototype.draw = function(deltaTime) {
    this.animator.play();
    this.animator.update(deltaTime, this);

 	this.elem.style.backgroundPosition = -this.sprite.x + "px " + -this.sprite.y + "px";

    // Call the base version of the draw
    EntityLiving.prototype.draw.call(this, deltaTime);
}
