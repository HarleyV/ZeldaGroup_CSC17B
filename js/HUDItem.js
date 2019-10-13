function HUDItem(indx,qty) {
	var item = "<div class='hud-item-container'>";
    item += "<img src='"+itemImages[indx]+"' class='hud-item' onClick='hudItemClicked("+indx+")'>";
    item += "<p>"+qty+"<p>";
    item += "</div>";
    return item;
}

function hudItemClicked(indx) {
	console.log(indx);
	
	player.item = indx;
	$('.item-hud').fadeOut('slow');
	var itemBar = document.getElementById('itembar');
	itemBar.innerHTML = Item(indx,12);
}