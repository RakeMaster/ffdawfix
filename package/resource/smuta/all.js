ffAddOnLoad(function() {
	if(window.panelClick)
	window.panelClick = function(ctrl) {
		var panel = ctrl.parentNode.children[1];
		if (panel) {
			panel.style.display = (panel.style.display == 'none') ? '' : 'none';
		}
	}

	var rep = getClassFirst('frm_repbody');
	if(rep) {
		var tr = rep.parentNode;
		var tbody = tr.parentNode;
		var trs = tbody.getElementsByTagName("tr");
		if(trs.length > 1) {
			if(trs[1] == tr) {
				rep.colSpan = 2;
			}
		}
	}

	// Emulating navigate function (used at dropdown page selector)
	if(!window.navigate) {
		window.navigate = function(loc) {
			location.href = loc;
		}
	}
	
	injectTag("span", function(node) {
		if(node && node.className == "lstts") {
			node.style.fontSize = "12px";
		}
	});
	
	var reg = /(https:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
	injectTag('td', function(node) {
		if(node.className == "frm_repbody" || node.className == "repbody") {
			node.innerHTML = node.innerHTML.replace(reg, "<a target='_blank' href='$1'>$1</a>"); 
		}
	});
	injectTag('a', function(node) {
		if(node.href.search('smuta.com') == -1 && node.href.search('javascript:') == -1) {
			node.target = "_blank";
		}
	});
});
