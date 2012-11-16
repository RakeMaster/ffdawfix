ffAddOnLoad(function() {
	//Fix scrollbar
	var f = getTop().window.frames["PplOuter"];
	if(f) {
		injectTag("iframe", function(node) {
			node.style.overflowX = "hidden"; 
		},f);
	}
});