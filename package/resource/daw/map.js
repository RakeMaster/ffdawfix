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
});