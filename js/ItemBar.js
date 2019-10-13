function ItemBar(indx, qty) {
    var body = "<div class='item-bar' id='itembar'>";
	
	var div;
	if (document.getElementById("itm")) {
		div = document.getElementById("itm");
	} else {
		
		div = document.createElement('div');
		div.id = "itm";
	}
	
    body += Item(indx,qty);
    body += "</div>";
    div.innerHTML = body;
    return div;
}