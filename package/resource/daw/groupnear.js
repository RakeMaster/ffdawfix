ffAddOnLoad(function() {
	var headNode = false;
	injectTag("tr",function(node) {
		var cur = node.getElementsByTagName('td')[0];
		if(cur) {
			var nick = cur.textContent.trim();
			if(nick=="нет"){
				return "delete";
			}
			if(nick == "Глава") {
				headNode = true;
				return;
			} else if( !headNode ) {
				return;
			}
			if(nick=="нет") {
				return;
			}
			if(cur.innerHTML.indexOf('clb.gif')>-1) {
				return;
			}
			if(cur.innerHTML.indexOf('gang.gif')>-1) {
				cur.innerHTML = "<img src='http://darkagesworld.com/vr/images/gang.gif'>";
			}
			else {
				cur.innerHTML="";
			}
			cur.appendChild(createPersLinkWithText(nick));
		}
	});
});