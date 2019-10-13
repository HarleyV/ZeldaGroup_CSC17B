// Basic button input bools
// true -> pressed
var input = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    use: false };

// Previous state of input
var pInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    attack: false,
    use: false };

// Basic event listereners to update the corresponding value in 'input'
// This way 'input' will always contain the state of each button.
// http://keycode.info/ to get keycodes
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
         input.left = true;
    } else if(event.keyCode == 39) {
         input.right = true;
    } else if(event.keyCode == 40) {
         input.down = true;
    } else if(event.keyCode == 38) {
         input.up = true;
    } else if(event.keyCode == 32) {
         input.attack = true;
    } else if(event.keyCode == 90) {
         input.use = true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
         input.left = false;
    } else if(event.keyCode == 39) {
         input.right = false;
    } else if(event.keyCode == 40) {
         input.down = false;
    } else if(event.keyCode == 38) {
         input.up = false;
    } else if(event.keyCode == 32) {
         input.attack = false;
    } else if(event.keyCode == 90) {
         input.use = false;
    }
});
