(function() {
	var e = document.getElementById('lbVersion');
	if(e) {
		e = e.parentNode;
		var div = document.createElement('span');
		div.style.color = "green";
		div.innerHTML = "<b>Плугин включен</b>";
		e.appendChild(div);
	}
	//Fixing menu cursors
	injectTag("img",function(node) {
		if(node.src && node.src.search("images/uiwin/bt_") != -1 && node.onclick) {
			node.style.cursor = "pointer";
		}
	});
})();