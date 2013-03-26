ffAddOnLoad(function() {
	if(document.body.innerHTML.indexOf('Выбросить') > -1) {
		injectTag("td",function(node) {
			if(node.width == "10%") {
				node.width = "100%";
			}
		});
	}

	injectTag("div",function(node) {
		var cur = node.getElementsByTagName("b")[0];
		if(cur) {
			var nick = cur.textContent;
			cur.innerHTML = "";
			cur.appendChild(createPersLinkWithText(nick));
		}
	});

	var bp = document.getElementById('lbBP');
	injectTag("a",function(node) {
		var stuffName = node.parentNode.parentNode.parentNode.getElementsByTagName('span')[0];
		if(stuffName) stuffName = stuffName.textContent;

		if(stuffName == "Письмо" && node.textContent.trim() == "Открыть" && bp.style.fontWeight == "bold") {
			node.href = node.href.replace('__doPostBack','if(confirm("Открыть письмо?")) { __doPostBack').replace("')", "'); }"); 
			node.style.marginRight = "5px";
		}
	});

	injectTag("img",function(node) {
		if(node && document.getElementById('lbRes').style.fontWeight == "bold") {
			node.src = node.src.replace(/\/vr\/avatars\/weapons\//g, '/vr/images/');
		}
	});
});