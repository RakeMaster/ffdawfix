(function() {
	if(window.panelClick)
	window.panelClick = function(ctrl) {
		var panel = ctrl.parentNode.children[1];
		if (panel) {
			panel.style.display = (panel.style.display == 'none') ? '' : 'none'; 
		}
	}
	//Rerun digest
	injectTag('script', function(node) {
		var src = node.innerHTML;
		if(src.search("ctrl.innerHTML = ctrlstr;") != -1) {
			runScript("var " + src);
		}
	});
	injectCSSText("body,td {font-size: 12px;}");

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

	if(!window.navigate) {
		window.navigate = function(loc) {
			location.href = loc;
		}
	}
})();
