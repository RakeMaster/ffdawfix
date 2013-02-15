//TODO: refactor
function injectCSSText(txt) {
	var doc = document;
	var style = doc.createElement('style');
	style.setAttribute('type', 'text/css');
	style.textContent = txt;
	doc.getElementsByTagName('head')[0].appendChild(style);
}

function combineGuests() {
	injectTag("td",function(node) {
		if(node.className && node.className.indexOf('frm_cell') > -1 && node.textContent.indexOf('\u0413\u043e\u0441\u0442\u044c') > -1) {
			var len = node.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
node.innerHTML = node.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'').replace(/\)/g,'') + "<i>" + " \u0413\u043e\u0441\u0442\u0438: " + len + "</i>)";	
		}
		
		var also = document.getElementById('lbAlsoHere');
		if(!also) return;
		var len = also.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
		also.innerHTML = also.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'') + "<i> \u0413\u043e\u0441\u0442\u0438: " + len + "</i>";

	});
}

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
	combineGuests();
});
