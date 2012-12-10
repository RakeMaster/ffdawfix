ffAddOnLoad(function() {
	var inf = document.getElementById('Stuff_ctl01_lbItemInfo');
	if(inf) {
		inf.parentNode.style.width = "400px";
	}
	injectTag("div",function(node) {
		var cur = node.getElementsByTagName("b")[0];
		if(cur) {
			var nick = cur.textContent;
			cur.innerHTML = "";
			cur.appendChild(createPersLinkWithText(nick));
		}
	});
});