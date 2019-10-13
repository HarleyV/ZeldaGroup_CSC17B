//Object that plays looping music
function music() {
  this.musicIntro = new Audio();
  this.musicLoop = new Audio();
}

//Plays music
music.prototype.musicPlay = function() {
  var musicLoop = this.musicLoop;
  this.musicIntro.play();

  this.musicIntro.onended = function() {
    musicLoop.loop = true;
    musicLoop.play();
  }
}

//Stops the music and resets the current time
music.prototype.musicStop = function() {
  this.musicIntro.pause();
  this.musicIntro.currentTime = 0;
  this.musicIntro.volume = 1;

  this.musicLoop.pause();
  this.musicLoop.currentTime = 0;
  this.musicLoop.volume = 1;
}

//The following function doesn't necessarilly puase the music, it just lowers the volume
//To be used when player puases game, or recieves item from chest (when text displays what player recieved)
music.prototype.musicPause = function() {
  this.musicIntro.volume = .15;
  this.musicLoop.volume = .15;
}

music.prototype.musicResume = function() {
  this.musicIntro.volume = 1;
  this.musicLoop.volume = 1;
}

//Overworld Music
function overworld() {
  music.call(this);
  this.musicIntro = new Audio("assets/music/overworld_intro.mp3");
  this.musicLoop = new Audio("assets/music/overworld_loop.mp3");
}

// Inherit from Music
overworld.prototype = Object.create(music.prototype);
overworld.prototype.constructor = overworld;

//Music played when in save state menu
function saveMenu() {
  music.call(this);
  this.musicIntro = new Audio("assets/music/save_menu_intro.mp3");
  this.musicLoop = new Audio("assets/music/save_menu_loop.mp3");
}

// Inherit from Music
saveMenu.prototype = Object.create(music.prototype);
saveMenu.prototype.constructor = saveMenu;

//Music played in dungeon
function dungeon() {
  music.call(this);
  this.musicIntro = new Audio("assets/music/dungeon_intro.mp3");
  this.musicLoop = new Audio("assets/music/dungeon_loop.mp3");
}

// Inherit from Music
dungeon.prototype = Object.create(music.prototype);
dungeon.prototype.constructor = dungeon;

//Music played for fighting enemies in first room (optional, does not have to be used)
function roomOne() {
  music.call(this);
  this.musicIntro = new Audio("assets/music/room_one_intro.mp3");
  this.musicLoop = new Audio("assets/music/room_one_loop.mp3");
}

// Inherit from Music
roomOne.prototype = Object.create(music.prototype);
roomOne.prototype.constructor = roomOne;

//Boss Fight Music
function bossFight() {
  music.call(this);
  this.musicIntro = new Audio("assets/music/battle_intro.mp3");
  this.musicLoop = new Audio("assets/music/battle_loop.mp3");
}

// Inherit from Music
bossFight.prototype = Object.create(music.prototype);
bossFight.prototype.constructor = bossFight;

//Music variables are all created
//Just play, pause, resume, or stop wherever you need them to
var overworld = new overworld();
var saveMenu = new saveMenu();
var dungeon = new dungeon();
var roomOne = new roomOne();
var bossFight = new bossFight();
