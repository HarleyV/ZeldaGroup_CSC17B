function Item(indx,qty) {
	var item = "<div class='item-container'>";
    item += "<img src='"+itemImages[indx]+"' class='item' onClick='itemClicked(" + indx + ")'>";
    item += "<p>"+qty+"<p>";
    item += "</div>";
    return item;
}

function itemClicked(indx) {
	if ($('.item-hud').css('display') == 'none') {
		$('.item-hud').fadeIn('slow', function(){
	    });
	} else {
		$('.item-hud').fadeOut('slow', function(){
    	});
	}
}