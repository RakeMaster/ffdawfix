ffAddOnLoad(function() {
	injectTag("td",function(node) {
		if(document.body.innerHTML.indexOf('Выбросить') > -1 && node.width == "10%") {
			node.width = "100%";
		}
	});
	injectTag("div",function(node) {
		var cur = node.getElementsByTagName("b")[0];
		if(cur) {
			var nick = cur.textContent;
			cur.innerHTML = "";
			cur.appendChild(createPersLinkWithText(nick));
		}
	});
});