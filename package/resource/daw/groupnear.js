ffAddOnLoad(function() {
	var headNode = false;
	injectTag("tr",function(node) {
		var n = node.children[0];
		var txt = trim(n.textContent);
		if(txt=="нет"){
			return "delete";

		} 
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