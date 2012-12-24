//TODO: refactor
function injectCSSText(txt) {
	var doc = document;
	var style = doc.createElement('style');
	style.setAttribute('type', 'text/css');
	style.textContent = txt;
	doc.getElementsByTagName('head')[0].appendChild(style);
}

function arrangeGuests() {
	var a = document.getElementsByTagName('td');
	for(i=0; i<a.length; i++) {
		if(a[i].getAttribute('class') && a[i].getAttribute('class').indexOf('frm_cell') > -1 && a[i].textContent.indexOf('\u0413\u043e\u0441\u0442\u044c') != -1) {
			var l = a[i].textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
			a[i].innerHTML = a[i].innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'').replace(/\)/g,'') + "<i> \u0413\u043e\u0441\u0442\u044c: " + l + "</i>)";
		}
	}

	var h = document.getElementById('lbAlsoHere');
	if(h) {
		var len = h.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
		h.innerHTML = h.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'') + "<i> \u0413\u043e\u0441\u0442\u044c: " + len + "</i>";
	}
}

ffAddOnLoad(function() {
	if(window.panelClick)
	window.panelClick = function(ctrl) {
		var panel = ctrl.parentNode.children[1];
		if (panel) {
			panel.style.display = (panel.style.display == 'none') ? '' : 'none'; 
		}
	}

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

	// Emulating navigate function (used at dropdown page selector)
	if(!window.navigate) {
		window.navigate = function(loc) {
			location.href = loc;
		}
	}
	arrangeGuests();
});
