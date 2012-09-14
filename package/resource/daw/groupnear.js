ffAddOnLoad(function() {
	var headNode = false;
	injectTag("tr",function(node) {
		var cur = node.getElementsByTagName("td")[0];
		if(cur) {
			var nick = trim(cur.textContent);
			if(nick == "Глава") {
				headNode = true;
				return;
			} else if( !headNode ) {
				return;
			}
			if(nick=="нет") {
				return;
			}
			var e = createPersLinkWithText(nick);
			cur.innerHTML = "";
			cur.appendChild(e);
		}
	});
});