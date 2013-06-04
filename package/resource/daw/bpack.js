function getActiveTab(tabId) {
	var f = false;
	injectTag("a", function(node) {
		if(node.id == tabId && node.style.fontWeight == "bold") {
			f = true;
		}
	});
	return f;
}

ffAddOnLoad(function() {
	if( getActiveTab('lbGifts') ) {
		injectTag("td", function(node) {
			if(node.width == "10%") {
				node.width = "100%";
			}
			var cur = node.getElementsByTagName("div")[0];
			if(cur) {
				var n = cur.getElementsByTagName('b')[0];
			}
			if(n) {
				var nick = n.textContent;
				n.innerHTML = "";
				n.appendChild(createPersLinkWithText(nick));
			}
		});
	}

	if( getActiveTab('lbRes') ) {
		injectTag("a", function(node) {
			var stuffName = node.parentNode.parentNode.parentNode.getElementsByTagName('span')[0];
			if(stuffName) stuffName = stuffName.textContent;
			if(stuffName == "Письмо" && node.textContent.trim() == "Открыть") {
				node.href = node.href.replace('__doPostBack','if(confirm("Открыть письмо?")) { __doPostBack').replace("')", "'); }");
				node.style.marginRight = "5px";
			}
		});
	}

	injectTag("img", function(node) {
		if( node && getActiveTab('lbRes') ) {
			node.src = node.src.replace(/\/vr\/avatars\/weapons\//g, '/vr/images/');
		}
	});
});