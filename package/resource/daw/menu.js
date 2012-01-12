function correctOnMouseOut(event) {
	e = event.toElement || event.relatedTarget;
	if (e.parentNode == this || e == this) {
		return;
	}
	this.oldOnMouseOut(event);
}

(function() {
	//Fix menu
	var menu_ref = document.getElementById('menu_ref');
	if(menu_ref) {
		var div_menu = document.getElementById('div_menu');

		var out = menu_ref.onmouseout;
		var over = menu_ref.onmouseover;

		menu_ref.onmouseout = null;
		div_menu.oldOnMouseOut = out;
		div_menu.onmouseout = correctOnMouseOut;
	}
});