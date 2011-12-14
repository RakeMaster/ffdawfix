(function() {
	//Fix scrollbar
	var f = top.window.frames["PplOuter"];
	if(f) {
		injectTag("iframe", function(node) {
			node.style.overflowX = "auto"; 
		},f);
	}
})();