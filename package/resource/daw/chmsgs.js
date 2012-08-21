(function() {
	var dm = document.getElementById('d_menu');
	dm.onmouseout = function(e) {
		if (e.relatedTarget.id != "d_menu") return false;
		top.CloseCMenu(window, window.event);
	};
})();
