function ItemHUD() {
    var body = "<div class='item-hud'>";
	
	var div;
	if (document.getElementById("hud")) {
		div = document.getElementById("hud");
	} else {
		
		div = document.createElement('div');
		div.id = "hud";
	}
	
    body += HUDItem(0,player.qty[0]);
    body += HUDItem(1,player.qty[1]);
    body += HUDItem(2,player.qty[2]);
    body += "</div>";
    div.innerHTML = body;
    return div;
}