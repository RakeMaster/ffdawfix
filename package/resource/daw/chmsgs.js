ffAddOnLoad(function() {
	var dm = document.getElementById('d_menu');
	dm.onclick=function() {
		getTop().CloseCMenu(window, window.event);
	}
	dm.onmouseout = function(e) {
		if (e.relatedTarget.id != "d_menu") return false;
		getTop().CloseCMenu(window, window.event);
	};
});
