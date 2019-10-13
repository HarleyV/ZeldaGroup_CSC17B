$(document).ready(function() {
	initWindow();
});

function initWindow() {
    console.log('working...');
    var main = document.getElementById('main');
    var hearts = 10;
    var item = 0;
    main.appendChild(LifeBar(hearts));
    main.appendChild(ItemBar(item,12));
    main.appendChild(ItemHUD());
}

// potion, bow, bomb
var itemImages = [
	'img/bomb.png',
	'img/bow.png',
	'img/potion.png'
];