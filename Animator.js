function Animation() {
    this.name = "";
	this.nFrames = 0;
    this.loop = false;
	this.intervals = [];
	this.frames = [];
}

// animSet -> Set of animations
function Animator(animSet, obj) {
    this.sheetURL = animSet.sheetURL;
	this.timer = 0; // Time of current frame
	this.frame = 0; // Current frame
    this.anim = null; // Current animation
	this.anims = {}; // List of animations
    this.playing = false; // Whether the animation is playing

    // Load in the animations from the given animation object
    this.cell = new Vector2(animSet.cell[0], animSet.cell[1]);
    this.sheet = new Vector2(animSet.sheet[0], animSet.sheet[1]);

    for (var a in animSet.anims) {
        var anim = new Animation();
        anim.name = a;
        anim.nFrames = animSet.anims[a].nFrames;
        anim.loop = animSet.anims[a].loop;
        anim.intervals = animSet.anims[a].intervals;
        for (var j = 0; j < animSet.anims[a].frames.length; j++) {
            anim.frames.push(new Vector2(animSet.anims[a].frames[j][0], animSet.anims[a].frames[j][1]));
        }

        this.anims[a] = anim;
    }

    // Set up the GameObject for the animation
    obj.spriteSize = this.cell;
    obj.spriteOff = new Vector2(animSet.offset[0], animSet.offset[1]);
    obj.elem.style.backgroundImage = "url('" + this.sheetURL + "')";
    obj.elem.style.width = scaleFact * obj.spriteSize.x + "px";
    obj.elem.style.height = scaleFact * obj.spriteSize.y + "px";
    obj.elem.style.backgroundSize = scaleFact * this.sheet.x + "px " + scaleFact * this.sheet.y + "px";

}

Animator.prototype.update = function(deltaTime, obj) {
	this.timer += deltaTime;

	if (this.frame > this.anim.nFrames - 1) {
        if (this.anim.loop) {
            this.frame = 0;
        } else {
            this.playing = false;
        }
	}

	while (this.playing && this.timer >= this.anim.intervals[this.frame]) {
		this.timer -= this.anim.intervals[this.frame];
		this.frame++;
		if (this.frame > this.anim.nFrames - 1) {
			if (this.anim.loop) {
				this.frame = 0;
			} else {
				this.playing = false;
			}
		}
		if (this.playing) {
			// Update
			obj.sprite = new Vector2(this.anim.frames[this.frame].x * this.cell.x * scaleFact,
									 this.anim.frames[this.frame].y * this.cell.y * scaleFact);
		}
	}


}

Animator.prototype.setAnim = function(name) {
    this.anim = this.anims[name];
    timer = 0;
    frame = 0;
}

Animator.prototype.play = function() {
    this.playing = true;
}

Animator.prototype.reset = function() {
    timer = 0;
    frame = 0;
}

Animator.prototype.stop = function() {
    this.playing = false;
}


var gobAnim = {
    "sheetURL": "assets/goblin_sheet.png",
    "sheet":[220, 25], // Size of spritesheet in px
    "cell":[22, 25],    // Size of each cell in px
    "offset":[-3,-15],
    "anims": {
        "idle_down": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[4,0]] },
        "idle_up": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[7,0]] },
        "idle_left": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[1,0]] },
        "idle_right": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[3,0]] },
        "walk_left": {
            "loop": true,
            "nFrames": 2,
            "intervals": [0.1, 0.1],
            "frames": [[0,0], [1,0]] },
        "walk_right": {
            "loop": true,
            "nFrames": 2,
            "intervals": [0.1, 0.1],
            "frames": [[2,0], [3,0]] },
        "walk_down": {
            "loop": true,
            "nFrames": 4,
            "intervals": [0.07, 0.07, 0.07, 0.07],
            "frames": [[4,0], [5,0], [4,0], [6,0]] },
        "walk_up": {
            "loop": true,
            "nFrames": 4,
            "intervals": [0.07, 0.07, 0.07, 0.07],
            "frames": [[7,0], [8,0], [7,0], [9,0]] },
        }
    };

var poofAnim = {
    "sheetURL": "assets/poof_sheet.png",
    "sheet":[182, 32], // Size of spritesheet in px
    "cell":[26, 32],    // Size of each cell in px
    "offset":[0,0],
    "anims": {
        "poof": {
            "loop": false,
            "nFrames": 7,
            "intervals": [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05],
            "frames": [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0]] },
	}
};
	
var linkAnim = {
    "sheetURL": "assets/link_sheet.png",
    "sheet":[432, 384], // Size of spritesheet in px
    "cell":[48, 48],    // Size of each cell in px
    "offset":[-16,-25],
    "anims": {
        "idle_down": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,4]] },
        "idle_up": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,5]] },
        "idle_right": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,6]] },
        "idle_left": {
            "loop": true,
            "nFrames": 1,
            "intervals": [0.1],
            "frames": [[0,7]] },
        "walk_down": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[1,4], [2,4], [3,4], [4,4], [5,4], [6,4], [7,4], [8,4]] },
        "walk_up": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[1,5], [2,5], [3,5], [4,5], [5,5], [6,5], [7,5], [8,5]] },
        "walk_right": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[0,6], [1,6], [2,6], [3,6], [4,6], [5,6], [6,6], [7,6]] },
        "walk_left": {
            "loop": true,
            "nFrames": 8,
            "intervals": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
            "frames": [[0,7], [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7]] },
		"attack_down": {
            "loop": false,
            "nFrames": 9,
            "intervals": [1/60, 1/60, 1/60, 1/60, 1/60, 4/60, 1/60, 1/60, 1/60],
            "frames": [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0]] },
        "attack_up": {
            "loop": false,
            "nFrames": 9,
            "intervals": [1/60, 1/60, 1/60, 1/60, 1/60, 4/60, 1/60, 1/60, 1/60],
            "frames": [[0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1]] },
        "attack_right": {
            "loop": false,
            "nFrames": 9,
            "intervals": [1/60, 1/60, 1/60, 1/60, 1/60, 4/60, 1/60, 1/60, 1/60],
            "frames": [[0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2]] },
        "attack_left": {
            "loop": false,
            "nFrames": 9,
            "intervals": [1/60, 1/60, 1/60, 1/60, 1/60, 4/60, 1/60, 1/60, 1/60],
            "frames": [[0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3]] },
        }
    };
