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

	injectTag("a",function(node) {
		if(node.textContent.trim() == "Надеть") {
			node.href = node.href.replace('__doPostBack','if(confirm("Открыть письмо?")) { __doPostBack').replace("')", "'); }"); 
			node.style.marginRight = "5px";
		}
	});
});