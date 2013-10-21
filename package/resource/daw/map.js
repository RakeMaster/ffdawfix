var mouseX, mouseY;

function getMousePos(e) {
	if (!e)
		var e = window.event || window.Event;

	if ('undefined' != typeof e.pageX) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	} else {
		mouseX = e.clientX + document.body.scrollLeft;
		mouseY = e.clientY + document.body.scrollTop;
	}

}

// You need to tell Mozilla to start listening:

if(window.Event && document.captureEvents) {
	document.captureEvents(Event.MOUSEMOVE);
}

// Then assign the mouse handler

document.onmousemove = getMousePos;

ffAddOnLoad(function() {
	if(getTop().hidePopupMenu) {
		injectTag('a', function(node) {
			if( node.href.search('mode=area') == -1
				&&
				node.href.search('mode=conf') == -1
				&&
				node.href.slice(-1) != "?"
			) {
				node.onclick = function() {
					var a = getTop().document.getElementById('popupfrm');
					a.style.display = "none";
				}
			}
		});
	}

	var ia = document.getElementById("imgAreaMap");
	if(!ia) return;
	window.MapClick = function() {
		var obj = document.getElementById("imgAreaMap");
		var oX = 0;
		var oY = 0 ;
		while (obj.offsetParent) {
			oX += obj.offsetLeft;
			oY += obj.offsetTop;
			obj = obj.offsetParent;
		};
		x =
			window.mouseX - oX;
		y =
			window.mouseY - oY;
		window.location = "citymap.aspx?mode=conf&cx=" + x + "&cy=" + y;
	}

	injectTag("area",function(node) {
		if(!node.title && node.alt) node.title = node.alt;
	});
	
	if(document.getElementById('pnlGo')) {
		window.scrollTo(0, document.body.scrollHeight);
	}

});
