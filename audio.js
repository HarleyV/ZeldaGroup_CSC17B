//non-segmented music
var bossClear = new Audio("assets/music/boss_clear_fanfare.mp3");
var mainTitle = new Audio("assets/music/main_title.mp3");
mainTitle.loop = true; //MainTitle simply loops

//Puase Menu Sounds
var pauseOpen = new Audio("assets/soundEffects/pause_open.wav");
var pauseClose = new Audio("assets/soundEffects/pause_close.wav");
var menu_select = new Audio("assets/soundEffects/menu_select.wav");
var save_quit = new Audio("assets/soundEffects/save_quit.wav");

//Sound Effects for link and actions
var swordSlash = new Audio("assets/soundEffects/slash.wav");

var bombDrop = new Audio("assets/soundEffects/bomb_drop.wav");
var bombExplode = new Audio("assets/soundEffects/bomb_blow.wav");

var arrowShoot = new Audio("assets/soundEffects/arrow_shoot.wav");
var arrowHit = new Audio("assets/soundEffects/arrow_hit.wav");

var potionHeal = new Audio("assets/soundEffects/potion_heal.wav");

var openChest = new Audio("assets/soundEffects/chest_open.wav");
var itemFanfare = new Audio("assets/soundEffects/item_fanfare.wav"); //Play this sound after the openChest sound
var getKey = new Audio("assets/soundEffects/get_key.wav"); //If there are no keys implemented in game, just delete this

var linkHurt = new Audio("assets/soundEffects/link_hurt.wav");
var linkDies = new Audio("assets/soundEffects/link_dying.wav");

var secret = new Audio("assets/soundEffects/secret.wav"); //sound played after player discovers secret, finishes puzzle, etc.

var switchActivate = new Audio("assets/soundEffects/switch_activate.wav"); //sound for when switch is activated

var lowHealth = new Audio("assets/soundEffects/low_health.wav"); //loops when health is low

//Entities Sound Effects
var enemyChase = new Audio("assets/soundEffects/enemy_chase.wav");
var enemyHit = new Audio("assets/soundEffects/enemy_hit.wav");
var enemyKilled = new Audio("assets/soundEffects/enemy_kill.wav");
var enemySkitter = new Audio("assets/soundEffects/enemy_skitter.wav");
var bossHit = new Audio("assets/soundEffects/boss_hit.wav");

//Other Sound Effects
var dungeonOpen = new Audio("assets/soundEffects/dungeon_open.wav");
var doorOpen = new Audio("assets/soundEffects/door_open.wav");
var doorClose = new Audio("assets/soundEffects/door_close.wav");
var shatter = new Audio("assets/soundEffects/shatter.wav"); //for when boulder shatters (explodes)

//Stop function for sound effects
Audio.prototype.stop = function(){
  this.pause();
  this.currentTime = 0;
}
