function LifeBar(hearts) {

	console.log("this got called");
	
    var body = "<div class='life-bar'>";
	var div;
	if (document.getElementById("life")) {
		div = document.getElementById("life");
	} else {
		
		div = document.createElement('div');
		div.id = "life";
	}
	

    for (var i = 0; i < hearts; i++) {
        body += Heart();
    }
    body += "</div>";
    div.innerHTML = body;
    return div;
}
