ffAddOnLoad(function() {
	var msgtxt = document.getElementById('msgtxt');
	if(msgtxt) {
		msgtxt.parentNode.style.width = "";
		msgtxt.parentNode.style.right = "0px";
		msgtxt.style.MozUserSelect = "none";
	}

	var dm = document.getElementById('d_menu');
	dm.onclick = function() {
		getTop().CloseCMenu(window, window.event);
	}
	dm.onmouseout = function(e) {
		if (e.relatedTarget.id != "d_menu") return false;
		getTop().CloseCMenu(window, window.event);
	};
});
