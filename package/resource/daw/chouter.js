(function() {
	//Fix for incorrect frame name
	var content = null;
	injectTag("td", function(node) {
		if(node.innerHTML.search("iframe") != -1) {
			content = node.innerHTML;
		}
	});
	var t1 = document.getElementById("Table1");
	var b = document.getElementsByTagName('body')[0];
	if(content && t1 && b) {
		t1.parentNode.removeChild(t1);
		b.innerHTML += '<div style="position: absolute; width: 100%; top: 0px; background: url(/vr/uimg/ftop.gif); height:10px"></div>';
		b.innerHTML += content;
	}
	return;
})();
